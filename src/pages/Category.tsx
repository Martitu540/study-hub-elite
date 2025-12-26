import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCard } from "@/components/ToolCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Clock, FileText, Brain, BookOpen } from "lucide-react";
import { articles, getArticlesByCategory } from "@/data/articles";

const categoryData: Record<string, { title: string; description: string; seoContent?: string }> = {
  articles: {
    title: "All Articles",
    description: "Study tips, exam strategies, and productivity advice for students of all levels.",
    seoContent: "Browse our complete collection of evidence-based study guides and academic success strategies. From time management techniques like the Pomodoro method to advanced learning strategies like spaced repetition, our articles help you study smarter."
  },
  tools: {
    title: "Free Study Tools",
    description: "Boost your productivity with our collection of free, browser-based study tools.",
    seoContent: "Our free study tools are designed to help you learn more effectively. All tools work directly in your browser with no downloads or sign-ups required. Your data is saved locally for privacy."
  },
  "study-tips": {
    title: "Study Tips",
    description: "Proven techniques to improve your learning, focus, and retention.",
    seoContent: "Discover actionable study strategies that actually work. Our study tips are grounded in cognitive science research and tested by students worldwide."
  },
  resources: {
    title: "Student Resources",
    description: "Curated apps, books, and materials to support your academic journey.",
    seoContent: "Find the best tools and resources for student success. We review and recommend productivity apps, learning platforms, and study materials."
  },
  "exam-prep": {
    title: "Exam Preparation",
    description: "Strategies and guides for acing your midterms, finals, and standardized tests.",
    seoContent: "Prepare for exams with confidence using our comprehensive guides. Learn how to create study schedules, manage test anxiety, and perform your best on exam day."
  },
  "learning-science": {
    title: "Learning Science",
    description: "Understand how your brain learns and retains information.",
    seoContent: "Explore the cognitive science behind effective learning. Understand concepts like active recall, spaced repetition, and memory consolidation."
  },
  productivity: {
    title: "Productivity",
    description: "Master time management and build habits for academic success.",
    seoContent: "Learn to manage your time effectively and build productive study habits. From scheduling techniques to focus strategies, boost your academic output."
  },
  wellness: {
    title: "Student Wellness",
    description: "Balance academic success with mental and physical health.",
    seoContent: "Academic success requires a healthy mind and body. Learn strategies for managing stress, getting better sleep, and maintaining balance."
  }
};

const tools = [
  {
    title: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks. Customizable intervals, progress tracking, and productivity tips.",
    icon: Clock,
    slug: "pomodoro-timer",
  },
  {
    title: "Study Plan Generator",
    description: "Create a personalized study schedule for your exams. Phase-based learning with daily tasks and review reminders.",
    icon: Brain,
    slug: "study-plan-generator",
  },
  {
    title: "GPA Calculator",
    description: "Calculate your grade point average quickly and accurately. Supports the standard 4.0 scale with credit weighting.",
    icon: Calculator,
    slug: "gpa-calculator",
  },
  {
    title: "Flashcard Maker",
    description: "Create digital flashcards with built-in spaced repetition. Organize into decks and track your mastery progress.",
    icon: FileText,
    slug: "flashcard-maker",
  },
];

const categories = [
  { name: "All Articles", slug: "articles" },
  { name: "Study Tips", slug: "study-tips" },
  { name: "Exam Prep", slug: "exam-prep" },
  { name: "Learning Science", slug: "learning-science" },
  { name: "Productivity", slug: "productivity" },
  { name: "Resources", slug: "resources" },
  { name: "Wellness", slug: "wellness" },
];

export default function Category() {
  const { slug } = useParams();
  const isToolsPage = slug === "tools";
  const category = categoryData[slug || "articles"] || categoryData.articles;
  
  // Get articles for the category
  const categoryArticles = getArticlesByCategory(slug || "articles");

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": isToolsPage ? "CollectionPage" : "Blog",
    "name": category.title,
    "description": category.description,
    "url": `https://studyhub.app/category/${slug}`
  };

  return (
    <Layout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="animate-fade-in">
        {/* Category Header */}
        <header className="bg-surface border-b border-divider">
          <div className="container py-8 md:py-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-caption text-body hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <h1 className="text-title font-bold text-heading mb-3">{category.title}</h1>
            <p className="text-body-lg text-body max-w-2xl">{category.description}</p>
          </div>
        </header>

        {/* Content */}
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {isToolsPage ? (
                <>
                  <div className="grid sm:grid-cols-2 gap-4 stagger-children">
                    {tools.map((tool) => (
                      <ToolCard key={tool.slug} {...tool} />
                    ))}
                  </div>
                  
                  {/* SEO Content for Tools Page */}
                  <section className="mt-12 prose">
                    <h2>Free Online Study Tools</h2>
                    <p>
                      Our study tools are designed to help students learn more effectively using 
                      evidence-based techniques. All tools are completely free, work in your browser, 
                      and save your data locally for privacy.
                    </p>
                    
                    <h3>Pomodoro Timer for Focused Study</h3>
                    <p>
                      The <Link to="/tool/pomodoro-timer">Pomodoro Timer</Link> uses the popular 
                      time-boxing technique to help you maintain focus. Work in 25-minute intervals 
                      with short breaks to maximize productivity and reduce mental fatigue.
                    </p>
                    
                    <h3>Study Plan Generator for Exam Prep</h3>
                    <p>
                      Our <Link to="/tool/study-plan-generator">Study Plan Generator</Link> creates 
                      personalized study schedules based on your exam date and available study time. 
                      Get a week-by-week plan with daily tasks and built-in review sessions.
                    </p>
                    
                    <h3>GPA Calculator for Grade Tracking</h3>
                    <p>
                      Use the <Link to="/tool/gpa-calculator">GPA Calculator</Link> to calculate your 
                      grade point average on the standard 4.0 scale. Add your courses, credits, and 
                      grades to see your cumulative GPA instantly.
                    </p>
                    
                    <h3>Flashcard Maker with Spaced Repetition</h3>
                    <p>
                      The <Link to="/tool/flashcard-maker">Flashcard Maker</Link> combines traditional 
                      flashcards with the SM-2 spaced repetition algorithm. Create decks, study cards, 
                      and track your mastery progress over time.
                    </p>
                  </section>
                </>
              ) : (
                <>
                  {/* Category Filters */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        className={`px-4 py-2 text-caption font-medium rounded-lg transition-colors ${
                          slug === cat.slug
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>

                  <div className="space-y-5 stagger-children">
                    {categoryArticles.map((article) => (
                      <ArticleCard
                        key={article.slug}
                        title={article.title}
                        excerpt={article.excerpt}
                        category={article.category}
                        readTime={article.readTime}
                        slug={article.slug}
                      />
                    ))}
                  </div>

                  {categoryArticles.length === 0 && (
                    <div className="text-center py-12">
                      <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-semibold text-heading mb-2">No articles yet</h3>
                      <p className="text-caption text-muted-foreground mb-4">
                        Check back soon for new content in this category.
                      </p>
                      <Button variant="outline" asChild>
                        <Link to="/category/articles">Browse All Articles</Link>
                      </Button>
                    </div>
                  )}

                  {/* SEO Content for Article Categories */}
                  {category.seoContent && categoryArticles.length > 0 && (
                    <section className="mt-12 pt-8 border-t border-divider">
                      <p className="text-body text-muted-foreground">{category.seoContent}</p>
                    </section>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdPlaceholder variant="sidebar" />

              {!isToolsPage && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-heading mb-4">Popular Tools</h3>
                  <ul className="space-y-3">
                    {tools.map((tool) => (
                      <li key={tool.slug}>
                        <Link
                          to={`/tool/${tool.slug}`}
                          className="flex items-center gap-3 text-caption text-body hover:text-primary transition-colors"
                        >
                          <tool.icon className="w-4 h-4" />
                          {tool.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {isToolsPage && (
                <div className="bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-heading mb-4">Related Articles</h3>
                  <ul className="space-y-3">
                    {articles.slice(0, 4).map((article) => (
                      <li key={article.slug}>
                        <Link
                          to={`/article/${article.slug}`}
                          className="text-caption text-body hover:text-primary transition-colors line-clamp-2"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">
                  {isToolsPage ? "Learn Study Techniques" : "Try Our Free Tools"}
                </h3>
                <p className="text-caption text-body mb-4">
                  {isToolsPage 
                    ? "Read our guides on effective study methods and exam preparation."
                    : "Boost your productivity with our free online study tools."
                  }
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link to={isToolsPage ? "/category/articles" : "/category/tools"}>
                    {isToolsPage ? "Read Articles" : "Browse Tools"}
                  </Link>
                </Button>
              </div>

              <AdPlaceholder variant="sidebar" />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
