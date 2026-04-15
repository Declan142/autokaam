import Link from "next/link";
import { getAllTools, getCategoriesWithTools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function HomePage() {
  const allTools = getAllTools();
  const categories = getCategoriesWithTools();
  const featured = allTools.filter((t) =>
    ["chatgpt", "claude", "midjourney", "cursor", "perplexity", "elevenlabs", "runway-ml", "krutrim"].includes(t.slug)
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            India ka <span className="text-blue-600">#1 AI Tool</span> Comparison Platform
          </h1>
          <p className="text-lg text-gray-600 mb-2">
            50+ AI tools compared with <strong>Indian pricing (INR)</strong>, Hindi guides, and honest reviews.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Sahi AI tool dhundho, Hindi mein samjho, INR mein compare karo — sab ek jagah.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/tools/"
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
            >
              Browse All Tools
            </Link>
            <Link
              href="/compare/chatgpt-vs-claude/"
              className="inline-flex items-center px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              ChatGPT vs Claude
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}/`}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                  <p className="text-xs text-gray-500">{cat.count} tools</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Featured AI Tools</h2>
            <Link href="/tools/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all &rarr;
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Comparisons */}
      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Comparisons</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { a: "chatgpt", b: "claude", title: "ChatGPT vs Claude" },
              { a: "midjourney", b: "dall-e-3", title: "Midjourney vs DALL-E 3" },
              { a: "cursor", b: "github-copilot", title: "Cursor vs GitHub Copilot" },
              { a: "runway-ml", b: "pika", title: "Runway ML vs Pika" },
              { a: "suno-ai", b: "udio", title: "Suno AI vs Udio" },
              { a: "chatgpt", b: "gemini", title: "ChatGPT vs Gemini" },
            ].map((comp) => (
              <Link
                key={`${comp.a}-${comp.b}`}
                href={`/compare/${comp.a}-vs-${comp.b}/`}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="font-medium text-gray-900">{comp.title}</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">AutoKaam — AI Tools Compare Karo, Hindi Mein Samjho</h2>
          <div className="prose prose-gray max-w-none text-sm">
            <p>
              AutoKaam India ka pehla AI tool comparison platform hai jahan aap 50+ AI tools ko Indian pricing (INR) mein compare kar sakte hain.
              Chahe aap content writer ho, developer ho, student ho ya business owner — yahan har kisi ke liye sahi AI tool mil jayega.
            </p>
            <p>
              Har tool ki detailed review hai — features, pricing, pros &amp; cons, aur alternatives sab ek jagah.
              ChatGPT vs Claude, Midjourney vs DALL-E, Cursor vs GitHub Copilot — popular comparisons bhi available hain.
            </p>
            <h3>Kiske Liye Hai AutoKaam?</h3>
            <ul>
              <li><strong>Students</strong> — Free AI tools dhundho assignments aur projects ke liye</li>
              <li><strong>Freelancers</strong> — Sahi tool choose karo jo tumhare budget mein aaye</li>
              <li><strong>Small Business Owners</strong> — AI se apna kaam automate karo bina zyada kharche ke</li>
              <li><strong>Developers</strong> — Best coding AI tools compare karo — Copilot, Cursor, Claude Code</li>
              <li><strong>Content Creators</strong> — Image, video, audio AI tools explore karo</li>
            </ul>
            <h3>Made in India AI Tools</h3>
            <p>
              Hum Indian AI tools ko bhi highlight karte hain — Krutrim, Sarvam AI, Bhashini aur more.
              Agar aap Hindi ya regional languages mein AI use karna chahte ho, yahan sab milega.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
