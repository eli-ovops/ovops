import { readFile } from 'node:fs/promises';

const industry = [
  ['manufacturing','制造业'], ['trade','外贸与跨境'], ['ecommerce','电商与零售'],
  ['professional-services','专业服务'], ['sales','销售与客户管理'], ['education','教育培训'],
  ['healthcare','医疗健康'], ['construction','建筑工程与供应链'], ['local-services','本地生活与服务'], ['more','更多行业'],
];
const solutionDetails = [
  ['ai-assistant', '岗位智能助手'], ['knowledge-management', '企业知识入口'],
  ['workflow-automation', '业务流程优化'], ['customer-service', '客户服务提升'],
  ['data-analysis', '经营数据分析'], ['business-system', '业务系统协同'],
];
const [index, solutions, manufacturing, js, ...detailPages] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../solutions/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../industries/manufacturing/index.html', import.meta.url), 'utf8'),
  readFile(new URL('../assets/js/site.js', import.meta.url), 'utf8'),
  ...industry.slice(1).map(([slug]) => readFile(new URL(`../industries/${slug}/index.html`, import.meta.url), 'utf8')),
  ...solutionDetails.map(([slug]) => readFile(new URL(`../solutions/${slug}/index.html`, import.meta.url), 'utf8')),
]);
const industryPages = detailPages.slice(0, industry.length - 1);
const solutionPages = detailPages.slice(industry.length - 1);
const pages = {
  '/': index, '/solutions': solutions,
  ...Object.fromEntries(industry.map(([slug], i) => [`/industries/${slug}`, i ? industryPages[i - 1] : manufacturing])),
  ...Object.fromEntries(solutionDetails.map(([slug], i) => [`/solutions/${slug}`, solutionPages[i]])),
};
const forbidden = [/marketingforce/i, /71360/i, /baidu\.com/i, /https?:\/\//i, /<form\b/i, /<video\b/i, /\b(?:Agent|RAG|LLM)\b/i, /大模型/];
const hits = forbidden.filter(rule => Object.values(pages).some(page => rule.test(page)) || rule.test(js)).map(String);
if (hits.length) throw new Error(`Forbidden content: ${hits.join(', ')}`);
const ids = markup => new Set([...markup.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id));
function assertLinks(markup, source) {
  for (const [, href] of markup.matchAll(/<a\b[^>]*\bhref="([^"]*)"[^>]*>/g)) {
    if (!href || href === '#' || href.startsWith('javascript:')) throw new Error(`${source}: invalid href ${href || '(empty)'}`);
    const [path, hash] = href.split('#'); const target = path || source;
    if (!Object.hasOwn(pages, target)) throw new Error(`${source}: nonexistent route ${href}`);
    if (hash && !ids(pages[target]).has(hash)) throw new Error(`${source}: missing anchor ${href}`);
  }
}
Object.entries(pages).forEach(([path, markup]) => assertLinks(markup, path));
const rail = index.match(/<div class="industry-rail" data-industry-rail>([\s\S]*?)<\/div>\s*<\/div><\/section>/)?.[1] ?? '';
if ((rail.match(/<article>/g) ?? []).length !== 10) throw new Error('Expected 10 industry cards');
for (const [slug, name] of industry) {
  if (!rail.includes(`<h3>${name}</h3>`) || !rail.includes(`href="/industries/${slug}"`)) throw new Error(`Homepage industry link mismatch: ${slug}`);
}
for (const [slug, name] of solutionDetails) {
  const page = pages[`/solutions/${slug}`];
  for (const text of [name, '业务场景', '业务阻塞', '应用方式', '实施路径', '关联行业', '免费企业AI诊断']) if (!page.includes(text)) throw new Error(`${slug}: missing ${text}`);
  if ((page.match(/class="detail-problem reveal"/g) ?? []).length !== 4) throw new Error(`${slug}: expected 4 problems`);
  if ((page.match(/class="application-method reveal"/g) ?? []).length !== 4) throw new Error(`${slug}: expected 4 application methods`);
  const path = page.match(/<ol class="detail-path">([\s\S]*?)<\/ol>/)?.[1] ?? '';
  if ((path.match(/<li class="reveal">/g) ?? []).length !== 4) throw new Error(`${slug}: expected 4 delivery stages`);
  const related = page.match(/<div class="related-solutions">([\s\S]*?)<\/div>/)?.[1] ?? '';
  if ((related.match(/href="\/industries\//g) ?? []).length !== 3) throw new Error(`${slug}: expected 3 related industries`);
  if (!page.includes('href="/#contact"><span>免费企业AI诊断</span>')) throw new Error(`${slug}: CTA fallback contract`);
}
for (const [slug] of solutionDetails) {
  const target = `/solutions/${slug}`;
  if (!index.includes(`href="${target}"`)) throw new Error(`Homepage solution entry missing: ${slug}`);
  if (!solutions.includes(`href="${target}"`)) throw new Error(`Solutions overview entry missing: ${slug}`);
}
for (const [slug, name] of industry) {
  const page = pages[`/industries/${slug}`];
  for (const text of [name, '企业正在面对什么', '可以从哪些场景开始', '如何开始', '关联解决方案', '免费企业AI诊断']) if (!page.includes(text)) throw new Error(`${slug}: missing ${text}`);
  if ((page.match(/class="detail-problem reveal"/g) ?? []).length !== 4) throw new Error(`${slug}: expected 4 problems`);
  if ((page.match(/class="manufacturing-scenario reveal"/g) ?? []).length !== 4) throw new Error(`${slug}: expected 4 scenarios`);
  const path = page.match(/<ol class="detail-path">([\s\S]*?)<\/ol>/)?.[1] ?? '';
  if ((path.match(/<li class="reveal">/g) ?? []).length !== 4) throw new Error(`${slug}: expected 4 delivery stages`);
  const related = page.match(/<div class="related-solutions">([\s\S]*?)<\/div>/)?.[1] ?? '';
  if ((related.match(/href="\/solutions#/g) ?? []).length !== 3) throw new Error(`${slug}: related solution contract`);
  if (slug !== 'manufacturing' && !page.includes('href="/solutions">从行业场景回到可讨论的能力方向，并查看全部 AI 解决方案。</a>')) throw new Error(`${slug}: all-solutions entry`);
  if (!page.includes('href="/#contact"><span>免费企业AI诊断</span>')) throw new Error(`${slug}: CTA contract`);
}
if (!pages['/industries/healthcare'].includes('不涉及医疗诊断、治疗建议或效果承诺')) throw new Error('Healthcare disclaimer missing');
if (!js.includes('if (rail && railIndex)')) throw new Error('Homepage rail guard regression');
console.log('PASS: OVOPS ten-industry route expansion and homepage link contracts checked');
