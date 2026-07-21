import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-section";
import { isChineseSite } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/seo-data";

const zh = isChineseSite;
export const metadata: Metadata = buildPageMetadata({ path: "/data-deletion", title: zh ? "数据请求说明" : "Data Request Notice", description: zh ? "当前公开页面的数据请求边界。" : "Data-request boundary for current public pages.", robots: { index: false, follow: false } });
const sections = zh ? [{ title: "1. 当前网站功能", body: ["当前公开页面不提供账户、表单提交或 API 注册功能。"] }, { title: "2. 项目资料", body: ["具体项目中的资料请求与处理方式，以项目文件中的沟通路径和约定为准。"] }] : [{ title: "1. Current site features", body: ["The current public pages provide no accounts, form submission or API registration."] }, { title: "2. Project materials", body: ["For a specific project, material requests and handling follow the communication path and agreements in project documentation."] }];
export default function DataDeletionPage() { return <LegalPage title={zh ? "数据请求说明" : "Data Request Notice"} description={zh ? "本页说明当前公开页面的数据功能边界。" : "This page describes the data-feature boundary of the current public pages."} sections={sections} />; }
