export type NewsCategory = "launches" | "updates" | "research" | "industry" | "india";
export type TutorialLevel = "beginner" | "intermediate" | "advanced";
export type TutorialCategory =
  | "chatgpt"
  | "claude"
  | "image-gen"
  | "video-gen"
  | "coding"
  | "automation"
  | "business"
  | "careers";

export interface NewsArticle {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  category: NewsCategory;
  tags: string[];
  image: string;
  imageAlt: string;
  imageCredit?: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  featured?: boolean;
  relatedTools?: string[];
}

export interface Tutorial {
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  body: string;
  category: TutorialCategory;
  level: TutorialLevel;
  tags: string[];
  image: string;
  imageAlt: string;
  author: string;
  publishedAt: string;
  readingTime: number;
  toolsUsed: string[];
  featured?: boolean;
}

export const NEWS_CATEGORIES: { slug: NewsCategory; name: string; color: string }[] = [
  { slug: "launches", name: "Launches", color: "bg-red-500" },
  { slug: "updates", name: "Updates", color: "bg-blue-500" },
  { slug: "research", name: "Research", color: "bg-purple-500" },
  { slug: "industry", name: "Industry", color: "bg-green-600" },
  { slug: "india", name: "India AI", color: "bg-orange-500" },
];

export const TUTORIAL_CATEGORIES: { slug: TutorialCategory; name: string; icon: string }[] = [
  { slug: "chatgpt", name: "ChatGPT", icon: "🤖" },
  { slug: "claude", name: "Claude", icon: "🧠" },
  { slug: "image-gen", name: "Image Generation", icon: "🎨" },
  { slug: "video-gen", name: "Video Generation", icon: "🎬" },
  { slug: "coding", name: "AI Coding", icon: "💻" },
  { slug: "automation", name: "Automation", icon: "⚡" },
  { slug: "business", name: "For Business", icon: "💼" },
  { slug: "careers", name: "AI Careers", icon: "🎯" },
];
