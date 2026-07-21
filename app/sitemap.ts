import type { MetadataRoute } from "next";
import { normalizeSeoPath } from "@/lib/seo-data";
import { siteUrl } from "@/lib/site-data";
import { isOtherWaterWorkspaceBuild, otherWaterWorkspaceUrl } from "@/lib/workspace-mode";
import { cases, industries, services } from "@/lib/content-data";

export const dynamic = "force-static";

type SitemapRouteConfig = {
  route: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
  lastModified?: string;
};

const routeConfigs: SitemapRouteConfig[] = [
  { route: "/", changeFrequency: "weekly", priority: 1 },
  { route: "/solutions", changeFrequency: "monthly", priority: 0.95 },
  { route: "/industries", changeFrequency: "monthly", priority: 0.8 },
  { route: "/scenarios", changeFrequency: "monthly", priority: 0.8 },
  { route: "/delivery-process", changeFrequency: "monthly", priority: 0.75 },
  { route: "/faq", changeFrequency: "monthly", priority: 0.75 },
  { route: "/insights", changeFrequency: "monthly", priority: 0.75 },
  { route: "/about", changeFrequency: "monthly", priority: 0.9 },
  { route: "/work", changeFrequency: "monthly", priority: 0.75 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  if (isOtherWaterWorkspaceBuild) {
    return [
      {
        url: `${otherWaterWorkspaceUrl}/`,
        lastModified: new Date("2026-06-22"),
        changeFrequency: "daily",
        priority: 0.1,
      },
    ];
  }

  const fixedRoutes = routeConfigs.map(({ route, changeFrequency, priority, lastModified }) => ({
    url: `${siteUrl}${normalizeSeoPath(route)}`,
    lastModified: new Date(lastModified ?? "2026-06-12"),
    changeFrequency,
    priority,
  }));
  const contentRoutes = [
    ...services.map(({ slug }) => `/solutions/${slug}`),
    ...industries.map(({ slug }) => `/industries/${slug}`),
    ...cases.map(({ slug }) => `/work/${slug}`),
  ].map((route) => ({ url: `${siteUrl}${normalizeSeoPath(route)}`, lastModified: new Date("2026-07-20"), changeFrequency: "monthly" as const, priority: 0.65 }));
  return [...fixedRoutes, ...contentRoutes];
}
