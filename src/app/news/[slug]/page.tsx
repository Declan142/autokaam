import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNews, getNewsBySlug, getNewsByCategory } from "@/data/news";
import { NEWS_CATEGORIES } from "@/lib/content-types";
import { renderMarkdown, formatDate } from "@/lib/markdown";
import NewsCard from "@/components/NewsCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
      images: [{ url: article.image, alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const cat = NEWS_CATEGORIES.find((c) => c.slug === article.category);
  const related = getNewsByCategory(article.category)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.excerpt,
    image: [article.image],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "AutoKaam",
      logo: { "@type": "ImageObject", url: "https://autokaam.com/icon.png" },
    },
    keywords: article.tags.join(", "),
  };

  const html = renderMarkdown(article.body);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="relative">
        <div className="aspect-[21/9] sm:aspect-[24/9] w-full bg-gray-900 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt={article.imageAlt} className="w-full h-full object-cover opacity-60" />
        </div>
        <div className="absolute inset-0 image-overlay" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pb-8 sm:pb-14 text-white">
            {cat && (
              <Link
                href={`/news/category/${cat.slug}/`}
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${cat.color} text-white mb-4`}
              >
                {cat.name}
              </Link>
            )}
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-base sm:text-lg text-gray-200 max-w-3xl">
              {article.subtitle}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/news/" className="hover:text-gray-700">News</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 line-clamp-1">{article.title}</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-8">
          <span className="font-medium text-gray-700">{article.author}</span>
          <span>&middot;</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span>&middot;</span>
          <span>{article.readingTime} min read</span>
        </div>

        <div
          className="prose-magazine text-gray-800"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {article.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif-heading font-bold text-2xl text-gray-900 mb-6">Related {cat?.name ?? "News"}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
              {related.map((a) => (
                <NewsCard key={a.slug} article={a} />
              ))}
            </div>
            <div className="mt-8">
              <Link href="/news/" className="text-sm font-medium text-orange-600 hover:text-orange-700">
                &larr; Back to all news
              </Link>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
