import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTutorials, getTutorialBySlug, getTutorialsByCategory } from "@/data/tutorials";
import { getToolBySlug } from "@/lib/tools";
import { TUTORIAL_CATEGORIES } from "@/lib/content-types";
import { renderMarkdown, formatDate } from "@/lib/markdown";
import TutorialCard from "@/components/TutorialCard";

type Props = { params: Promise<{ slug: string }> };

const LEVEL_COLORS: Record<string, string> = {
  beginner: "bg-green-100 text-green-800",
  intermediate: "bg-yellow-100 text-yellow-800",
  advanced: "bg-red-100 text-red-800",
};

export function generateStaticParams() {
  return getAllTutorials().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) return {};
  return {
    title: tutorial.title,
    description: tutorial.excerpt,
    openGraph: {
      title: tutorial.title,
      description: tutorial.excerpt,
      type: "article",
      publishedTime: tutorial.publishedAt,
      authors: [tutorial.author],
      tags: tutorial.tags,
      images: [{ url: tutorial.image, alt: tutorial.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: tutorial.title,
      description: tutorial.excerpt,
      images: [tutorial.image],
    },
  };
}

export default async function TutorialPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const cat = TUTORIAL_CATEGORIES.find((c) => c.slug === tutorial.category);
  const related = getTutorialsByCategory(tutorial.category)
    .filter((t) => t.slug !== tutorial.slug)
    .slice(0, 3);

  const toolsUsed = tutorial.toolsUsed
    .map((s) => getToolBySlug(s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: tutorial.title,
    description: tutorial.excerpt,
    image: [tutorial.image],
    datePublished: tutorial.publishedAt,
    totalTime: `PT${tutorial.readingTime}M`,
    author: { "@type": "Organization", name: tutorial.author },
  };

  const html = renderMarkdown(tutorial.body);

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="bg-gray-50 border-b border-gray-200">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <nav className="text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/tutorials/" className="hover:text-gray-700">Tutorials</Link>
            {cat && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/tutorials/category/${cat.slug}/`} className="hover:text-gray-700">
                  {cat.name}
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            {cat && (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                <span className="text-lg">{cat.icon}</span>
                <span>{cat.name}</span>
              </span>
            )}
            <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${LEVEL_COLORS[tutorial.level]}`}>
              {tutorial.level}
            </span>
          </div>

          <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight text-gray-900">
            {tutorial.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl">
            {tutorial.subtitle}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-700">{tutorial.author}</span>
            <span>&middot;</span>
            <time dateTime={tutorial.publishedAt}>{formatDate(tutorial.publishedAt)}</time>
            <span>&middot;</span>
            <span>{tutorial.readingTime} min read</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-[1fr_260px] gap-10">
        <div>
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={tutorial.image} alt={tutorial.imageAlt} className="w-full h-full object-cover" />
          </div>

          <div
            className="prose-magazine text-gray-800"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {tutorial.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {tutorial.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          {toolsUsed.length > 0 && (
            <div className="rounded-xl border border-gray-200 p-5 bg-white">
              <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Tools Used</h3>
              <div className="space-y-3">
                {toolsUsed.map((t) => (
                  <Link
                    key={t.slug}
                    href={`/tools/${t.slug}/`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-2xl">{t.icon}</span>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.company}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-serif-heading font-bold text-2xl text-gray-900 mb-6">
              More {cat?.name ?? "Tutorials"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10">
              {related.map((t) => (
                <TutorialCard key={t.slug} tutorial={t} />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
