import { NewsArticle } from "@/lib/content-types";
import { launches } from "./launches";
import { india } from "./india";
import { industry } from "./industry";
import { updates } from "./updates";

export const news: NewsArticle[] = [
  ...launches,
  ...india,
  ...industry,
  ...updates,
];

export function getAllNews(): NewsArticle[] {
  return [...news].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
  return news.find((n) => n.slug === slug);
}

export function getFeaturedNews(): NewsArticle[] {
  return getAllNews().filter((n) => n.featured);
}

export function getNewsByCategory(category: string): NewsArticle[] {
  return getAllNews().filter((n) => n.category === category);
}
