import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCategories, getCategoryInfo, getToolsByCategory } from "@/lib/tools";
import { Category } from "@/lib/types";
import ToolCard from "@/components/ToolCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoryInfo(slug as Category);
  if (!cat) return {};
  return {
    title: `Best ${cat.name} Tools (2026) — Reviews & Pricing India`,
    description: `Compare the best ${cat.name.toLowerCase()} tools in 2026. ${cat.description}. Indian pricing (INR), features, and honest reviews.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const cat = getCategoryInfo(slug as Category);
  if (!cat) notFound();

  const tools = getToolsByCategory(slug as Category);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools/" className="hover:text-gray-700">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{cat.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <span className="text-4xl">{cat.icon}</span>
          Best {cat.name} Tools (2026)
        </h1>
        <p className="text-gray-600 mt-2">{cat.description}</p>
        <p className="text-gray-500 text-sm mt-1">{cat.nameHi} — {tools.length} tools available</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />)}
      </div>

      {tools.length >= 2 && (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Compare {cat.name} Tools</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.slice(0, 6).flatMap((t, i) =>
              tools.slice(i + 1, Math.min(i + 3, 6)).map((t2) => (
                <Link key={`${t.slug}-${t2.slug}`} href={`/compare/${t.slug}-vs-${t2.slug}/`}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-sm">
                  <span>{t.name} vs {t2.name}</span>
                  <span className="text-gray-400">&rarr;</span>
                </Link>
              ))
            )}
          </div>
        </section>
      )}

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{cat.name} AI Tools — Complete Guide</h2>
        <div className="prose prose-sm prose-gray">
          <p>
            AutoKaam lists {tools.length} AI tools in the {cat.name} ({cat.nameHi}) category — each one tested, reviewed, and priced in Indian rupees.
          </p>
          <p>
            Each tool has a detailed review covering INR pricing, features, pros and cons, and the best alternatives. Pick the tool that fits your budget and requirements.
          </p>
        </div>
      </section>
    </div>
  );
}
