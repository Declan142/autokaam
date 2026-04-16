import Link from "next/link";
import { Tutorial, TUTORIAL_CATEGORIES } from "@/lib/content-types";
import { formatDate } from "@/lib/markdown";

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

export default function TutorialCard({ tutorial, size = "medium" }: { tutorial: Tutorial; size?: "small" | "medium" | "large" }) {
  const cat = TUTORIAL_CATEGORIES.find((c) => c.slug === tutorial.category);
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <Link
      href={`/tutorials/${tutorial.slug}/`}
      className="group block card-hover"
    >
      <article className="flex flex-col h-full">
        <div className={`card-image-zoom overflow-hidden bg-gray-100 rounded-lg ${isSmall ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tutorial.image}
            alt={tutorial.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className={`flex flex-col flex-1 ${isLarge ? "pt-5" : "pt-4"}`}>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {cat && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700">
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </span>
            )}
            <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${LEVEL_COLORS[tutorial.level]}`}>
              {tutorial.level}
            </span>
          </div>
          <h3 className={`font-serif-heading font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight ${
            isLarge ? "text-2xl sm:text-3xl" : isSmall ? "text-base" : "text-xl"
          }`}>
            {tutorial.title}
          </h3>
          {!isSmall && (
            <p className={`text-gray-600 mt-2 ${isLarge ? "text-base" : "text-sm"} line-clamp-2`}>
              {tutorial.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
            <span>{formatDate(tutorial.publishedAt)}</span>
            <span>&middot;</span>
            <span>{tutorial.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
