import { MetadataRoute } from "next";
import { getAllTools, getComparisons, getAllCategories } from "@/lib/tools";
import { getAllNews } from "@/data/news";
import { getAllTutorials } from "@/data/tutorials";
import { NEWS_CATEGORIES, TUTORIAL_CATEGORIES } from "@/lib/content-types";

export const dynamic = "force-static";

const BASE = "https://autokaam.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/news/`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE}/tutorials/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/tools/`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  const newsPages: MetadataRoute.Sitemap = getAllNews().map((n) => ({
    url: `${BASE}/news/${n.slug}/`,
    lastModified: n.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const newsCategoryPages: MetadataRoute.Sitemap = NEWS_CATEGORIES.map((c) => ({
    url: `${BASE}/news/category/${c.slug}/`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const tutorialPages: MetadataRoute.Sitemap = getAllTutorials().map((t) => ({
    url: `${BASE}/tutorials/${t.slug}/`,
    lastModified: t.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const tutorialCategoryPages: MetadataRoute.Sitemap = TUTORIAL_CATEGORIES.map((c) => ({
    url: `${BASE}/tutorials/category/${c.slug}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

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

  return [
    ...staticPages,
    ...newsPages,
    ...newsCategoryPages,
    ...tutorialPages,
    ...tutorialCategoryPages,
    ...toolPages,
    ...categoryPages,
    ...comparisonPages,
  ];
}
