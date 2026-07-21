import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/detail-page";
import { cases, text } from "@/lib/content-data";
import { isChineseSite } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/seo-data";
export function generateStaticParams() { return cases.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = cases.find((entry) => entry.slug === slug); const locale = isChineseSite ? "zh" as const : "en" as const; return item ? buildPageMetadata({ path: `/work/${item.slug}`, title: text(item.title, locale), description: text(item.background, locale) }) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = cases.find((entry) => entry.slug === slug); if (!item) notFound(); return <CaseDetail item={item} locale={isChineseSite ? "zh" : "en"} />; }
