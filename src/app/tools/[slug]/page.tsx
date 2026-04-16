import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTools, getToolBySlug, getRelatedTools, getCategoryInfo, formatPrice, getPricingLabel, getComparisons } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} — Review, Pricing (INR), Features & Alternatives`,
    description: `${tool.name} review: ${tool.tagline}. Pricing starts at ${formatPrice(tool.pricing.priceInrMonthly)}/month. ${tool.pricing.freeTier}. Compare with alternatives.`,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const related = getRelatedTools(slug);
  const categoryInfo = getCategoryInfo(tool.category);

  const comparisons = getComparisons().filter(
    (c) => c.slugA === tool.slug || c.slugB === tool.slug
  ).slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: tool.pricing.priceInrMonthly || 0, priceCurrency: "INR" },
    aggregateRating: { "@type": "AggregateRating", ratingValue: tool.rating, bestRating: 5, ratingCount: 100 },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: `Is ${tool.name} free or paid?`, acceptedAnswer: { "@type": "Answer", text: `${tool.name} is ${getPricingLabel(tool.pricing.model)}. ${tool.pricing.freeTier}. Monthly price: ${formatPrice(tool.pricing.priceInrMonthly)}.` } },
      { "@type": "Question", name: `What are the best alternatives to ${tool.name}?`, acceptedAnswer: { "@type": "Answer", text: `Top alternatives to ${tool.name}: ${related.map((r) => r.name).join(", ")}.` } },
      { "@type": "Question", name: `What can ${tool.name} do?`, acceptedAnswer: { "@type": "Answer", text: `${tool.name}'s main features: ${tool.features.join(", ")}.` } },
    ],
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/tools/" className="hover:text-gray-700">Tools</Link>
        <span className="mx-2">/</span>
        {categoryInfo && (
          <><Link href={`/category/${categoryInfo.slug}/`} className="hover:text-gray-700">{categoryInfo.name}</Link><span className="mx-2">/</span></>
        )}
        <span className="text-gray-900">{tool.name}</span>
      </nav>

      <div className="flex items-start gap-4 mb-8">
        <span className="text-5xl">{tool.icon}</span>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
          <p className="text-lg text-gray-600 mt-1">{tool.tagline}</p>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className="text-yellow-500">{"★".repeat(Math.round(tool.rating))}</span>
            <span className="text-sm text-gray-500">{tool.rating}/5</span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">{tool.company}</span>
            <span className="text-sm text-gray-400">|</span>
            <span className="text-sm text-gray-500">Since {tool.founded}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">What is {tool.name}?</h2>
            <p className="text-gray-700 mb-3">{tool.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Key Features</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {tool.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-green-500 mt-0.5 shrink-0">✓</span> {f}
                </li>
              ))}
            </ul>
          </section>

          <section className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-green-700 mb-2">Pros</h3>
              <ul className="space-y-1">
                {tool.pros.map((p) => <li key={p} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500">+</span> {p}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-700 mb-2">Cons</h3>
              <ul className="space-y-1">
                {tool.cons.map((c) => <li key={c} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-red-500">-</span> {c}</li>)}
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Who is {tool.name} best for?</h2>
            <div className="flex flex-wrap gap-2">
              {tool.useCases.map((uc) => <span key={uc} className="text-sm px-3 py-1.5 rounded-full bg-blue-50 text-blue-700">{uc}</span>)}
            </div>
          </section>

          {comparisons.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">{tool.name} vs Other Tools</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {comparisons.map((c) => {
                  const otherSlug = c.slugA === tool.slug ? c.slugB : c.slugA;
                  const otherTool = getToolBySlug(otherSlug);
                  if (!otherTool) return null;
                  return (
                    <Link key={`${c.slugA}-${c.slugB}`} href={`/compare/${c.slugA}-vs-${c.slugB}/`}
                      className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-sm">
                      <span>{tool.name} vs {otherTool.name}</span>
                      <span className="text-gray-400">&rarr;</span>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">FAQs</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900">Is {tool.name} free or paid?</h3>
                <p className="text-sm text-gray-600 mt-1">{tool.name} is {getPricingLabel(tool.pricing.model)}. {tool.pricing.freeTier}. Monthly price: {formatPrice(tool.pricing.priceInrMonthly)}.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">What are the best alternatives to {tool.name}?</h3>
                <p className="text-sm text-gray-600 mt-1">Top alternatives to {tool.name}: {related.map((r) => r.name).join(", ")}.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">What can {tool.name} do?</h3>
                <p className="text-sm text-gray-600 mt-1">{tool.name}&rsquo;s main features: {tool.features.join(", ")}.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Pricing</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Model</span><span className="text-sm font-medium">{getPricingLabel(tool.pricing.model)}</span></div>
              <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Free Tier</span><span className="text-sm font-medium text-green-700">{tool.pricing.freeTier.length > 30 ? "Yes" : tool.pricing.freeTier}</span></div>
              {tool.pricing.priceInrMonthly && <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Monthly</span><span className="text-sm font-bold text-gray-900">{formatPrice(tool.pricing.priceInrMonthly)}/mo</span></div>}
              {tool.pricing.priceInrAnnualMonthly && <div className="flex justify-between items-center"><span className="text-sm text-gray-600">Annual (per mo)</span><span className="text-sm font-bold text-green-700">{formatPrice(tool.pricing.priceInrAnnualMonthly)}/mo</span></div>}
            </div>
            <a href={tool.website} target="_blank" rel="noopener noreferrer"
              className="mt-4 block text-center w-full px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Visit {tool.name}
            </a>
          </div>

          {related.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Alternatives</h3>
              <div className="space-y-3">
                {related.map((r) => <ToolCard key={r.slug} tool={r} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
