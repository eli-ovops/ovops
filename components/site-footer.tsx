import Link from "next/link";
import Image from "next/image";
import { BrandLogo } from "@/components/brand-logo";
import { isChineseSite, legalLinks, navigation, site, ui } from "@/lib/site-data";

export function SiteFooter() {
  const footerNavigation = navigation.filter((item) => item.href !== "/contact");
  const primaryFooterNavigation = isChineseSite ? footerNavigation.slice(0, 3) : footerNavigation;
  const secondaryFooterNavigation = isChineseSite ? footerNavigation.slice(3) : [];

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-white">
      <div className="site-footer-wrap section-wrap grid items-start gap-5 py-4 md:grid-cols-[1.25fr_2.2fr_0.85fr]">
        <div className="site-footer-brand min-w-0" data-qa="footer-brand">
          <div className="mb-2.5 flex items-center gap-2.5">
            <BrandLogo variant={isChineseSite ? "cn" : "en"} className="h-8 w-8 rounded-full object-cover shadow-[0_10px_28px_rgba(0,20,39,0.28)]" />
            <div>
              <p className="text-sm font-black text-white">{site.name}</p>
              <p className="text-[11px] font-semibold text-vector-cyan">{isChineseSite ? site.cnName : "AI Productivity Partner"}</p>
            </div>
          </div>
          <p className="mt-3 text-[10px] leading-[13px] text-slate-500">
            © {new Date().getFullYear()} Origin Vector. {isChineseSite ? "版权所有。" : "All rights reserved."}
          </p>
        </div>

        <div className="site-footer-links grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{ui.footerSite}</p>
            <div className="footer-nav-row footer-nav-primary">
              {primaryFooterNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="text-xs font-semibold text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
            {isChineseSite ? (
              <div className="footer-nav-row footer-nav-secondary">
                {secondaryFooterNavigation.map((item) => (
                  <Link key={item.href} href={item.href} className="text-xs font-semibold text-slate-300 transition hover:text-white">
                    {item.label}
                  </Link>
                ))}
                {site.icpFiling ? <span className="footer-filing-row">
                  <a href={site.icpUrl} target="_blank" rel="noreferrer" className="footer-filing-link">{site.icpFiling}</a>
                  <a href={site.publicSecurityUrl} target="_blank" rel="noreferrer" className="footer-filing-link footer-police-link"><Image src="/gongan-beian.png" alt="" width={36} height={40} className="footer-police-icon" unoptimized /><span>{site.publicSecurityFiling}</span></a>
                </span> : null}
              </div>
            ) : null}
          </div>

          <div>
            <p className="mb-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">{ui.footerCompliance}</p>
            <div className="footer-legal-row flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((item) => (
                <Link key={item.href} href={item.href} className="text-xs font-semibold text-slate-300 transition hover:text-white">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
