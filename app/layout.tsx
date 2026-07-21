import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { pageAlternates } from "@/lib/seo-data";
import { isChineseSite, locale, site, siteUrl } from "@/lib/site-data";
import { isOtherWaterWorkspaceBuild, otherWaterWorkspaceUrl } from "@/lib/workspace-mode";
import { businessFacts } from "@/lib/confirmed-facts";
import { isConfirmedForPublicUse } from "@/lib/content-policy";

const logoImage = {
  url: isChineseSite ? "/origin-vector-logo-cn.png" : "/origin-vector-logo-en.png",
  width: 720,
  height: 720,
  alt: isChineseSite ? "Origin Vector Chinese logo" : "Origin Vector logo",
};

const socialImage = {
  url: "/social/ovops-search-preview.png",
  width: 1536,
  height: 1024,
  alt: isChineseSite ? "原点向量企业AI提效定制开发" : "Origin Vector AI productivity and custom development",
};

const siteTitle = isChineseSite ? "原点向量 - AI提效服务商" : "Origin Vector | AI Productivity Partner";
const metadataSiteUrl = isOtherWaterWorkspaceBuild ? otherWaterWorkspaceUrl : siteUrl;
const metadataTitle = isOtherWaterWorkspaceBuild ? "OVOPS Client Command Center | OtherWater" : siteTitle;
const metadataDescription = isOtherWaterWorkspaceBuild
  ? "OtherWater 客户项目总看板，展示项目判断、KPI、客户待办、数据源状态、证据和交付验收。"
  : site.description;
const hasPublicEntity = isConfirmedForPublicUse(businessFacts.legalEntity);
const hasPublicContact = isConfirmedForPublicUse(businessFacts.contact);
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: isChineseSite ? "原点向量" : "Origin Vector",
  alternateName: (isChineseSite ? ["Origin Vector", "OVOPS"] : ["OVOPS", "原点向量"]),
  ...(hasPublicEntity ? { legalName: site.legalName } : {}),
  url: siteUrl,
  logo: `${siteUrl}${logoImage.url}`,
  description: site.description,
  foundingDate: "2026-05-29",
  ...(hasPublicContact ? { email: site.email } : {}),
  sameAs: [
    "https://www.instagram.com/origin.vector/",
    "https://www.facebook.com/profile.php?id=61590386709602",
  ],
  ...(hasPublicContact ? { contactPoint: {
    "@type": "ContactPoint",
    email: site.email,
    contactType: isChineseSite ? "业务咨询" : "business inquiries",
    availableLanguage: isChineseSite ? ["zh-CN", "en"] : ["en", "zh-CN"],
  } } : {}),
  ...(hasPublicEntity ? { address: {
    "@type": "PostalAddress",
    addressLocality: isChineseSite ? "深圳" : "Shenzhen",
    addressRegion: isChineseSite ? "广东" : "Guangdong",
    addressCountry: "CN",
  } } : {}),
  knowsAbout: isChineseSite
    ? ["原点向量", "AI提效服务", "AI企业提效", "企业AI提效", "AI业务系统", "AI工作流自动化", "企业知识库", "AI客服销售提效"]
    : ["AI productivity", "AI workflow automation", "operations workflows", "sales support", "RAG-ready knowledge bases", "business dashboards"],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: isChineseSite ? "原点向量" : "Origin Vector",
  alternateName: isChineseSite ? ["Origin Vector", "原点向量官网", "OVOPS"] : ["OVOPS", "原点向量"],
  url: siteUrl,
  description: site.description,
  inLanguage: locale === "zh" ? "zh-CN" : "en",
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${siteUrl}/services/#service`,
  name: isChineseSite ? "原点向量AI企业提效服务" : "Origin Vector AI Productivity Services",
  serviceType: isChineseSite
    ? ["AI企业提效", "AI提效", "AI工作流自动化", "企业知识库", "AI客服销售提效"]
    : ["AI productivity", "AI workflow automation", "RAG-ready knowledge bases", "sales support enablement"],
  provider: {
    "@id": `${siteUrl}/#organization`,
  },
  areaServed: isChineseSite ? "中国" : "Global",
  url: `${siteUrl}/services/`,
  description: isChineseSite
    ? "原点向量为企业提供AI提效、AI企业提效诊断、AI工作流自动化、岗位智能体、企业知识库和客服销售提效服务。"
    : "Origin Vector helps businesses build practical AI productivity workflows, role-based agents, RAG-ready knowledge bases and measurable operating systems.",
};

export const metadata: Metadata = {
  metadataBase: new URL(metadataSiteUrl),
  title: {
    default: metadataTitle,
    template: isChineseSite ? "%s - 原点向量" : "%s | Origin Vector",
  },
  description: metadataDescription,
  alternates: pageAlternates("/"),
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: metadataSiteUrl,
    siteName: "Origin Vector",
    locale: isChineseSite ? "zh_CN" : "en_US",
    type: "website",
    images: [socialImage],
  },
  twitter: {
    card: "summary",
    title: metadataTitle,
    description: metadataDescription,
    images: [socialImage.url],
  },
  robots: {
    index: !isOtherWaterWorkspaceBuild,
    follow: !isOtherWaterWorkspaceBuild,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={locale === "zh" ? "zh-CN" : "en"} data-scroll-behavior="smooth">
      <body>
        {isOtherWaterWorkspaceBuild ? null : <JsonLd data={[organizationJsonLd, webSiteJsonLd, serviceJsonLd]} />}
        <div className={isOtherWaterWorkspaceBuild ? "workspace-shell" : "page-shell"}>
          {isOtherWaterWorkspaceBuild ? null : <SiteHeader />}
          {children}
          {isOtherWaterWorkspaceBuild ? null : <SiteFooter />}
        </div>
      </body>
    </html>
  );
}
