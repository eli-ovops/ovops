# OVOPS 官网 V2｜第二阶段实施报告

## 状态

已完成第三次验收退回后的本地修复与中英文静态构建、内容级浏览器复验。未部署、未 push、未创建 PR、未改服务器/DNS、未修改生产环境。

## 第二次验收退回与修复

首次第二阶段验收指出：首页服务/行业/案例卡信息不足、信任原则未结构化、解决方案与行业详情固定章节不完整、英文 1440px 顶部导航拥挤。已在同一实施范围内修复：

- 首页改用专用服务、行业、案例卡，分别呈现服务对象/交付物、典型问题/场景、行业/问题/实施/阶段与详情入口。
- 信任区改为可逐项核查的合作原则，明确分阶段试点、Demo 非上线、服务器部署和源码“可根据项目范围协商”、维护边界和数据保密。
- 同源数据新增 `ServiceEnrichment` 和 `IndustryEnrichment`，用于固定章节的常见问题、实施过程、关联行业、行业背景、所需资料、风险与相关项目。
- SolutionDetail 补齐 Hero、适合企业、常见问题、可提供内容、交付物、实施过程、非范围/待确认、相关行业、案例、FAQ、CTA。
- IndustryDetail 补齐行业背景、常见问题、优先场景、适配方案、实施资料、风险边界、相关项目、FAQ、CTA。
- 桌面 Header 收紧导航间距、字号和 CTA，给“产品与平台”增加视觉分隔与独立下拉空间。

## 第三次验收退回与修复

第三次验收发现此前的详情截图实际是 Next 404，且英文 1440px Header 的 `Contact Us / Products & Platform / 语言 / CTA` 仍有视觉拥挤。此前 QA 只断言单个 H1 和无横向溢出，404 页也可能通过；同时后台方式启动的 `http.server` 在命令结束后退出，未能可靠保证截图对应当前 `out`。

- **404 根因与修复**：Next 16 的动态路由 `params` 为异步值，`app/solutions/[slug]`、`app/industries/[slug]`、`app/work/[slug]` 仍以同步方式读取 `params.slug`，导致静态目录存在但运行时落入 `notFound()`。三个页面现均 await `params`，`generateMetadata` 同步改为 async，重新导出后的详情页能输出对应 title、H1 与正文。
- **Header 修复**：1440px 桌面端保留 Home / Solutions / Industries / Work，将其余公开主入口放入真实的 `More` 下拉；产品与平台仍为独立下拉，语言缩为 `中文`/`EN`，英文 CTA 缩为 `Book a call`。人工检查新英文 1440 截图，入口之间无重叠，所有入口仍可访问。
- **证据隔离**：仅删除 `/tmp/ovops-phase2-qa/retest/` 内旧截图，随后只写入 `zh-fresh/`、`en-fresh/` 两套新文件；没有删除项目文件。
- **QA 脚本加固**：新增临时脚本 `/tmp/ovops_phase3_qa.py`。它等待字体稳定后，对首页及三个精确详情 URL 断言 URL 尾斜杠、页面 title、唯一 H1、固定正文标记、无横向溢出，并显式拒绝 `404` 与 `This page could not be found`。首页还断言六服务线与信任原则；详情页断言固定章节。截图均为全新文件名。

## 修改摘要

- 建立同源强类型内容模型：`LocalizedText`、`Service`、`Industry`、`CaseStudy`、`FAQItem`、`DeliveryStep` 与受限 `CaseStatus`（`live / in-development / pilot / demo / concept`）。
- 新增六类解决方案、五个建议首批行业、四条保守状态案例、12 项采购 FAQ、七步交付流程。
- 首页改为九段销售链路：定位、8 类客户问题、六方案、五行业、项目经验、七步交付、谨慎信任、FAQ、最终 CTA。
- 主导航改为：首页、解决方案、行业与场景、案例、交付方式、关于、联系；API 与 Portal 降为产品与平台二级入口。移动端菜单可展开/收起，并在关闭时恢复页面滚动。
- 重新中性化 About 中无法核验的上市企业、百亿级、15+ 年、职位规模等表述。
- Portal 保持 noindex、移出主导航与 sitemap；未删除既有真实 POST 入口，也没有制造成功状态或假数据。API 未新增模型、计费、限流、SLA、数据保留或支持承诺。

## 路由

新增静态路由：

```text
/solutions
/solutions/websites-portals
/solutions/business-systems
/solutions/knowledge-assistants
/solutions/workflow-automation
/solutions/marketing-content
/solutions/diagnosis-consulting
/industries
/industries/professional-services
/industries/manufacturing-export
/industries/retail-consumer
/industries/agriculture-production
/industries/nonprofit-foundation
/work/[slug]（四条候选案例）
/insights
/delivery-process
/faq
```

`sitemap.xml` 已纳入可公开 solutions、industries、work 详情、delivery-process 与 faq；Portal 仍不进入 sitemap。每个新增页通过既有 `buildPageMetadata` 获得 canonical 与中英 alternates；详情页与列表页使用 BreadcrumbList，FAQ 页使用 FAQPage JSON-LD。未使用 Review、Rating 或其他虚假结构化数据。

## 案例状态

| 条目 | 状态 | 公开边界 |
| --- | --- | --- |
| 律所中英文官网与后台 | `in-development` | 无客户、案件、数据或访问方式 |
| 公益基金会官网 | `in-development` | 无受益人或捐赠数据 |
| 外贸家具库存查询 | `concept` | 无库存、客户或订单数据；无上线主张 |
| 农牧 OCR 录单与生产管理 | `pilot` | 不代表规模化上线或量化成果 |

## 文件清单

修改：

- `app/page.tsx`、`app/work/page.tsx`、`app/sitemap.ts`
- `app/about/page.tsx` 的数据来源 `lib/site-data.ts`
- `components/site-header.tsx`
- `app/solutions/[slug]/page.tsx`、`app/industries/[slug]/page.tsx`、`app/work/[slug]/page.tsx`
- `public/llms.txt`

新增：

- `lib/content-data.ts`
- `components/content-sections.tsx`、`components/detail-page.tsx`
- `app/solutions/**`、`app/industries/**`、`app/work/[slug]/page.tsx`
- `app/delivery-process/page.tsx`、`app/faq/page.tsx`

除本报告外，未新增重复审计/规划文档。

## 验证

| 项目 | 结果 |
| --- | --- |
| `npm ci` | 成功；396 个包审计结果为 0 vulnerabilities |
| `npm run lint` | 通过 |
| `npm run build:zh` | 通过；34 个静态页面 |
| `npm run build:en` | 通过；34 个静态页面 |
| 路由/TypeScript | 由两次 Next 静态构建通过 |
| HTTP 本地浏览器 QA | 通过；系统 Chrome + Playwright，320 / 375 / 768 / 1024 / 1440，中文与英文 |

浏览器证据位于本机临时目录：`/tmp/ovops-phase2-qa/`，含 `zh-{320,375,768,1024,1440}.png` 与 `en-{320,375,768,1024,1440}.png`。检查了首页 H1、无横向溢出、移动菜单展开/关闭及滚动恢复、桌面“产品与平台”下拉、solutions CTA/H1。英文 320px 首次 QA 发现品牌文案将菜单挤出视口，已通过缩略品牌/隐藏小屏次标题与语言链接修复，并完成中英文复测。

此前第二次验收后的详情截图已被第三次验收判定为无效证据，不能再作为“详情 QA 已通过”的依据。当前可用证据仅为：`/tmp/ovops-phase2-qa/retest/zh-fresh/` 与 `/tmp/ovops-phase2-qa/retest/en-fresh/`，各含首页 `home-{320,375,768,1024,1440}-fresh.png` 及 `solution`、`industry`、`work` 详情各 `375/1440-fresh.png`，共 22 张。

### 第三次验收预览服务与断言记录

每次 locale 构建后均先停止前一服务，再从当次 `out` 重启前台本地 HTTP 服务；服务会话在截图完成后已显式停止。

| Locale | 当次 PID | 服务根目录 | 命令 | 内容级结果 |
| --- | --- | --- | --- | --- |
| zh | `85936` | `/Users/cczij/Documents/原点向量官网重塑/官网重设计前置/安全解压交接包/原点向量官网改版交接包_2026-07-17/source/out` | `python3 -m http.server 4183 --directory out` | 5 个首页尺寸 + 3 个详情 URL × 2 尺寸通过 |
| en | `86415` | `/Users/cczij/Documents/原点向量官网重塑/官网重设计前置/安全解压交接包/原点向量官网改版交接包_2026-07-17/source/out` | `python3 -m http.server 4183 --directory out` | 5 个首页尺寸 + 3 个详情 URL × 2 尺寸通过 |

精确详情 URL（中英文各自当次 `out`）：`/solutions/websites-portals/`、`/industries/manufacturing-export/`、`/work/law-firm-bilingual-site/`。每页验证 HTTP 实际打开后的 URL、title、H1、正文固定章节和 404 文案缺失；非仅 HTTP 200 或 H1 计数。英文 `en-home-1440-fresh.png` 已人工视觉检查 Header，无 Products & Platform、语言和 CTA 重叠。

## 待确认事实与剩余问题

1. 六项服务的最终范围、周期、费用、维护边界与可公开 CTA 负责人。
2. 五个行业是否有真实经验、可公开材料与确切术语。
3. 四条案例的客户授权、状态、素材、事实、可公开成果及下一步。
4. API 平台的运营主体、模型、计费、速率、数据保留、开通和支持说明。
5. Portal 的后端认证、数据权限、错误反馈、跨域与安全责任；当前只作邀请制入口，不构成能力验证。
6. 合规页、主体、邮箱、备案、社媒、图片版权与可公开范围。

## 下一轮建议

先由业务 Owner 完成上述 P0 事实表与授权，再进行内容定稿、资产替换、逐页双语审校和受控预览。预览部署必须另行获得授权，并按项目实时 guide/status、完整 SHA、包校验、validate、单次 deploy 与浏览器验收执行。
