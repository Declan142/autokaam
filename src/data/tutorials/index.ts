import { Tutorial } from "@/lib/content-types";
import { chatgpt } from "./chatgpt";
import { claude } from "./claude";
import { imageGen } from "./image-gen";
import { videoGen } from "./video-gen";
import { coding } from "./coding";
import { automation } from "./automation";
import { business } from "./business";
import { careers } from "./careers";

export const tutorials: Tutorial[] = [
  ...chatgpt,
  ...claude,
  ...imageGen,
  ...videoGen,
  ...coding,
  ...automation,
  ...business,
  ...careers,
];

export function getAllTutorials(): Tutorial[] {
  return [...tutorials].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getTutorialBySlug(slug: string): Tutorial | undefined {
  return tutorials.find((t) => t.slug === slug);
}

export function getFeaturedTutorials(): Tutorial[] {
  return getAllTutorials().filter((t) => t.featured);
}

export function getTutorialsByCategory(category: string): Tutorial[] {
  return getAllTutorials().filter((t) => t.category === category);
}
