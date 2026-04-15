import { tools } from "@/data/tools";
import { Tool, Category, CATEGORIES, CategoryInfo } from "@/lib/types";

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}

export function getCategoryInfo(slug: Category): CategoryInfo | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getAllCategories(): CategoryInfo[] {
  return CATEGORIES;
}

export function getCategoriesWithTools(): (CategoryInfo & { count: number })[] {
  return CATEGORIES.map((c) => ({
    ...c,
    count: tools.filter((t) => t.category === c.slug).length,
  })).filter((c) => c.count > 0);
}

export function getComparisons(): { slugA: string; slugB: string }[] {
  const pairs: { slugA: string; slugB: string }[] = [];
  const byCategory = new Map<Category, Tool[]>();

  for (const tool of tools) {
    const list = byCategory.get(tool.category) || [];
    list.push(tool);
    byCategory.set(tool.category, list);
  }

  for (const group of byCategory.values()) {
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        pairs.push({ slugA: group[i].slug, slugB: group[j].slug });
      }
    }
  }

  return pairs;
}

export function getComparisonSlug(a: string, b: string): string {
  return `${a}-vs-${b}`;
}

export function parseComparisonSlug(slug: string): { slugA: string; slugB: string } | null {
  const match = slug.match(/^(.+)-vs-(.+)$/);
  if (!match) return null;
  const [, a, b] = match;
  // find valid tool combination
  const toolA = tools.find((t) => slug.startsWith(t.slug + "-vs-"));
  if (!toolA) return null;
  const rest = slug.slice(toolA.slug.length + 4); // skip "-vs-"
  const toolB = tools.find((t) => t.slug === rest);
  if (!toolB) return null;
  return { slugA: toolA.slug, slugB: toolB.slug };
}

export function getPricingLabel(model: string): string {
  switch (model) {
    case "free": return "Free";
    case "freemium": return "Freemium";
    case "paid": return "Paid";
    default: return model;
  }
}

export function formatPrice(price: number | null): string {
  if (price === null) return "Free";
  return `₹${price.toLocaleString("en-IN")}`;
}

export function getRelatedTools(slug: string): Tool[] {
  const tool = getToolBySlug(slug);
  if (!tool) return [];
  return tool.alternatives
    .map((s) => getToolBySlug(s))
    .filter((t): t is Tool => t !== undefined);
}
