import { Tool } from "@/lib/types";
import { formatPrice, getPricingLabel } from "@/lib/tools";
import Link from "next/link";

export default function ComparisonTable({ toolA, toolB }: { toolA: Tool; toolB: Tool }) {
  const rows: { label: string; a: string; b: string }[] = [
    { label: "Company", a: toolA.company, b: toolB.company },
    { label: "Category", a: toolA.category, b: toolB.category },
    { label: "Pricing Model", a: getPricingLabel(toolA.pricing.model), b: getPricingLabel(toolB.pricing.model) },
    { label: "Free Tier", a: toolA.pricing.freeTier, b: toolB.pricing.freeTier },
    { label: "Monthly Price (INR)", a: formatPrice(toolA.pricing.priceInrMonthly), b: formatPrice(toolB.pricing.priceInrMonthly) },
    { label: "Annual Price/mo (INR)", a: formatPrice(toolA.pricing.priceInrAnnualMonthly), b: formatPrice(toolB.pricing.priceInrAnnualMonthly) },
    { label: "Rating", a: `${toolA.rating}/5`, b: `${toolB.rating}/5` },
    { label: "Founded", a: String(toolA.founded), b: String(toolB.founded) },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-200">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-500 w-1/3">Feature</th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-900 w-1/3">
              <Link href={`/tools/${toolA.slug}/`} className="hover:text-blue-600">{toolA.icon} {toolA.name}</Link>
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-900 w-1/3">
              <Link href={`/tools/${toolB.slug}/`} className="hover:text-blue-600">{toolB.icon} {toolB.name}</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}>
              <td className="py-3 px-4 text-sm font-medium text-gray-700">{row.label}</td>
              <td className="py-3 px-4 text-sm text-gray-600 text-center">{row.a}</td>
              <td className="py-3 px-4 text-sm text-gray-600 text-center">{row.b}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid grid-cols-2 gap-6 mt-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{toolA.name} — Key Features</h3>
          <ul className="space-y-1">
            {toolA.features.map((f) => (
              <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">{toolB.name} — Key Features</h3>
          <ul className="space-y-1">
            {toolB.features.map((f) => (
              <li key={f} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span> {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div>
          <h4 className="font-medium text-green-700 text-sm mb-1">Pros</h4>
          <ul className="space-y-1">
            {toolA.pros.map((p) => <li key={p} className="text-sm text-gray-600">+ {p}</li>)}
          </ul>
          <h4 className="font-medium text-red-700 text-sm mt-3 mb-1">Cons</h4>
          <ul className="space-y-1">
            {toolA.cons.map((c) => <li key={c} className="text-sm text-gray-600">- {c}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-green-700 text-sm mb-1">Pros</h4>
          <ul className="space-y-1">
            {toolB.pros.map((p) => <li key={p} className="text-sm text-gray-600">+ {p}</li>)}
          </ul>
          <h4 className="font-medium text-red-700 text-sm mt-3 mb-1">Cons</h4>
          <ul className="space-y-1">
            {toolB.cons.map((c) => <li key={c} className="text-sm text-gray-600">- {c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
