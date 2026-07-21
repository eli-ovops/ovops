import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetail } from "@/components/detail-page";
import { isChineseSite } from "@/lib/site-data";
import { services, text } from "@/lib/content-data";
import { buildPageMetadata } from "@/lib/seo-data";
export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const item = services.find((entry) => entry.slug === slug); const locale = isChineseSite ? "zh" as const : "en" as const; return item ? buildPageMetadata({ path: `/solutions/${item.slug}`, title: text(item.title, locale), description: text(item.problem, locale) }) : {}; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = services.find((entry) => entry.slug === slug); if (!item) notFound(); return <SolutionDetail item={item} locale={isChineseSite ? "zh" : "en"} />; }
