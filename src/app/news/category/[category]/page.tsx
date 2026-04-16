import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getNewsByCategory } from "@/data/news";
import { NEWS_CATEGORIES, NewsCategory } from "@/lib/content-types";
import NewsCard from "@/components/NewsCard";
import NewsHero from "@/components/NewsHero";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return NEWS_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = NEWS_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} News — AI ${cat.name}`,
    description: `Latest ${cat.name} news on AutoKaam — AI launches, updates, and India-angle stories.`,
  };
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = NEWS_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const articles = getNewsByCategory(category as NewsCategory);
  if (articles.length === 0) notFound();

  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/news/" className="hover:text-gray-700">News</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{cat.name}</span>
      </nav>

      <div className="mb-8 sm:mb-10 flex items-center gap-3">
        <span className={`inline-block w-3 h-10 ${cat.color}`} />
        <div>
          <span className="kicker">Category</span>
          <h1 className="font-serif-heading font-bold text-4xl sm:text-5xl text-gray-900 mt-1">
            {cat.name}
          </h1>
        </div>
      </div>

      <div className="mb-12">
        <NewsHero article={featured} />
      </div>

      {rest.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {rest.map((article) => (
            <NewsCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
