import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaqList, HomeIndustryCard, HomeServiceCard } from "@/components/content-sections";
import { OtherWaterCommandCenter } from "@/components/otherwater-command-center";
import { buildPageMetadata } from "@/lib/seo-data";
import { businessScenarios, deliverySteps, industries, services, text } from "@/lib/content-data";
import { isChineseSite } from "@/lib/site-data";
import { isOtherWaterWorkspaceBuild, otherWaterWorkspaceUrl } from "@/lib/workspace-mode";

export const metadata: Metadata = isOtherWaterWorkspaceBuild
  ? {
      metadataBase: new URL(otherWaterWorkspaceUrl),
      title: "OVOPS Client Command Center | OtherWater",
      description: "OtherWater 客户项目总看板，展示项目判断、KPI、客户待办、数据源状态、证据和交付验收。",
      alternates: { canonical: "/" },
      robots: { index: false, follow: false },
    }
  : buildPageMetadata({
      path: "/",
      title: isChineseSite ? "原点向量｜企业 AI 与数字化系统落地" : "Origin Vector | Business AI & Digital Systems",
      description: isChineseSite ? "帮助企业把 AI 和数字化系统落地到真实业务流程。" : "Helping businesses put AI and digital systems into real workflows.",
      absoluteTitle: isChineseSite,
    });

const homeProblems = {
  zh: ["官网陈旧、咨询路径不清", "内部流程依赖表格和人工转发", "资料在网盘却找不到、用不起来", "销售客服回答不一致"],
  en: ["An outdated site and unclear inquiry path", "Workflows trapped in spreadsheets and forwarding", "Materials stored but not usable", "Inconsistent sales and support answers"],
};

const collaborationPrinciples = {
  zh: ["先梳理业务问题清单，再讨论可能的路径。", "用范围说明和原型评审记录对齐理解。", "保留测试记录、上线/培训与验收文档。", "Demo 与正式上线分开标识。", "概念方案不使用客户数据。"],
  en: ["Start with a list of business questions before discussing possible paths.", "Use a scope note and prototype-review record to align understanding.", "Keep testing records and launch, training and acceptance documents.", "Label a demo separately from a formal launch.", "Concept proposals do not use client data."],
};

export default function HomePage() {
  if (isOtherWaterWorkspaceBuild) return <OtherWaterCommandCenter />;

  const locale = isChineseSite ? "zh" : "en";
  const language = isChineseSite ? "zh" : "en";

  return (
    <main>
      <section className="home-hero text-white">
        <div className="section-wrap grid gap-8 py-12 md:py-20 xl:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)] xl:items-center">
          <div>
            <p className="kicker kicker-gold">{isChineseSite ? "企业 AI 与数字化能力" : "ENTERPRISE AI & DIGITAL CAPABILITY"}</p>
            <h1 className="mt-5 max-w-4xl text-balance text-5xl font-black leading-[1.02] md:text-7xl">{isChineseSite ? "AI 正在重塑企业效率" : "AI Is Reshaping Enterprise Efficiency"}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-300">{isChineseSite ? "帮助企业将 AI 真正应用于获客、销售、运营和管理，减少重复工作，提升团队效率。" : "Origin Vector helps businesses put AI to work across marketing, sales, operations, and management—reducing repetitive work and improving team efficiency."}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href="/solutions" className="button-primary">{isChineseSite ? "查看解决方案" : "Explore solutions"}<ArrowRight size={17} /></Link>
              <Link href="/delivery-process" className="button-secondary button-on-dark">{isChineseSite ? "了解交付方式" : "See how delivery works"}<ArrowRight size={17} /></Link>
            </div>
          </div>
          <div aria-label={isChineseSite ? "企业数字化能力地图" : "Enterprise digital capability map"} className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-black tracking-[0.16em] text-blue-200">01 · {isChineseSite ? "品牌增长" : "BRAND & GROWTH"}</p>
              <h2 className="mt-2 text-lg font-black">{isChineseSite ? "提升获客效率" : "Improve customer acquisition"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{isChineseSite ? "官网、SEO、GEO、内容运营、客户入口建设" : "Websites, SEO/GEO, content operations, and customer entry points"}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-black tracking-[0.16em] text-blue-200">02 · {isChineseSite ? "企业运营效率" : "OPERATIONAL EFFICIENCY"}</p>
              <h2 className="mt-2 text-lg font-black">{isChineseSite ? "优化业务流程" : "Streamline business operations"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{isChineseSite ? "CRM、OA、ERP 扩展、业务系统、自动化流程" : "CRM, OA, ERP extensions, business systems, and workflow automation"}</p>
            </div>
            <div className="rounded-lg border border-white/15 bg-white/5 p-4 backdrop-blur-sm">
              <p className="text-xs font-black tracking-[0.16em] text-blue-200">03 · {isChineseSite ? "企业知识管理" : "KNOWLEDGE MANAGEMENT"}</p>
              <h2 className="mt-2 text-lg font-black">{isChineseSite ? "释放企业知识" : "Unlock enterprise knowledge"}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{isChineseSite ? "知识库、RAG、AI 助手、智能客服" : "Knowledge bases, RAG, AI assistants, and intelligent customer support"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap py-10"><p className="kicker">{isChineseSite ? "三种查找方式" : "THREE WAYS TO FIND A PATH"}</p><div className="mt-5 grid gap-3 md:grid-cols-3"><Link href="/solutions" className="surface rounded-lg p-5"><h2 className="font-black text-navy-950">{isChineseSite ? "按业务目标" : "By business goal"}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{isChineseSite ? "从希望改善的工作开始。" : "Start with the work you want to improve."}</p></Link><Link href="/industries" className="surface rounded-lg p-5"><h2 className="font-black text-navy-950">{isChineseSite ? "按行业" : "By industry"}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{isChineseSite ? "从行业中的典型问题开始。" : "Start with typical industry problems."}</p></Link><Link href="/scenarios" className="surface rounded-lg p-5"><h2 className="font-black text-navy-950">{isChineseSite ? "按典型场景" : "By scenario"}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{isChineseSite ? "从一项可讨论的流程开始。" : "Start with a discussable workflow."}</p></Link></div></section>

      <section className="section-wrap py-16"><p className="kicker">{isChineseSite ? "客户常见问题" : "COMMON BUSINESS PROBLEMS"}</p><h2 className="mt-4 text-3xl font-black text-navy-950 md:text-5xl">{isChineseSite ? "不要从“买什么工具”开始。" : "Do not begin with a tool purchase."}</h2><div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{homeProblems[language].map((item) => <p key={item} className="rounded-lg border border-slate-200 p-5 text-sm font-bold leading-6 text-navy-950">{item}</p>)}</div></section>

      <section className="light-band py-16"><div className="section-wrap"><p className="kicker">{isChineseSite ? "按业务目标" : "BUSINESS GOALS"}</p><h2 className="mt-4 text-3xl font-black text-navy-950 md:text-5xl">{isChineseSite ? "按问题选择范围，而不是套用模板。" : "Choose scope by problem, not a generic template."}</h2><div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{services.slice(0, 4).map((entry) => <HomeServiceCard key={entry.slug} item={entry} locale={locale} />)}</div><Link className="button-secondary mt-8" href="/solutions">{isChineseSite ? "查看全部业务目标" : "View all business goals"}<ArrowRight size={16} /></Link></div></section>

      <section className="section-wrap py-16"><p className="kicker">{isChineseSite ? "按行业" : "INDUSTRIES"}</p><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{industries.slice(0, 4).map((entry) => <HomeIndustryCard key={entry.slug} item={entry} locale={locale} />)}</div><Link className="button-secondary mt-8" href="/industries">{isChineseSite ? "查看全部行业" : "View all industries"}<ArrowRight size={16} /></Link></section>

      <section className="light-band py-16"><div className="section-wrap"><p className="kicker">{isChineseSite ? "按典型场景" : "SCENARIOS"}</p><div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{businessScenarios.slice(0, 4).map((entry) => <Link href="/scenarios" key={entry.slug} className="surface rounded-lg p-5"><h2 className="font-black text-navy-950">{text(entry.title, locale)}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{text(entry.summary, locale)}</p><p className="mt-4 text-xs font-black text-vector-blue">{isChineseSite ? "客户问题" : "Customer problem"}</p><p className="mt-1 text-sm leading-6 text-slate-700">{text(entry.customerProblems[0], locale)}</p></Link>)}</div><Link className="button-secondary mt-8" href="/scenarios">{isChineseSite ? "查看全部典型场景" : "View all scenarios"}<ArrowRight size={16} /></Link></div></section>

      <section className="section-wrap py-16"><p className="kicker">{isChineseSite ? "七步交付" : "SEVEN DELIVERY STEPS"}</p><ol className="mt-7 grid divide-y divide-slate-200 rounded-lg border border-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0">{deliverySteps.map((step) => <li key={step.number} className="flex gap-4 p-4"><p className="pt-0.5 text-sm font-black text-vector-blue">{step.number}</p><div><h2 className="font-black text-navy-950">{text(step.title, locale)}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{text(step.output, locale)}</p></div></li>)}</ol><Link className="button-secondary mt-8" href="/delivery-process">{isChineseSite ? "查看交付方式" : "View delivery process"}<ArrowRight size={16} /></Link></section>

      <section className="light-band py-16"><div className="section-wrap grid gap-8 md:grid-cols-2"><div><p className="kicker">{isChineseSite ? "信任与合作原则" : "TRUST & COLLABORATION"}</p><h2 className="mt-4 text-3xl font-black text-navy-950">{isChineseSite ? "以范围、记录和验收对齐工作。" : "Align work through scope, records and acceptance."}</h2><div className="mt-6 grid gap-3 text-sm leading-6 text-slate-700">{collaborationPrinciples[language].map((item) => <p key={item} className="rounded-md border border-slate-200 bg-white px-4 py-3">{item}</p>)}</div><div className="mt-7 rounded-lg border border-slate-200 bg-white p-5"><p className="text-xs font-black uppercase tracking-wider text-vector-blue">{isChineseSite ? "交付文档结构示例" : "ILLUSTRATIVE DELIVERY-DOCUMENT STRUCTURE"}</p><h3 className="mt-3 text-lg font-black text-navy-950">{isChineseSite ? "概念示意，非客户项目截图" : "Concept illustration, not a client-project screenshot"}</h3><ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700"><li>01 · {isChineseSite ? "范围说明" : "Scope note"}</li><li>02 · {isChineseSite ? "原型评审记录" : "Prototype-review record"}</li><li>03 · {isChineseSite ? "测试与验收清单" : "Testing and acceptance checklist"}</li></ul></div><Link className="button-secondary mt-7" href="/about">{isChineseSite ? "了解我们的方法" : "Learn about our approach"}<ArrowRight size={16} /></Link></div><div><h2 className="text-2xl font-black text-navy-950">FAQ</h2><div className="mt-5"><FaqList locale={locale} limit={4} /></div><Link href="/faq" className="mt-6 inline-block text-sm font-black text-vector-blue">{isChineseSite ? "查看全部问题" : "View all questions"}</Link></div></div></section>

      <section className="section-wrap py-16"><div className="dark-surface rounded-lg p-8 md:p-12"><h2 className="text-3xl font-black text-white">{isChineseSite ? "从一个明确的业务场景开始。" : "Start with one defined business scenario."}</h2><p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">{isChineseSite ? "了解目标、现有资料和约束，再查看可讨论的交付路径。" : "Understand goals, current materials and constraints, then explore a discussable delivery path."}</p><div className="mt-7 flex flex-col gap-4 sm:flex-row"><Link href="/scenarios" className="button-primary">{isChineseSite ? "查看典型场景" : "View scenarios"}<ArrowRight size={16} /></Link><Link href="/delivery-process" className="button-secondary button-on-dark">{isChineseSite ? "查看交付方式" : "View delivery process"}<ArrowRight size={16} /></Link></div></div></section>
    </main>
  );
}
