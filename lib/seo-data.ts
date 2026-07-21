import type { Metadata } from "next";
import { domains, isChineseSite, siteUrl } from "@/lib/site-data";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${normalizeSeoPath(item.path)}`,
    })),
  };
}

export function pageBreadcrumbJsonLd(pageName: string, path: string) {
  return breadcrumbJsonLd([
    { name: isChineseSite ? "首页" : "Home", path: "/" },
    { name: pageName, path },
  ]);
}

export function normalizeSeoPath(path: string) {
  if (!path || path === "/") {
    return "/";
  }

  const withLeadingSlash = path.startsWith("/") ? path : `/${path}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function absoluteSiteUrl(domain: string, path: string) {
  return `https://${domain}${normalizeSeoPath(path)}`;
}

export function pageAlternates(path: string) {
  const canonical = normalizeSeoPath(path);

  return {
    canonical,
    languages: {
      "zh-CN": absoluteSiteUrl(domains.zh, canonical),
      en: absoluteSiteUrl(domains.en, canonical),
      "x-default": absoluteSiteUrl(domains.en, canonical),
    },
  };
}

type BuildPageMetadataOptions = {
  path: string;
  title: string;
  description: string;
  absoluteTitle?: boolean;
  alternates?: Metadata["alternates"];
  robots?: Metadata["robots"];
};

export function buildPageMetadata({
  path,
  title,
  description,
  absoluteTitle = false,
  alternates,
  robots,
}: BuildPageMetadataOptions): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: alternates ?? pageAlternates(path),
    ...(robots ? { robots } : {}),
  };
}

type ServiceJsonLdOptions = {
  path: string;
  name: string;
  serviceType: string | string[];
  description: string;
  areaServed?: string;
};

export function buildServiceJsonLd({
  path,
  name,
  serviceType,
  description,
  areaServed,
}: ServiceJsonLdOptions) {
  const normalizedPath = normalizeSeoPath(path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}${normalizedPath}#service`,
    name,
    serviceType,
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    url: `${siteUrl}${normalizedPath}`,
    description,
    ...(areaServed ? { areaServed } : {}),
  };
}
