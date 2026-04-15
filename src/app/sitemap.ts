import { MetadataRoute } from "next";
import { getAllTools, getComparisons, getAllCategories } from "@/lib/tools";

export const dynamic = "force-static";

const BASE = "https://autokaam.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/tools/`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
  ];

  const toolPages: MetadataRoute.Sitemap = getAllTools().map((t) => ({
    url: `${BASE}/tools/${t.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryPages: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${BASE}/category/${c.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const comparisonPages: MetadataRoute.Sitemap = getComparisons().map((c) => ({
    url: `${BASE}/compare/${c.slugA}-vs-${c.slugB}/`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...toolPages, ...categoryPages, ...comparisonPages];
}
