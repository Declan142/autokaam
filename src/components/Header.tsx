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
            <Link href="/tools/" className="hover:text-gray-900 transition-colors">All Tools</Link>
            <Link href="/category/chat/" className="hover:text-gray-900 transition-colors">Chat</Link>
            <Link href="/category/image/" className="hover:text-gray-900 transition-colors">Image</Link>
            <Link href="/category/code/" className="hover:text-gray-900 transition-colors">Code</Link>
            <Link href="/category/video/" className="hover:text-gray-900 transition-colors">Video</Link>
            <Link href="/category/indian-ai/" className="hover:text-gray-900 transition-colors">Indian AI</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
