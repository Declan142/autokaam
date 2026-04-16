import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTutorialsByCategory } from "@/data/tutorials";
import { TUTORIAL_CATEGORIES } from "@/lib/content-types";
import TutorialCard from "@/components/TutorialCard";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return TUTORIAL_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = TUTORIAL_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: `${cat.name} Tutorials — Learn ${cat.name} AI`,
    description: `${cat.name} tutorials on AutoKaam. Hands-on guides for Indian users with bilingual Hindi + English walkthroughs.`,
  };
}

export default async function TutorialCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = TUTORIAL_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const tutorials = getTutorialsByCategory(category);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tutorials/" className="hover:text-gray-700">Tutorials</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{cat.name}</span>
      </nav>

      <div className="mb-10 flex items-center gap-4">
        <span className="text-5xl">{cat.icon}</span>
        <div>
          <span className="kicker">Category</span>
          <h1 className="font-serif-heading font-bold text-4xl sm:text-5xl text-gray-900 mt-1">
            {cat.name} Tutorials
          </h1>
        </div>
      </div>

      {tutorials.length === 0 ? (
        <p className="text-gray-500">No tutorials in this category yet. Check back soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
          {tutorials.map((t) => (
            <TutorialCard key={t.slug} tutorial={t} />
          ))}
        </div>
      )}
    </div>
  );
}
