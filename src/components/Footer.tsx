import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">AutoKaam</h3>
            <p className="text-sm text-gray-600">
              India ka #1 AI tool comparison platform. Sahi AI tool dhundho, Hindi mein samjho, Indian pricing mein compare karo.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}/`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">More Categories</h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/category/${c.slug}/`} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                    {c.icon} {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Popular Comparisons</h3>
            <ul className="space-y-2">
              <li><Link href="/compare/chatgpt-vs-claude/" className="text-sm text-gray-600 hover:text-gray-900">ChatGPT vs Claude</Link></li>
              <li><Link href="/compare/midjourney-vs-dall-e-3/" className="text-sm text-gray-600 hover:text-gray-900">Midjourney vs DALL-E 3</Link></li>
              <li><Link href="/compare/cursor-vs-github-copilot/" className="text-sm text-gray-600 hover:text-gray-900">Cursor vs Copilot</Link></li>
              <li><Link href="/compare/runway-ml-vs-pika/" className="text-sm text-gray-600 hover:text-gray-900">Runway vs Pika</Link></li>
              <li><Link href="/compare/suno-ai-vs-udio/" className="text-sm text-gray-600 hover:text-gray-900">Suno vs Udio</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AutoKaam.com — India ka AI Tool Guide</p>
        </div>
      </div>
    </footer>
  );
}
