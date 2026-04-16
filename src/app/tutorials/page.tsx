import { Metadata } from "next";
import Link from "next/link";
import { getAllTutorials, getFeaturedTutorials } from "@/data/tutorials";
import { TUTORIAL_CATEGORIES } from "@/lib/content-types";
import TutorialCard from "@/components/TutorialCard";

export const metadata: Metadata = {
  title: "AI Tutorials India — Hindi + English Guides on ChatGPT, Claude, Sarvam",
  description:
    "Practical AI tutorials for Indian users. ChatGPT, Claude, Sarvam, Midjourney — bilingual Hindi/English walkthroughs with real-world workflows.",
};

export default function TutorialsIndexPage() {
  const all = getAllTutorials();
  const featured = getFeaturedTutorials();
  const featuredSlugs = new Set(featured.map((t) => t.slug));
  const rest = all.filter((t) => !featuredSlugs.has(t.slug));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="mb-8 sm:mb-10">
        <span className="kicker">Learn</span>
        <h1 className="font-serif-heading font-bold text-4xl sm:text-5xl text-gray-900 mt-1">
          AI Tutorials
        </h1>
        <p className="text-gray-600 mt-2 max-w-2xl">
          Hands-on guides for Indian users — setup steps, code snippets, cost analysis, and workflows that actually work in production.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {TUTORIAL_CATEGORIES.map((cat) => (
          <Link
            key={cat.slug}
            href={`/tutorials/category/${cat.slug}/`}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            <span>{cat.icon}</span>
            <span>{cat.name}</span>
          </Link>
        ))}
      </div>

      {featured.length > 0 && (
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-serif-heading font-bold text-2xl text-gray-900">Editor&rsquo;s Picks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {featured.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} size="large" />
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif-heading font-bold text-2xl text-gray-900">All Tutorials</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {rest.map((t) => (
            <TutorialCard key={t.slug} tutorial={t} />
          ))}
        </div>
      </section>
    </div>
  );
}
