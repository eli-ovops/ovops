import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, ShieldCheck } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { isChineseSite } from "@/lib/site-data";
import { buildPageMetadata, pageBreadcrumbJsonLd } from "@/lib/seo-data";

export const metadata: Metadata = buildPageMetadata({
  path: "/portal",
  title: isChineseSite ? "受邀客户工作区" : "Invited Client Workspace",
  description: isChineseSite ? "面向已获得项目邀请的工作区说明。" : "Workspace information for people who have received a project invitation.",
  robots: { index: false, follow: false },
});

export default function ClientPortalPage() {
  const copy = isChineseSite
    ? {
        title: "受邀客户工作区",
        lead: "项目协作所需的访问方式、资料范围与支持安排，会在项目沟通中提供给受邀参与者。此页面不收集登录信息或展示项目数据。",
        points: [["访问说明", "通过项目沟通中提供的专用路径进入工作区。"], ["资料边界", "项目资料、账户信息和协作记录仅在相应工作区内处理。"]],
        cta: "了解交付方式",
      }
    : {
        title: "Invited Client Workspace",
        lead: "Access guidance, material scope and support arrangements are shared with invited participants during project communication. This page does not collect sign-in information or show project data.",
        points: [["Access guidance", "Use the dedicated path shared in project communication to enter a workspace."], ["Material boundary", "Project materials, account information and collaboration records are handled only in the relevant workspace."]],
        cta: "Explore delivery",
      };

  return <main><JsonLd data={pageBreadcrumbJsonLd(copy.title, "/portal")} /><section className="light-band border-b border-slate-200 py-16 md:py-20"><div className="section-wrap max-w-4xl"><p className="kicker">{isChineseSite ? "项目协作" : "PROJECT COLLABORATION"}</p><h1 className="mt-5 text-balance text-4xl font-black text-navy-950 md:text-6xl">{copy.title}</h1><p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600">{copy.lead}</p></div></section><section className="section-wrap grid gap-5 py-16 md:grid-cols-2">{copy.points.map(([title, body], index) => { const Icon = index === 0 ? ShieldCheck : BookOpenCheck; return <article key={title} className="surface rounded-lg p-7"><Icon className="text-vector-blue" aria-hidden="true" size={24} /><h2 className="mt-5 text-xl font-black text-navy-950">{title}</h2><p className="mt-3 text-sm leading-7 text-slate-600">{body}</p></article>; })}</section><section className="section-wrap pb-16"><Link href="/delivery-process" className="button-secondary">{copy.cta}<ArrowRight aria-hidden="true" size={16} /></Link></section></main>;
}
