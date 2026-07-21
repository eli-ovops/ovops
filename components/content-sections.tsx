import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { type CaseStatus, type Locale, type Service, type Industry, type CaseStudy, faqs, serviceEnrichment, text } from "@/lib/content-data";

export function caseStatusText(_status: CaseStatus, locale: Locale, _slug?: string) {
  return locale === "zh" ? "概念方案，非客户实绩" : "Concept proposal, not client work";
}

export function StatusBadge({ status, locale, slug }: { status: CaseStatus; locale: Locale; slug?: string }) {
  return <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-vector-blue">{caseStatusText(status, locale, slug)}</span>;
}

export function FaqList({ locale, limit }: { locale: Locale; limit?: number }) {
  return <div className="grid gap-3 md:grid-cols-2">{faqs.slice(0, limit).map((item) => (
    <details key={item.id} className="rounded-lg border border-slate-200 bg-white px-5 shadow-[0_14px_34px_rgba(0,20,39,0.04)]">
      <summary className="flex min-h-14 cursor-pointer items-center gap-3 py-3 text-sm font-black text-navy-950">{text(item.question, locale)}</summary>
      <p className="border-t border-slate-100 py-4 text-sm leading-6 text-slate-600">{text(item.answer, locale)}</p>
    </details>
  ))}</div>;
}

export function CardList({ items, locale }: { items: { title: { zh: string; en: string }; body: { zh: string; en: string }; href?: string }[]; locale: Locale }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{items.map((item) => (
    <article key={text(item.title, locale)} className="surface flex h-full flex-col rounded-lg p-6">
      <h3 className="text-lg font-black text-navy-950">{text(item.title, locale)}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{text(item.body, locale)}</p>
      {item.href ? <Link href={item.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-vector-blue">{locale === "zh" ? "了解方案" : "Explore solution"}<ArrowRight size={16} /></Link> : null}
    </article>
  ))}</div>;
}

export function BulletList({ items }: { items: string[] }) {
  return <div className="grid gap-2">{items.map((item) => <p className="flex gap-2 text-sm leading-6 text-slate-700" key={item}><CheckCircle2 className="mt-0.5 shrink-0 text-vector-blue" size={16} />{item}</p>)}</div>;
}

export function HomeServiceCard({ item, locale }: { item: Service; locale: Locale }) {
  const extra = serviceEnrichment[item.slug];
  return <article className="surface flex h-full flex-col rounded-lg p-6"><h3 className="text-lg font-black text-navy-950">{text(item.title, locale)}</h3><p className="mt-4 text-xs font-black uppercase tracking-wider text-vector-blue">{locale === "zh" ? "业务目标" : "Business goal"}</p><p className="mt-1 text-sm leading-6 text-slate-600">{text(extra.summary, locale)}</p><p className="mt-4 text-xs font-black uppercase tracking-wider text-vector-blue">{locale === "zh" ? "适合" : "For"}</p><p className="mt-1 text-sm leading-6 text-slate-700">{text(item.audience, locale)}</p><p className="mt-4 text-xs font-black uppercase tracking-wider text-vector-blue">{locale === "zh" ? "可交付成果示例" : "Example deliverables"}</p><ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-700">{item.deliverables.slice(0, 3).map((line) => <li key={text(line, locale)}>• {text(line, locale)}</li>)}</ul><Link href={`/solutions/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-vector-blue">{locale === "zh" ? "了解方案" : "Explore solution"}<ArrowRight size={16} /></Link></article>;
}

export function HomeIndustryCard({ item, locale }: { item: Industry; locale: Locale }) {
  return <article className="surface flex h-full flex-col rounded-lg p-6"><h3 className="text-lg font-black text-navy-950">{text(item.title, locale)}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text(item.summary, locale)}</p><p className="mt-4 text-xs font-black uppercase tracking-wider text-vector-blue">{locale === "zh" ? "典型问题" : "Typical problem"}</p><p className="mt-1 text-sm leading-6 text-slate-700">{text(item.scenarios[0], locale)}</p><p className="mt-4 text-xs font-black uppercase tracking-wider text-vector-blue">{locale === "zh" ? "可实施场景" : "Practical scenario"}</p><p className="mt-1 text-sm leading-6 text-slate-700">{text(item.scenarios[1] ?? item.scenarios[0], locale)}</p><Link href={`/industries/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-vector-blue">{locale === "zh" ? "查看行业方案" : "View industry approach"}<ArrowRight size={16} /></Link></article>;
}

export function HomeCaseCard({ item, locale }: { item: CaseStudy; locale: Locale }) {
  const industry = item.slug.includes("law") ? (locale === "zh" ? "专业服务与律师事务所" : "Professional services") : item.slug.includes("foundation") ? (locale === "zh" ? "公益组织与基金会" : "Nonprofits & foundations") : item.slug.includes("furniture") ? (locale === "zh" ? "制造业与外贸" : "Manufacturing & export") : (locale === "zh" ? "农牧与生产管理" : "Agriculture & production");
  return <article className="surface flex h-full flex-col rounded-lg p-6"><StatusBadge status={item.status} locale={locale} slug={item.slug} /><p className="mt-4 text-xs font-black text-vector-blue">{industry}</p><h3 className="mt-2 text-lg font-black text-navy-950">{text(item.title, locale)}</h3><p className="mt-3 text-sm leading-6 text-slate-600"><strong>{locale === "zh" ? "常见问题：" : "Common problem: "}</strong>{text(item.problem, locale)}</p><p className="mt-3 text-sm leading-6 text-slate-600"><strong>{locale === "zh" ? "方案方法：" : "Proposed approach: "}</strong>{text(item.implementation[0], locale)}</p><p className="mt-3 text-sm leading-6 text-slate-600"><strong>{locale === "zh" ? "性质说明：" : "Classification: "}</strong>{caseStatusText(item.status, locale, item.slug)}</p><Link href={`/work/${item.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-black text-vector-blue">{locale === "zh" ? "查看详情" : "View details"}<ArrowRight size={16} /></Link></article>;
}
