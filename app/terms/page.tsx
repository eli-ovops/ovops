import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-section";
import { isChineseSite } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/seo-data";

const zh = isChineseSite;
export const metadata: Metadata = buildPageMetadata({ path: "/terms", title: zh ? "服务说明" : "Service Notice", description: zh ? "网站内容与项目文件的适用边界。" : "The boundary between website content and project documentation.", robots: { index: false, follow: false } });
const sections = zh ? [{ title: "1. 网站内容", body: ["本网站用于介绍可讨论的业务场景、方法和服务方向。"] }, { title: "2. 项目范围", body: ["具体范围、交付物、周期、费用、维护与部署安排，以双方项目文件为准。"] }, { title: "3. 概念方案", body: ["典型业务场景均为概念方案，非客户实绩，不构成成果、价格或服务承诺。"] }] : [{ title: "1. Website content", body: ["This website introduces discussable business scenarios, methods and service directions."] }, { title: "2. Project scope", body: ["Specific scope, deliverables, timing, fees, maintenance and deployment arrangements follow the project documentation between the parties."] }, { title: "3. Concept proposals", body: ["Typical business scenarios are concept proposals, not client work, and do not constitute an outcome, price or service commitment."] }];
export default function TermsPage() { return <LegalPage title={zh ? "服务说明" : "Service Notice"} description={zh ? "请以项目文件了解具体服务安排。" : "Refer to project documentation for specific service arrangements."} sections={sections} />; }
