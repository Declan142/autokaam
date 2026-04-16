import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getComparisons, formatPrice } from "@/lib/tools";
import ComparisonTable from "@/components/ComparisonTable";
import { Tool } from "@/lib/types";

type Props = { params: Promise<{ slugs: string }> };

export function generateStaticParams() {
  return getComparisons().map((c) => ({ slugs: `${c.slugA}-vs-${c.slugB}` }));
}

function parseSlug(slugs: string): { toolA: Tool; toolB: Tool } | null {
  const allTools = getAllTools();
  for (const tool of allTools) {
    if (slugs.startsWith(tool.slug + "-vs-")) {
      const rest = slugs.slice(tool.slug.length + 4);
      const toolB = allTools.find((t) => t.slug === rest);
      if (toolB) return { toolA: tool, toolB };
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slugs } = await params;
  const parsed = parseSlug(slugs);
  if (!parsed) return {};
  const { toolA, toolB } = parsed;
  return {
    title: `${toolA.name} vs ${toolB.name} — Comparison, Pricing, Features (2026)`,
    description: `${toolA.name} vs ${toolB.name} detailed comparison. ${toolA.name}: ${formatPrice(toolA.pricing.priceInrMonthly)}/mo, ${toolB.name}: ${formatPrice(toolB.pricing.priceInrMonthly)}/mo. Which one is better for you?`,
  };
}

export default async function ComparePage({ params }: Props) {
  const { slugs } = await params;
  const parsed = parseSlug(slugs);
  if (!parsed) notFound();
  const { toolA, toolB } = parsed;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Which is better, ${toolA.name} or ${toolB.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Both ${toolA.name} (rating: ${toolA.rating}/5) and ${toolB.name} (rating: ${toolB.rating}/5) are best at different things. ${toolA.name} strengths: ${toolA.pros.join(", ")}. ${toolB.name} strengths: ${toolB.pros.join(", ")}.` },
      },
      {
        "@type": "Question",
        name: `What is the pricing for ${toolA.name} and ${toolB.name} in India?`,
        acceptedAnswer: { "@type": "Answer", text: `${toolA.name}: ${formatPrice(toolA.pricing.priceInrMonthly)}/month (${toolA.pricing.freeTier}). ${toolB.name}: ${formatPrice(toolB.pricing.priceInrMonthly)}/month (${toolB.pricing.freeTier}).` },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools/" className="hover:text-gray-700">Tools</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{toolA.name} vs {toolB.name}</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {toolA.name} vs {toolB.name} — Detailed Comparison (2026)
      </h1>
      <p className="text-gray-600 mb-8">
        Which is better between {toolA.name} and {toolB.name}? Pricing, features, pros and cons — compared side-by-side in Indian rupees (INR).
      </p>

      <div className="rounded-xl border border-gray-200 p-6 bg-white">
        <ComparisonTable toolA={toolA} toolB={toolB} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">{toolA.name} Best For</h2>
          <div className="flex flex-wrap gap-2">
            {toolA.useCases.map((uc) => <span key={uc} className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700">{uc}</span>)}
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">{toolB.name} Best For</h2>
          <div className="flex flex-wrap gap-2">
            {toolB.useCases.map((uc) => <span key={uc} className="text-sm px-3 py-1 rounded-full bg-blue-50 text-blue-700">{uc}</span>)}
          </div>
        </div>
      </div>

      <section className="mt-8 rounded-xl bg-gray-50 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Verdict: {toolA.name} or {toolB.name}?</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <p><strong>{toolA.name}</strong> — pick this if you need {toolA.pros[0].toLowerCase()}. Rating: {toolA.rating}/5. Price: {formatPrice(toolA.pricing.priceInrMonthly)}/mo.</p>
          <p><strong>{toolB.name}</strong> — pick this if you need {toolB.pros[0].toLowerCase()}. Rating: {toolB.rating}/5. Price: {formatPrice(toolB.pricing.priceInrMonthly)}/mo.</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">FAQs</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900">Which is better, {toolA.name} or {toolB.name}?</h3>
            <p className="text-sm text-gray-600 mt-1">Both tools lead in different use cases. {toolA.name} ({toolA.rating}/5) is better for {toolA.pros[0].toLowerCase()}. {toolB.name} ({toolB.rating}/5) is better for {toolB.pros[0].toLowerCase()}.</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">What is the pricing for {toolA.name} and {toolB.name} in India?</h3>
            <p className="text-sm text-gray-600 mt-1">{toolA.name}: {formatPrice(toolA.pricing.priceInrMonthly)}/month ({toolA.pricing.freeTier}). {toolB.name}: {formatPrice(toolB.pricing.priceInrMonthly)}/month ({toolB.pricing.freeTier}).</p>
          </div>
        </div>
      </section>

      <div className="flex gap-4 mt-8">
        <Link href={`/tools/${toolA.slug}/`} className="flex-1 text-center px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium hover:border-blue-300 transition-colors">{toolA.icon} {toolA.name} Full Review</Link>
        <Link href={`/tools/${toolB.slug}/`} className="flex-1 text-center px-4 py-3 rounded-lg border border-gray-200 text-sm font-medium hover:border-blue-300 transition-colors">{toolB.icon} {toolB.name} Full Review</Link>
      </div>
    </div>
  );
}
