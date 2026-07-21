import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  CircleDollarSign,
  Clock3,
  Code2,
  DatabaseZap,
  HelpCircle,
  LineChart,
  MessageSquareText,
  Network,
  PencilRuler,
  Rocket,
  SearchCheck,
  ShieldCheck,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { capabilityPackages, isChineseSite, servicesPageCopy } from "@/lib/site-data";
import { buildPageMetadata, pageBreadcrumbJsonLd } from "@/lib/seo-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/services",
  title: isChineseSite ? "服务路径说明" : "Service Route Notice",
  description: isChineseSite ? "本历史服务路径正在与当前解决方案范围核对。" : "This historical service route is being reconciled with the current solutions scope.",
  robots: { index: false, follow: false },
});

const blockers = [
  { title: isChineseSite ? "场景不清" : "Unclear scenarios", text: isChineseSite ? "AI没有绑定业务结果" : "AI is not tied to business outcomes", icon: HelpCircle },
  { title: isChineseSite ? "资料分散" : "Scattered knowledge", text: isChineseSite ? "知识沉在信息孤岛" : "Knowledge stays in information silos", icon: DatabaseZap },
  { title: isChineseSite ? "流程不标准" : "Non-standard workflows", text: isChineseSite ? "不同团队做法不一" : "Team practices vary", icon: Network },
  { title: isChineseSite ? "能力不均" : "Uneven AI capability", text: isChineseSite ? "团队AI使用能力不同" : "AI capability varies by team", icon: UsersRound },
];

const bottomProof = [
  { title: isChineseSite ? "业务优先" : "Business-First", text: isChineseSite ? "先看结果，不先堆工具。" : "Start from outcomes, not tools.", icon: Boxes },
  { title: isChineseSite ? "可衡量" : "Measurable", text: isChineseSite ? "流程清晰，结果可复盘。" : "Clear workflows and reviewable results.", icon: LineChart },
  { title: isChineseSite ? "创始人主导" : "Founder-Led", text: isChineseSite ? "资深经验，亲自交付。" : "Senior expertise with hands-on delivery.", icon: UsersRound },
];

const processSteps = [
  {
    number: "01",
    title: isChineseSite ? "咨询诊断" : "Consultation & Diagnosis",
    text: isChineseSite ? "对齐业务目标，梳理现状，识别高价值AI机会。" : "Align on objectives, map current state, and identify high-value AI opportunities.",
    icon: MessageSquareText,
  },
  {
    number: "02",
    title: isChineseSite ? "业务评估" : "Business Assessment",
    text: isChineseSite ? "排序场景优先级，明确工具边界和交付范围。" : "Prioritize scenarios, set tool boundaries and confirm delivery scope.",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: isChineseSite ? "方案设计" : "Solution Design",
    text: isChineseSite ? "整理 FAQ、SOP、话术、证据卡片和内容资产。" : "Organize FAQs, SOPs, sales scripts, evidence cards and content assets.",
    icon: PencilRuler,
  },
  {
    number: "04",
    title: isChineseSite ? "试点开发" : "Pilot Development",
    text: isChineseSite ? "开发岗位工具、智能体、工作流或轻量应用。" : "Develop role tools, agents, workflows or lightweight applications.",
    icon: Code2,
  },
  {
    number: "05",
    title: isChineseSite ? "上线交付" : "Launch & Delivery",
    text: isChineseSite ? "进入真实业务运行，培训团队，收集反馈并迭代。" : "Run in real operations, train users, collect feedback and iterate.",
    icon: Rocket,
  },
  {
    number: "06",
    title: isChineseSite ? "复盘优化" : "Review & Optimize",
    text: isChineseSite ? "复盘结果、质量和 ROI，持续优化并扩大有效场景。" : "Review outcomes, quality and ROI. Continuously optimize and scale what works.",
    icon: TrendingUp,
  },
];

const processOutcomes = [
  { title: isChineseSite ? "效率提升" : "Higher Efficiency", icon: Clock3, trend: "up" },
  { title: isChineseSite ? "成本降低" : "Lower Cost", icon: CircleDollarSign, trend: "down" },
  { title: isChineseSite ? "业务优化" : "Better Operations", icon: UserRound, trend: "up" },
  { title: isChineseSite ? "增长可衡量" : "Measured Growth", icon: BarChart3, trend: "up" },
];

const serviceText = {
  heroKicker: isChineseSite ? "服务" : "Services",
  heroImageAlt: isChineseSite ? "AI运营框架概览" : "AI operating framework overview",
  frameworkImageAlt: isChineseSite ? "AI运营框架地图" : "AI operating framework map",
  whyKicker: isChineseSite ? "提效，从来不仅仅是AI工具的问题。" : "Why AI productivity is not just about tools",
  whyTitle: isChineseSite ? "AI落地失败，往往不是工具问题" : "AI adoption stalls when operations are not ready",
  whyLead: isChineseSite ? "真正的影响来自清晰场景、结构化知识、明确角色和可复盘结果。" : "Impact depends on clear scenarios, structured knowledge, accountable roles and reviewable outcomes.",
  matrixKicker: isChineseSite ? "服务矩阵" : "Our Service Matrix",
  packageHeader: isChineseSite ? "服务" : "Service",
  deliverablesHeader: isChineseSite ? "可交付" : "Deliverables",
  matrixNote: isChineseSite ? "我们重视高质量交付，不追求数量和夸大承诺" : "We prioritize high-quality delivery over volume or overstated promises",
  processKicker: isChineseSite ? "交付流程" : "Delivery Flow",
  impactTitle: isChineseSite ? "结果导向" : "Business Impact",
  impactLead: isChineseSite ? "实施与结果并重。" : "Implementation and outcomes matter equally.",
  ctaKicker: isChineseSite ? "准备好开始了吗？" : "Ready to get started?",
  ctaTitle: isChineseSite ? "让AI进入真实业务，产生可衡量影响。" : "Let's bring AI into real operations and make the impact measurable.",
  ctaLead: isChineseSite ? "预约一次咨询，获得免费的企业AI诊断建议。" : "Book a consultation and get a free diagnosis for one business scenario.",
  ctaButton: isChineseSite ? "预约免费企业诊断" : "Book Free Diagnosis",
};

function LegacyServicesPage() {
  return (
    <main>
      <JsonLd data={pageBreadcrumbJsonLd(isChineseSite ? "产品服务" : "Product Services", "/services")} />
      <section className="light-band border-b border-slate-200 py-12 md:py-16 xl:py-20">
        <div className="section-wrap grid gap-8 md:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center xl:gap-12">
          <div className="flex flex-col justify-center self-stretch">
            <p className="kicker">{serviceText.heroKicker}</p>
            <h1 className="mt-5 max-w-2xl text-balance text-4xl font-black leading-tight text-navy-950 md:text-5xl xl:text-6xl">
              {servicesPageCopy.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 md:mt-6 md:text-lg md:leading-9">
              {servicesPageCopy.heroDescription}
            </p>
          </div>

          <div className="flex items-center overflow-hidden rounded-lg">
            <Image
              src="/services/services-hero-framework.webp"
              alt={serviceText.heroImageAlt}
              className="h-auto w-full lg:scale-[1.04] lg:object-contain"
              width={1600}
              height={900}
              priority
              unoptimized
            />
          </div>
        </div>
      </section>

      <section className="light-band border-y border-slate-200 py-14 md:py-16">
        <div className="section-wrap grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="service-framework-crop order-2 flex items-center justify-center overflow-hidden rounded-lg lg:order-1">
            <Image
              src="/services/services-operating-framework.webp"
              alt={serviceText.frameworkImageAlt}
              className="service-framework-image h-full w-full object-cover"
              width={1600}
              height={900}
              unoptimized
            />
          </div>

          <div className="service-blocker-panel order-1 surface flex flex-col justify-center rounded-lg p-6 md:p-7 lg:order-2 lg:p-8">
            <p className="kicker">{serviceText.whyKicker}</p>
            <h2 className="mt-4 max-w-xl text-balance text-3xl font-black leading-tight text-navy-950 lg:text-4xl">
              {serviceText.whyTitle}
            </h2>
            <p className="mt-3 max-w-xl text-sm font-semibold leading-6 text-slate-600 lg:mt-4 lg:text-base lg:leading-7">
              {serviceText.whyLead}
            </p>
            <div className="service-blocker-grid mt-5 grid gap-3 md:grid-cols-2 lg:mt-6 lg:gap-4">
              {blockers.map((item) => {
                const Icon = item.icon;
                return (
                <div key={item.title} className="service-blocker-card flex gap-3 rounded-md border border-slate-200/80 bg-white/70 p-3 md:min-h-[74px] lg:p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-blue-100 bg-white text-vector-blue">
                    <Icon aria-hidden="true" size={17} />
                  </span>
                  <div>
                    <h3 className="text-[13px] font-black leading-tight text-navy-950 lg:text-sm lg:leading-snug">{item.title}</h3>
                    <p className="mt-1 text-xs font-semibold leading-5 text-slate-600 lg:text-[13px] lg:leading-6">{item.text}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="matrix" className="light-band border-y border-slate-200 py-16 md:py-20">
        <div className="section-wrap">
          <div className="max-w-3xl">
            <h2 className="mt-4 text-balance text-3xl font-black leading-tight text-navy-950 md:text-5xl">
              {servicesPageCopy.matrixTitle}
            </h2>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-500">{servicesPageCopy.matrixLead}</p>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-[0_24px_70px_rgba(0,20,39,0.08)]">
            <div className="hidden xl:block">
              <table className="service-table">
                <thead>
                  <tr>
                    <th>{serviceText.packageHeader}</th>
                    <th>{servicesPageCopy.fitLabel}</th>
                    <th>{servicesPageCopy.timelineLabel}</th>
                    <th>{serviceText.deliverablesHeader}</th>
                    <th>{servicesPageCopy.pricingLabel}</th>
                  </tr>
                </thead>
                <tbody>
                  {capabilityPackages.map((service) => {
                    const Icon = service.icon;
                    return (
                      <tr key={service.title}>
                        <td>
                          <div className="flex gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-blue-50 text-vector-blue">
                              <Icon aria-hidden="true" size={18} />
                            </span>
                            <p className="text-sm font-black leading-snug text-navy-950">{service.title}</p>
                          </div>
                        </td>
                        <td className="text-sm font-semibold leading-6 text-slate-700">{service.audience}</td>
                        <td className="text-sm font-semibold text-slate-700">{service.timeline}</td>
                        <td className="text-sm leading-6 text-slate-700">{service.deliverables.join(", ")}</td>
                        <td className="text-xs font-normal leading-6 text-slate-600">{service.pricing}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="service-card-list p-4 xl:hidden">
              {capabilityPackages.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.title} className="service-card-row">
                    <div className="flex gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-blue-50 text-vector-blue">
                        <Icon aria-hidden="true" size={19} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-base font-black leading-snug text-navy-950">{service.title}</h3>
                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-700">{service.audience}</p>
                      </div>
                    </div>
                    <div className="service-card-meta">
                      <div className="service-card-meta-item">
                        <p className="service-card-meta-label">{servicesPageCopy.timelineLabel}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-700">{service.timeline}</p>
                      </div>
                      <div className="service-card-meta-item">
                        <p className="service-card-meta-label">{serviceText.deliverablesHeader}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-700">{service.deliverables.join(", ")}</p>
                      </div>
                      <div className="service-card-meta-item">
                        <p className="service-card-meta-label">{servicesPageCopy.pricingLabel}</p>
                        <p className="mt-1 text-xs font-normal leading-6 text-slate-600">{service.pricing}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2 text-right text-xs font-normal leading-5 text-slate-500">
            <ShieldCheck className="shrink-0 text-vector-blue" aria-hidden="true" size={16} />
            {serviceText.matrixNote}
          </div>
        </div>
      </section>

      <section id="process" className="bg-white py-16">
        <div className="section-wrap">
          <div className="overflow-hidden">
            <div className="px-0 py-0">
              <p className="kicker">{serviceText.processKicker}</p>
              <div className="mt-9 hidden xl:block">
                <div>
                  <div className="grid grid-cols-6">
                    {processSteps.map((step, index) => {
                      const Icon = step.icon;
                      return (
                        <article key={step.number} className="relative border-r border-slate-200 px-3 pb-5 last:border-r-0">
                          <p className="text-center text-lg font-black leading-none text-vector-blue">{step.number}</p>
                          <div className="relative mt-6 flex justify-center">
                            {index < processSteps.length - 1 ? (
                              <span className="absolute left-[62%] top-1/2 h-px w-[76%] -translate-y-1/2 border-t border-dashed border-blue-300" aria-hidden="true" />
                            ) : null}
                            {index < processSteps.length - 1 ? (
                              <span className="absolute left-[96%] top-1/2 z-10 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-blue-100 bg-white text-vector-blue shadow-[0_8px_24px_rgba(22,119,255,0.12)]" aria-hidden="true">
                                <ArrowRight size={16} />
                              </span>
                            ) : null}
                            <span className="relative z-20 grid h-20 w-20 place-items-center rounded-full bg-white text-vector-blue shadow-[0_0_0_12px_rgba(22,119,255,0.05),0_18px_34px_rgba(22,119,255,0.12)]">
                              <Icon aria-hidden="true" size={31} strokeWidth={1.8} />
                            </span>
                          </div>
                          <h3 className="mt-6 text-center text-base font-black leading-tight text-navy-950">{step.title}</h3>
                          <span className="mx-auto mt-5 block h-0.5 w-10 rounded-full bg-vector-blue" />
                          <p className="mt-5 min-h-[96px] text-center text-[13px] font-normal leading-6 text-navy-950">{step.text}</p>
                        </article>
                      );
                    })}
                  </div>

                  <div className="service-impact-strip mt-4 grid grid-cols-[248px_minmax(0,1fr)] items-center rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-[0_10px_34px_rgba(0,20,39,0.04)]">
                    <div className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-navy-950 text-white">
                        <Target aria-hidden="true" size={24} />
                      </span>
                      <div>
                        <h3 className="text-base font-black text-navy-950">{serviceText.impactTitle}</h3>
                        <p className="mt-0.5 text-xs text-slate-600">{serviceText.impactLead}</p>
                      </div>
                    </div>
                    <div className="service-impact-metrics grid grid-cols-4 divide-x divide-slate-200">
                      {processOutcomes.map((item) => {
                        const Icon = item.icon;
                        return (
                          <div key={item.title} className="service-impact-item flex items-center justify-center gap-2 px-3 text-xs font-black text-navy-950">
                            <span className="grid h-7 w-7 place-items-center rounded-full bg-blue-50 text-vector-blue">
                              <Icon aria-hidden="true" size={15} />
                            </span>
                            <span>{item.title}</span>
                            <span className="text-vector-blue" aria-hidden="true">{item.trend === "up" ? "↑" : "↓"}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="process-mobile-grid mt-8 xl:hidden">
                {processSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <article key={step.number} className="process-mobile-step">
                      <div className="flex items-start gap-4">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-50 text-vector-blue">
                          <Icon aria-hidden="true" size={22} />
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-black tracking-[0.18em] text-vector-blue">{step.number}</p>
                          <h3 className="mt-1 text-base font-black leading-tight text-navy-950">{step.title}</h3>
                          <p className="process-mobile-copy mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
                <div className="process-mobile-impact rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy-950 text-white">
                      <Target aria-hidden="true" size={24} />
                    </span>
                    <div>
                      <h3 className="text-base font-black text-navy-950">{serviceText.impactTitle}</h3>
                      <p className="mt-1 text-sm text-slate-600">{serviceText.impactLead}</p>
                    </div>
                  </div>
                  <div className="process-outcome-grid mt-4 grid gap-3 sm:grid-cols-2">
                    {processOutcomes.map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.title} className="flex items-center gap-3 rounded-md bg-blue-50/70 p-3 text-sm font-black text-navy-950">
                          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-vector-blue">
                            <Icon aria-hidden="true" size={17} />
                          </span>
                          <span>{item.title}</span>
                          <span className="ml-auto text-vector-blue" aria-hidden="true">{item.trend === "up" ? "↑" : "↓"}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="dark-surface services-cta py-7 md:py-8">
        <div className="section-wrap grid gap-5 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-center">
          <div>
            <p className="kicker text-vector-cyan">{serviceText.ctaKicker}</p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl font-black leading-tight text-white lg:text-4xl">
              {serviceText.ctaTitle}
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
              {serviceText.ctaLead}
            </p>
          </div>
          <div className="services-cta-right grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="services-cta-proof-row grid grid-cols-3 gap-2 md:gap-3">
              {bottomProof.map((item) => {
                const Icon = item.icon;
                return (
                <div key={item.title} className="services-cta-item flex items-start gap-2 rounded-md bg-white/[0.04] px-3 py-2">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-vector-cyan">
                    <Icon aria-hidden="true" size={16} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xs font-black leading-tight text-white">{item.title}</h3>
                    <p className="mt-1 text-[11px] leading-4 text-slate-300">{item.text}</p>
                  </div>
                </div>
                );
              })}
            </div>
            <Link href="/delivery-process" className="button-primary services-cta-button w-fit justify-self-start md:justify-self-end">
              {serviceText.ctaButton}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ServicesPage() {
  return <main><section className="light-band border-b border-slate-200 py-16 md:py-20"><div className="section-wrap max-w-4xl"><p className="kicker">{isChineseSite ? "服务路径" : "SERVICE ROUTE"}</p><h1 className="mt-5 text-balance text-4xl font-black text-navy-950 md:text-6xl">{isChineseSite ? "查看解决方案与交付方式" : "Explore solutions and delivery"}</h1><p className="mt-6 text-lg leading-9 text-slate-600">{isChineseSite ? "从业务问题、资料和范围出发，了解可讨论的解决方案。" : "Start with the business problem, materials and scope to explore discussable solutions."}</p><Link href="/solutions" className="button-primary mt-8">{isChineseSite ? "查看解决方案" : "Explore solutions"}</Link></div></section></main>;
}
