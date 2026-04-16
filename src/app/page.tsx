import Link from "next/link";
import { getAllNews, getFeaturedNews, getNewsByCategory } from "@/data/news";
import { getAllTutorials, getFeaturedTutorials } from "@/data/tutorials";
import { getAllTools, getCategoriesWithTools } from "@/lib/tools";
import NewsHero from "@/components/NewsHero";
import NewsCard from "@/components/NewsCard";
import TutorialCard from "@/components/TutorialCard";
import ToolCard from "@/components/ToolCard";

export default function HomePage() {
  const allNews = getAllNews();
  const heroArticle = getFeaturedNews()[0] ?? allNews[0];
  const topStories = allNews.filter((n) => n.slug !== heroArticle.slug).slice(0, 4);
  const indiaStories = getNewsByCategory("india").filter((n) => n.slug !== heroArticle.slug).slice(0, 4);
  const launchesStories = getNewsByCategory("launches").slice(0, 3);

  const featuredTutorials = getFeaturedTutorials().slice(0, 3);
  const allTutorials = getAllTutorials();
  const extraTutorials = allTutorials.filter((t) => !featuredTutorials.some((ft) => ft.slug === t.slug)).slice(0, 3);

  const allTools = getAllTools();
  const categories = getCategoriesWithTools();
  const featuredTools = allTools.filter((t) =>
    ["claude", "chatgpt", "sarvam-ai", "cursor", "midjourney", "runway-ml"].includes(t.slug)
  );

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <span className="kicker">AutoKaam</span>
            <h1 className="font-serif-heading font-bold text-3xl sm:text-4xl text-gray-900 mt-1">
              India ka AI Magazine
            </h1>
          </div>
          <Link
            href="/news/"
            className="text-sm font-medium text-gray-700 hover:text-gray-900 underline decoration-orange-500 decoration-2 underline-offset-4"
          >
            All News &rarr;
          </Link>
        </div>
        <NewsHero article={heroArticle} />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-10">
          {topStories.map((article, idx) => (
            <NewsCard key={article.slug} article={article} size={idx === 0 ? "medium" : "small"} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
            <div>
              <span className="kicker">Hands-on</span>
              <h2 className="font-serif-heading font-bold text-3xl text-gray-900 mt-1">Tutorials &amp; Playbooks</h2>
            </div>
            <Link href="/tutorials/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              All Tutorials &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {featuredTutorials.map((t) => (
              <TutorialCard key={t.slug} tutorial={t} size="large" />
            ))}
          </div>
          {extraTutorials.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-10 mt-12 pt-12 border-t border-gray-200">
              {extraTutorials.map((t) => (
                <TutorialCard key={t.slug} tutorial={t} size="small" />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
          <div>
            <span className="kicker" style={{ color: "#f97316" }}>India AI</span>
            <h2 className="font-serif-heading font-bold text-3xl text-gray-900 mt-1">Made in India</h2>
          </div>
          <Link href="/news/category/india/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            More India stories &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {indiaStories.map((a) => (
            <NewsCard key={a.slug} article={a} />
          ))}
        </div>
      </section>

      <section className="bg-gray-900 text-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
            <div>
              <span className="kicker" style={{ color: "#ef4444" }}>Launches</span>
              <h2 className="font-serif-heading font-bold text-3xl mt-1">New This Week</h2>
            </div>
            <Link href="/news/category/launches/" className="text-sm font-medium text-gray-300 hover:text-white">
              All launches &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {launchesStories.map((a) => (
              <Link key={a.slug} href={`/news/${a.slug}/`} className="group block card-image-zoom overflow-hidden rounded-xl relative aspect-[4/5]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.imageAlt} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="image-overlay absolute inset-0" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500 text-white rounded mb-3">
                    Launch
                  </span>
                  <h3 className="font-serif-heading font-bold text-xl leading-tight">
                    {a.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex items-baseline justify-between mb-8 flex-wrap gap-2">
          <div>
            <span className="kicker">Directory</span>
            <h2 className="font-serif-heading font-bold text-3xl text-gray-900 mt-1">AI Tools Compared</h2>
          </div>
          <Link href="/tools/" className="text-sm font-medium text-gray-700 hover:text-gray-900">
            Browse all {allTools.length} tools &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-10">
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}/`}
              className="group p-4 rounded-lg border border-gray-200 hover:border-gray-400 bg-white text-center transition-colors"
            >
              <div className="text-2xl mb-1">{cat.icon}</div>
              <div className="text-sm font-medium text-gray-900">{cat.name}</div>
              <div className="text-xs text-gray-500">{cat.count} tools</div>
            </Link>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="kicker">Head-to-head</span>
            <h2 className="font-serif-heading font-bold text-3xl text-gray-900 mt-1">Popular Comparisons</h2>
          </div>
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
                className="flex items-center justify-between p-5 rounded-lg border border-gray-200 bg-white hover:border-gray-400 hover:shadow-sm transition-all"
              >
                <span className="font-medium text-gray-900">{comp.title}</span>
                <span className="text-gray-400">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <span className="kicker">About</span>
          <h2 className="font-serif-heading font-bold text-3xl text-gray-900 mt-1 mb-4">
            AutoKaam — India&rsquo;s AI Magazine &amp; Tool Guide
          </h2>
          <div className="prose-magazine text-gray-700">
            <p>
              AutoKaam ek editorial desk aur tool directory dono hai — ChatGPT, Claude, Sarvam, Gemini, aur open-source models pe daily coverage, plus 50+ tools ka comparison with Indian pricing (INR), Hindi-English guides, aur honest reviews.
            </p>
            <p>
              Kya tum <Link href="/tutorials/ai-se-resume-kaise-banaye-chatgpt/">AI se resume banana</Link> seekhna chahte ho, <Link href="/tutorials/whatsapp-ai-chatbot-business-15-minutes/">WhatsApp chatbot banana</Link> chahte ho business ke liye, ya <Link href="/news/category/india/">India ke AI ecosystem</Link> ki latest samajhna chahte ho — sab yahan milega, bilingual format mein.
            </p>
            <p>
              Hamari coverage foundational AI (Sarvam, Krutrim, Bhashini), frontier labs (Anthropic, OpenAI, Google DeepMind), developer tools (Cursor, Claude Code, Copilot), aur applied AI (creative, voice, automation) spans karti hai.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
