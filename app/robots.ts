import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-data";
import { isOtherWaterWorkspaceBuild, otherWaterWorkspaceUrl } from "@/lib/workspace-mode";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (isOtherWaterWorkspaceBuild) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${otherWaterWorkspaceUrl}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
