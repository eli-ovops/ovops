import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { aboutPageCopy, founderFacts, isChineseSite } from "@/lib/site-data";
import { buildPageMetadata, pageBreadcrumbJsonLd } from "@/lib/seo-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/about",
  title: aboutPageCopy.metadataTitle,
  description: aboutPageCopy.metadataDescription,
  absoluteTitle: isChineseSite,
});

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={pageBreadcrumbJsonLd(isChineseSite ? "公司介绍" : "Company Profile", "/about")} />
      <section className="light-band border-b border-slate-200 py-16 md:py-20">
        <div className="section-wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex h-full flex-col justify-center">
            <p className="kicker">{aboutPageCopy.heroKicker}</p>
            <h1 className="mt-5 max-w-2xl text-balance text-4xl font-black leading-tight text-navy-950 md:text-6xl">
              {aboutPageCopy.heroTitle}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
              {aboutPageCopy.heroDescription}
            </p>
            <div className="about-hero-proof-grid mt-10 grid gap-6 md:grid-cols-3">
              {aboutPageCopy.heroProof.map((item) => {
                const Icon = item.icon;
                return (
                <article key={item.title} className="about-hero-proof-item">
                  <span className="icon-bubble">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <h3 className="mt-5 text-sm font-black text-navy-950">{item.title}</h3>
                  <p className="about-hero-proof-copy mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">{item.text}</p>
                </article>
                );
              })}
            </div>
          </div>

          <div className="surface flex h-full items-end overflow-hidden rounded-lg bg-white p-8"><p className="max-w-md text-lg font-black leading-8 text-navy-950">{isChineseSite ? "把网站、系统、知识与流程放进同一业务视角。" : "Bring websites, systems, knowledge and workflows into one business view."}</p></div>
        </div>
      </section>

      <section className="section-wrap py-12 md:py-16">
        <div className="surface grid gap-8 rounded-lg p-7 md:grid-cols-2 md:p-10">
          <div className="md:border-r md:border-slate-200 md:pr-10">
            <h2 className="text-3xl font-black text-navy-950">{aboutPageCopy.whoTitle}</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {aboutPageCopy.whoLead}
            </p>
            <div className="about-service-grid mt-7 grid grid-cols-2 gap-3 sm:gap-4">
              {aboutPageCopy.whoWeAre.map((item) => {
                const Icon = item.icon;
                return (
                <div key={item.title} className="flex items-center gap-3 text-sm font-black text-navy-950">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-blue-100 bg-white text-vector-blue">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  {item.title}
                </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-black text-navy-950">{aboutPageCopy.doTitle}</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              {aboutPageCopy.doLead}
            </p>
            <div className="about-service-grid mt-7 grid grid-cols-2 gap-3 sm:gap-4">
              {aboutPageCopy.whatWeDo.map((item) => {
                const Icon = item.icon;
                return (
                <div key={item.title} className="flex items-center gap-3 text-sm font-black text-navy-950">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-blue-100 bg-white text-vector-blue">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  {item.title}
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-12">
        <div className="surface grid overflow-hidden rounded-lg lg:grid-cols-[0.46fr_0.54fr]">
          <div className="flex min-h-52 items-end bg-blue-50 p-8"><p className="max-w-sm text-lg font-black leading-8 text-navy-950">{isChineseSite ? "以业务问题、资料结构和交付边界组织工作。" : "Organize work around business problems, material structure and delivery boundaries."}</p></div>

          <div className="flex items-center border-t border-slate-200 p-6 lg:border-l lg:border-t-0">
            <div className="founder-facts-grid grid gap-3">
              {founderFacts.map((fact) => (
                <div key={fact} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-vector-blue" aria-hidden="true" size={16} />
                  <p className="text-[13px] font-semibold leading-6 text-slate-700">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrap pb-16">
        <div className="dark-surface about-expertise-band rounded-lg p-7 md:p-9">
          <h2 className="text-balance text-2xl font-black text-white">{aboutPageCopy.expertiseTitle}</h2>
          <div className={`about-expertise-grid mt-8 grid grid-cols-2 gap-5 ${aboutPageCopy.expertiseGridColumns}`}>
            {aboutPageCopy.expertise.map((item) => {
              const Icon = item.icon;
              return (
              <article key={item.title} className="about-expertise-item text-center">
                <span className="about-expertise-icon mx-auto grid h-12 w-12 place-items-center rounded-full bg-white/10 text-vector-cyan">
                  <Icon aria-hidden="true" size={20} />
                </span>
                <p className="about-expertise-title mt-4 text-xs font-semibold leading-5 text-slate-300">{item.title}</p>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-wrap pb-16">
        <h2 className="text-3xl font-black text-navy-950">{aboutPageCopy.workTitle}</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {aboutPageCopy.principles.map((item) => (
            <article key={item.title} className="about-principle-card surface rounded-lg p-6">
              <h3 className="text-lg font-black text-navy-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrap pb-16">
        <div className="dark-surface about-cta-band grid gap-5 rounded-lg p-6 md:grid-cols-[1fr_minmax(220px,0.5fr)] md:items-center md:p-7">
          <h2 className="max-w-lg text-balance text-3xl font-black text-white">{aboutPageCopy.ctaTitle}</h2>
          <div className="md:justify-self-center">
            <Link href="/delivery-process" className="button-primary">
              {aboutPageCopy.ctaButton}
              <ArrowRight aria-hidden="true" size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
