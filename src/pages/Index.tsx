import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCard } from "@/components/ToolCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Clock, FileText, CalendarDays, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { articles } from "@/data/articles";

const tools = [
  {
    title: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks.",
    icon: Clock,
    slug: "pomodoro-timer",
  },
  {
    title: "Study Plan Generator",
    description: "Create a personalized study schedule for your exams.",
    icon: CalendarDays,
    slug: "study-plan-generator",
  },
  {
    title: "GPA Calculator",
    description: "Calculate your grade point average quickly and accurately.",
    icon: Calculator,
    slug: "gpa-calculator",
  },
  {
    title: "Flashcard Maker",
    description: "Create digital flashcards for effective memorization.",
    icon: FileText,
    slug: "flashcard-maker",
  },
];

// Get featured and latest from real articles
const featuredArticles = articles.slice(0, 3);
const latestArticles = articles.slice(3, 6);

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-surface border-b border-divider">
        <div className="container py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 text-caption font-medium text-primary bg-accent px-3 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Study smarter, not harder
            </div>
            <h1 className="text-title md:text-display font-bold text-heading mb-4">
              Your guide to better studying and exam success
            </h1>
            <p className="text-body-lg text-body mb-8">
              Practical tips, proven techniques, and free tools to help you study effectively 
              and achieve your academic goals.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/category/articles">
                  Explore Articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/category/tools">Browse Tools</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="container py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <h2 className="text-lg md:text-subtitle font-bold text-heading">Featured Articles</h2>
          <Link 
            to="/category/articles" 
            className="text-caption font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 stagger-children">
          {featuredArticles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              readTime={article.readTime}
              slug={article.slug}
              featured
            />
          ))}
        </div>
      </section>

      {/* Mobile Ad After Featured */}
      <div className="container md:hidden pb-4">
        <AdPlaceholder variant="inline" />
      </div>

      {/* Ad Banner - Desktop */}
      <div className="container hidden md:block">
        <AdPlaceholder variant="banner" />
      </div>

      {/* Tools Section */}
      <section className="container py-8 md:py-16">
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <div>
            <h2 className="text-lg md:text-subtitle font-bold text-heading mb-1">Free Study Tools</h2>
            <p className="text-xs md:text-caption text-body">Boost your productivity with our collection of tools</p>
          </div>
          <Link 
            to="/category/tools" 
            className="text-caption font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-3 md:gap-4 stagger-children">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      </section>

      {/* Mobile Ad After Tools */}
      <div className="container md:hidden pb-4">
        <AdPlaceholder variant="inline" />
      </div>

      {/* Latest Articles with Sidebar */}
      <section className="bg-surface border-y border-divider">
        <div className="container py-8 md:py-16">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-lg md:text-subtitle font-bold text-heading mb-6 md:mb-8">Latest Articles</h2>
              <div className="space-y-4 md:space-y-5 stagger-children">
                {latestArticles.map((article, index) => (
                  <div key={article.slug}>
                    <ArticleCard
                      title={article.title}
                      excerpt={article.excerpt}
                      category={article.category}
                      readTime={article.readTime}
                      slug={article.slug}
                    />
                    {/* Mobile inline ad after first article */}
                    {index === 0 && (
                      <div className="mt-4 lg:hidden">
                        <AdPlaceholder variant="inline" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-8">
                <Button variant="outline" asChild>
                  <Link to="/category/articles">
                    Load More Articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <aside className="hidden lg:block space-y-6">
              <AdPlaceholder variant="sidebar" />
              
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-heading mb-4">Categories</h3>
                <ul className="space-y-2">
                  {["Study Tips", "Exam Prep", "Learning Science", "Productivity", "Resources"].map(
                    (category) => (
                      <li key={category}>
                        <Link
                          to={`/category/${category.toLowerCase().replace(" ", "-")}`}
                          className="text-caption text-body hover:text-primary transition-colors"
                        >
                          {category}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">Try Our Free Tools</h3>
                <p className="text-caption text-body mb-4">
                  Boost your study sessions with our Pomodoro Timer.
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/tool/pomodoro-timer">Start Timer</Link>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom Mobile Ad */}
      <div className="container py-6 lg:hidden">
        <AdPlaceholder variant="banner" />
      </div>
    </Layout>
  );
}
