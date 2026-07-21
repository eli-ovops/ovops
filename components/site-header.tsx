"use client";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { domains, isChineseSite, site } from "@/lib/site-data";

type MenuGroup = { label: string; href: string; items: { label: string; href: string }[] };

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [canSwitchLanguage, setCanSwitchLanguage] = useState(false);
  const locale = isChineseSite ? "zh" : "en";
  const primaryBrand = isChineseSite ? site.cnName : site.name;
  const languageHref = isChineseSite ? `https://${domains.en}/` : `https://${domains.zh}/`;
  const groups: MenuGroup[] = locale === "zh" ? [
    { label: "按业务目标", href: "/solutions", items: [{ label: "企业官网与数字化门户", href: "/solutions/websites-portals" }, { label: "企业业务系统", href: "/solutions/business-systems" }, { label: "企业知识管理", href: "/solutions/knowledge-assistants" }, { label: "查看全部业务目标", href: "/solutions" }] },
    { label: "按行业", href: "/industries", items: [{ label: "制造业与外贸", href: "/industries/manufacturing-export" }, { label: "零售与消费", href: "/industries/retail-consumer" }, { label: "医疗健康", href: "/industries/healthcare" }, { label: "查看全部行业", href: "/industries" }] },
    { label: "典型场景", href: "/scenarios", items: [{ label: "企业官网与数字化门户", href: "/scenarios" }, { label: "CRM 与客户管理", href: "/scenarios" }, { label: "库存与订单查询", href: "/scenarios" }, { label: "查看全部典型场景", href: "/scenarios" }] },
  ] : [
    { label: "Business Goals", href: "/solutions", items: [{ label: "Websites & Digital Portals", href: "/solutions/websites-portals" }, { label: "Business Systems", href: "/solutions/business-systems" }, { label: "Knowledge Management", href: "/solutions/knowledge-assistants" }, { label: "View all business goals", href: "/solutions" }] },
    { label: "Industries", href: "/industries", items: [{ label: "Manufacturing & Export", href: "/industries/manufacturing-export" }, { label: "Retail & Consumer", href: "/industries/retail-consumer" }, { label: "Healthcare", href: "/industries/healthcare" }, { label: "View all industries", href: "/industries" }] },
    { label: "Scenarios", href: "/scenarios", items: [{ label: "Website & Digital Portal", href: "/scenarios" }, { label: "CRM & Customer Management", href: "/scenarios" }, { label: "Inventory & Order Lookup", href: "/scenarios" }, { label: "View all scenarios", href: "/scenarios" }] },
  ];
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  useEffect(() => { const timer = window.setTimeout(() => setCanSwitchLanguage(["ovops.com", "www.ovops.com"].includes(window.location.hostname)), 0); return () => window.clearTimeout(timer); }, []);
  const close = () => { setOpen(false); setOpenGroup(null); };
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950 text-white shadow-[0_14px_40px_rgba(0,20,39,0.2)]"><div className="section-wrap flex min-h-[68px] items-center justify-between gap-2 py-2.5 md:min-h-[76px] md:py-3"><Link href="/" className="flex min-w-0 items-center gap-2 md:gap-3" aria-label="Origin Vector home"><BrandLogo variant={isChineseSite ? "cn" : "en"} className="h-9 w-9 shrink-0 rounded-full object-cover md:h-11 md:w-11" /><span className="truncate text-[16px] font-black">{primaryBrand}</span></Link><nav className="hidden items-center gap-1 xl:flex" aria-label="Primary navigation">{groups.map((group) => <div key={group.href} className="relative"><button type="button" className="nav-link inline-flex items-center gap-1 px-3 text-[13px]" onClick={() => setOpenGroup(openGroup === group.href ? null : group.href)} aria-expanded={openGroup === group.href}>{group.label}<ChevronDown size={14} /></button>{openGroup === group.href ? <div className="absolute left-0 top-10 w-64 rounded-lg border border-slate-200 bg-white p-2 text-navy-950 shadow-xl">{group.items.map((item) => <Link key={item.label} href={item.href} onClick={close} className="block rounded-md px-3 py-2 text-sm font-bold hover:bg-slate-100">{item.label}</Link>)}</div> : null}</div>)}<Link href="/delivery-process" className="nav-link px-3 text-[13px]">{isChineseSite ? "交付方式" : "Delivery"}</Link><Link href="/about" className="nav-link px-3 text-[13px]">{isChineseSite ? "关于我们" : "About"}</Link><Link href="/portal" className="nav-link px-3 text-[13px]">Portal</Link></nav><div className="flex items-center gap-2">{canSwitchLanguage ? <a href={languageHref} className="header-language-link hidden text-[13px] xl:inline">{isChineseSite ? "EN" : "中文"}</a> : null}<button type="button" className="grid h-10 w-10 place-items-center rounded-md border border-white/20 xl:hidden" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={20} /> : <Menu size={20} />}</button></div></div>{open ? <nav id="mobile-menu" className="xl:hidden"><div className="section-wrap border-t border-white/10 py-4" aria-label="Mobile navigation">{groups.map((group) => <details key={group.href} className="border-b border-white/10 py-2"><summary className="cursor-pointer py-2 text-sm font-black">{group.label}</summary><div className="grid gap-1 pb-2">{group.items.map((item) => <Link key={item.label} href={item.href} onClick={close} className="rounded-md px-3 py-2 text-sm text-white hover:bg-white/10">{item.label}</Link>)}</div></details>)}<Link href="/delivery-process" onClick={close} className="block rounded-md px-3 py-3 text-sm font-black">{isChineseSite ? "交付方式" : "Delivery"}</Link><Link href="/about" onClick={close} className="block rounded-md px-3 py-3 text-sm font-black">{isChineseSite ? "关于我们" : "About"}</Link><Link href="/portal" onClick={close} className="block rounded-md px-3 py-3 text-sm">Portal</Link></div></nav> : null}</header>;
}
