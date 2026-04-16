import Link from "next/link";
import { NewsArticle, NEWS_CATEGORIES } from "@/lib/content-types";
import { formatDate } from "@/lib/markdown";

export default function NewsHero({ article }: { article: NewsArticle }) {
  const cat = NEWS_CATEGORIES.find((c) => c.slug === article.category);

  return (
    <Link
      href={`/news/${article.slug}/`}
      className="group block relative overflow-hidden rounded-2xl card-image-zoom"
    >
      <div className="aspect-[16/9] sm:aspect-[21/9] w-full bg-gray-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
          loading="eager"
        />
      </div>
      <div className="image-overlay absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
        <div className="max-w-3xl">
          {cat && (
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${cat.color} text-white mb-4`}>
              {cat.name}
            </span>
          )}
          <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-3">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-gray-200 line-clamp-2 mb-4 max-w-2xl">
            {article.subtitle}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <span>{article.author}</span>
            <span>&middot;</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>&middot;</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
