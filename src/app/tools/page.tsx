import { Metadata } from "next";
import { getAllTools, getCategoriesWithTools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "All AI Tools — 50+ Tools Compared with Indian Pricing",
  description: "Browse and compare 50+ AI tools with Indian pricing (INR). Filter by category — writing, image, video, code, chat, audio, and more.",
};

export default function ToolsPage() {
  const tools = getAllTools();
  const categories = getCategoriesWithTools();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All AI Tools</h1>
      <p className="text-gray-600 mb-8">50+ AI tools compared with Indian pricing, features, and reviews.</p>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/category/${cat.slug}/`}
            className="text-sm px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
          >
            {cat.icon} {cat.name} ({cat.count})
          </Link>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
