import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { cases, text } from "@/lib/content-data";
import { isChineseSite } from "@/lib/site-data";
import { StatusBadge } from "@/components/content-sections";
import { buildPageMetadata, pageBreadcrumbJsonLd } from "@/lib/seo-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/work",
  title: isChineseSite ? "典型业务场景" : "Typical Business Scenarios",
  description: isChineseSite ? "以概念方案说明可讨论的业务问题、交付结构与方法。" : "Concept proposals that explain discussable business problems, delivery structures and methods.",
});

const workText = {
  kicker: isChineseSite ? "典型业务场景" : "Typical Business Scenarios",
  ctaTitle: isChineseSite ? "从一个明确的业务场景开始。" : "Start with one defined business scenario.",
  ctaLead: isChineseSite ? "先了解问题、范围与交付方式，再判断下一步。" : "Understand the problem, scope and delivery approach before deciding on next steps.",
  ctaButton: isChineseSite ? "了解交付方式" : "Explore delivery",
};

export default function WorkPage() {
  return (
    <main>
      <JsonLd data={pageBreadcrumbJsonLd(isChineseSite ? "典型业务场景" : "Typical Business Scenarios", "/work")} />
      <section className="wave-field light-band border-b border-slate-200 py-16 md:py-20">
        <div className="section-wrap">
          <p className="kicker">{workText.kicker}</p>
          <h1 className="mt-5 max-w-4xl text-balance text-4xl font-black leading-tight text-navy-950 md:text-6xl">{isChineseSite ? "典型业务场景" : "Typical Business Scenarios"}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg md:leading-9">
            {isChineseSite ? "每项均为概念方案，非客户实绩；用于说明可讨论的业务问题、交付物与方法。" : "Every entry is a concept proposal, not client work. It explains discussable business problems, deliverables and methods."}
          </p>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {cases.map((item) => <Link key={item.slug} href={`/work/${item.slug}`} className="surface rounded-lg p-7"><StatusBadge status={item.status} locale={isChineseSite ? "zh" : "en"} slug={item.slug} /><h2 className="mt-4 text-xl font-black text-navy-950">{text(item.title, isChineseSite ? "zh" : "en")}</h2><p className="mt-4 text-sm leading-7 text-slate-600">{text(item.problem, isChineseSite ? "zh" : "en")}</p></Link>)}
          </div>
        </div>
      </section>


      <section className="section-wrap py-16">
        <div className="dark-surface grid gap-8 rounded-lg p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div className="flex gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white/10 text-vector-cyan">
              <CalendarDays aria-hidden="true" size={25} />
            </span>
            <div>
              <h2 className="text-3xl font-black text-white">{workText.ctaTitle}</h2>
              <p className="mt-3 text-base leading-7 text-slate-300">{workText.ctaLead}</p>
            </div>
          </div>
          <Link href="/delivery-process" className="button-primary">
            {workText.ctaButton}
            <ArrowRight aria-hidden="true" size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
