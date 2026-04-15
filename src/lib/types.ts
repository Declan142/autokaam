export type Category =
  | "writing"
  | "image"
  | "video"
  | "code"
  | "chat"
  | "audio"
  | "search"
  | "productivity"
  | "design"
  | "marketing"
  | "education"
  | "indian-ai"
  | "automation";

export interface CategoryInfo {
  slug: Category;
  name: string;
  nameHi: string;
  description: string;
  icon: string;
}

export type PricingModel = "free" | "freemium" | "paid";

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  taglineHi: string;
  description: string;
  descriptionHi: string;
  category: Category;
  pricing: {
    model: PricingModel;
    freeTier: string;
    priceInrMonthly: number | null;
    priceInrAnnualMonthly: number | null;
  };
  features: string[];
  pros: string[];
  cons: string[];
  useCases: string[];
  alternatives: string[];
  rating: number;
  company: string;
  website: string;
  icon: string;
  founded: number;
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: "writing", name: "Writing & Content", nameHi: "लेखन और कंटेंट", description: "AI tools for writing articles, blogs, emails, and creative content", icon: "✍️" },
  { slug: "image", name: "Image Generation", nameHi: "इमेज जेनरेशन", description: "Create stunning images, art, and graphics with AI", icon: "🎨" },
  { slug: "video", name: "Video & Animation", nameHi: "वीडियो और एनीमेशन", description: "AI-powered video creation, editing, and animation tools", icon: "🎬" },
  { slug: "code", name: "Code & Development", nameHi: "कोड और डेवलपमेंट", description: "AI coding assistants, code generation, and developer tools", icon: "💻" },
  { slug: "chat", name: "Chat & Assistants", nameHi: "चैट और असिस्टेंट", description: "AI chatbots and virtual assistants for conversations", icon: "💬" },
  { slug: "audio", name: "Audio & Music", nameHi: "ऑडियो और म्यूज़िक", description: "AI tools for voice synthesis, music generation, and audio editing", icon: "🎵" },
  { slug: "search", name: "Search & Research", nameHi: "सर्च और रिसर्च", description: "AI-powered search engines and research assistants", icon: "🔍" },
  { slug: "productivity", name: "Productivity", nameHi: "प्रोडक्टिविटी", description: "Boost your workflow with AI productivity tools", icon: "⚡" },
  { slug: "design", name: "Design & UI", nameHi: "डिज़ाइन और UI", description: "AI tools for graphic design, UI/UX, and creative work", icon: "🎯" },
  { slug: "marketing", name: "Marketing & SEO", nameHi: "मार्केटिंग और SEO", description: "AI tools for digital marketing, SEO, and advertising", icon: "📈" },
  { slug: "education", name: "Education & Learning", nameHi: "शिक्षा और लर्निंग", description: "AI tutors, learning platforms, and educational tools", icon: "📚" },
  { slug: "indian-ai", name: "Made in India AI", nameHi: "भारतीय AI", description: "AI tools built in India for Indian users", icon: "🇮🇳" },
  { slug: "automation", name: "Automation", nameHi: "ऑटोमेशन", description: "Automate workflows and processes with AI", icon: "🤖" },
];
