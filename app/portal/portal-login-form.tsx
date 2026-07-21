import { LockKeyhole } from "lucide-react";
import { businessFacts } from "@/lib/confirmed-facts";
import { canPublishFact, pendingFactNotice } from "@/lib/content-visibility";
import { isChineseSite } from "@/lib/site-data";

export function PortalLoginForm() {
  const portalReady = canPublishFact(businessFacts.portal);

  return (
    <section className="portal-login-form mx-auto flex h-full w-full max-w-[520px] flex-col justify-center rounded-lg border border-blue-100 bg-blue-50/55 p-7 shadow-[0_22px_60px_rgba(22,119,255,0.08)] md:p-8" aria-label="Client workspace access status">
      <LockKeyhole className="text-vector-blue" aria-hidden="true" size={24} />
      <h2 className="mt-5 text-xl font-black text-navy-950">{portalReady ? (isChineseSite ? "受邀客户访问" : "Invited client access") : (isChineseSite ? "客户工作区访问待确认" : "Client workspace access pending confirmation")}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{portalReady ? (isChineseSite ? "请使用项目方提供的已确认邀请路径。" : "Use the confirmed invitation path supplied for your project.") : pendingFactNotice()}</p>
      <p className="mt-4 text-xs leading-6 text-slate-500">{isChineseSite ? "本预览页不提供登录、密码收集或项目数据。" : "No login, password collection or project data is available from this preview page."}</p>
    </section>
  );
}
