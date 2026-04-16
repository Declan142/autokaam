import Link from "next/link";
import { NewsArticle, NEWS_CATEGORIES } from "@/lib/content-types";
import { formatDate } from "@/lib/markdown";

export default function NewsCard({ article, size = "medium" }: { article: NewsArticle; size?: "small" | "medium" | "large" }) {
  const cat = NEWS_CATEGORIES.find((c) => c.slug === article.category);
  const isLarge = size === "large";
  const isSmall = size === "small";

  return (
    <Link
      href={`/news/${article.slug}/`}
      className="group block card-hover"
    >
      <article className="flex flex-col h-full">
        <div className={`card-image-zoom overflow-hidden bg-gray-100 ${isSmall ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className={`flex flex-col flex-1 ${isLarge ? "pt-5" : "pt-4"}`}>
          {cat && (
            <span className={`kicker inline-block mb-2 ${cat.color.replace("bg-", "text-")}`}>
              {cat.name}
            </span>
          )}
          <h3 className={`font-serif-heading font-bold text-gray-900 group-hover:text-gray-700 transition-colors leading-tight ${
            isLarge ? "text-2xl sm:text-3xl" : isSmall ? "text-base" : "text-xl"
          }`}>
            {article.title}
          </h3>
          {!isSmall && (
            <p className={`text-gray-600 mt-2 ${isLarge ? "text-base" : "text-sm"} line-clamp-3`}>
              {article.excerpt}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-100">
            <span>{article.author}</span>
            <span>&middot;</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>&middot;</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
