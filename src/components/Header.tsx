import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              Auto<span className="text-blue-600">Kaam</span>
            </span>
            <span className="hidden sm:inline text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
              AI Tools India
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/news/" className="hover:text-gray-900 transition-colors">News</Link>
            <Link href="/tutorials/" className="hover:text-gray-900 transition-colors">Tutorials</Link>
            <Link href="/tools/" className="hover:text-gray-900 transition-colors">Tools</Link>
            <Link href="/news/category/india/" className="hover:text-gray-900 transition-colors">India AI</Link>
            <Link href="/compare/chatgpt-vs-claude/" className="hover:text-gray-900 transition-colors">Compare</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
