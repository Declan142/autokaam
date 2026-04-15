import Link from "next/link";
import { Tool } from "@/lib/types";
import { formatPrice, getPricingLabel } from "@/lib/tools";

export default function ToolCard({ tool }: { tool: Tool }) {
  const pricingColors: Record<string, string> = {
    free: "bg-green-100 text-green-700",
    freemium: "bg-blue-100 text-blue-700",
    paid: "bg-orange-100 text-orange-700",
  };

  return (
    <Link
      href={`/tools/${tool.slug}/`}
      className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{tool.icon}</span>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {tool.name}
            </h3>
            <p className="text-xs text-gray-500">{tool.company}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${pricingColors[tool.pricing.model]}`}>
          {getPricingLabel(tool.pricing.model)}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{tool.tagline}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <span className="text-yellow-500 text-sm">{"★".repeat(Math.round(tool.rating))}</span>
          <span className="text-xs text-gray-500">{tool.rating}</span>
        </div>
        <span className="text-sm font-medium text-gray-700">
          {tool.pricing.priceInrMonthly ? `${formatPrice(tool.pricing.priceInrMonthly)}/mo` : "Free"}
        </span>
      </div>
    </Link>
  );
}
