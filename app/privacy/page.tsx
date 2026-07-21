import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-section";
import { isChineseSite } from "@/lib/site-data";
import { buildPageMetadata } from "@/lib/seo-data";

const zh = isChineseSite;
export const metadata: Metadata = buildPageMetadata({ path: "/privacy", title: zh ? "隐私说明" : "Privacy Notice", description: zh ? "本网站当前公开页面的数据处理说明。" : "Data-handling information for this website's current public pages.", robots: { index: false, follow: false } });
const sections = zh ? [{ title: "1. 当前公开页面", body: ["本网站当前不提供表单提交、账户注册或客户项目数据展示。"] }, { title: "2. 浏览与第三方服务", body: ["浏览器、网络服务和第三方平台可能依其自身规则处理技术信息。请查阅相应服务的公开说明。"] }, { title: "3. 项目资料", body: ["如开展具体项目，资料范围、访问权限和处理方式将在项目文件中说明。"] }] : [{ title: "1. Current public pages", body: ["This website currently provides no form submission, account registration or client-project data display."] }, { title: "2. Browsing and third-party services", body: ["Browsers, network services and third-party platforms may process technical information under their own policies. Please consult the relevant public notices."] }, { title: "3. Project materials", body: ["For a specific project, material scope, access permissions and handling approach are described in project documentation."] }];
export default function PrivacyPage() { return <LegalPage title={zh ? "隐私说明" : "Privacy Notice"} description={zh ? "本页说明当前公开页面的基本边界。" : "This page explains the basic boundary of the current public pages."} sections={sections} />; }
