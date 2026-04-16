import { Metadata } from "next";
import Link from "next/link";
import { getAllNews, getFeaturedNews } from "@/data/news";
import { NEWS_CATEGORIES } from "@/lib/content-types";
import NewsCard from "@/components/NewsCard";
import NewsHero from "@/components/NewsHero";

export const metadata: Metadata = {
  title: "AI News India — Latest on ChatGPT, Claude, Sarvam, Gemini, Indian AI",
  description:
    "Latest AI news from India and the world — Sarvam, Krutrim, ChatGPT, Claude, Gemini, OpenAI, Anthropic, Google. Indian angle on every story.",
};

export default function NewsIndexPage() {
  const all = getAllNews();
  const featured = getFeaturedNews()[0] ?? all[0];
  const rest = all.filter((a) => a.slug !== featured.slug);
  const topStories = rest.slice(0, 6);
  const moreStories = rest.slice(6);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <span className="kicker">AutoKaam Desk</span>
        <h1 className="font-serif-heading font-bold text-4xl sm:text-5xl text-gray-900 mt-1">
          AI News
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Launches, deals, and India-angle stories from ChatGPT, Claude, Sarvam, Gemini, and the rest of the AI world.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {NEWS_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/news/category/${cat.slug}/`}
            className={`text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full text-white ${cat.color} hover:opacity-90 transition-opacity`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      <div className="mb-12">
        <NewsHero article={featured} />
      </div>

      <section className="mb-12">
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif-heading font-bold text-2xl text-gray-900">Top Stories</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {topStories.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {moreStories.length > 0 && (
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif-heading font-bold text-2xl text-gray-900">More from AutoKaam</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {moreStories.map((article) => (
              <NewsCard key={article.slug} article={article} size="small" />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
