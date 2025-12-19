import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCard } from "@/components/ToolCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calculator, Clock, FileText, Brain } from "lucide-react";

const categoryData: Record<string, { title: string; description: string }> = {
  articles: {
    title: "All Articles",
    description: "Study tips, exam strategies, and productivity advice for students.",
  },
  tools: {
    title: "Study Tools",
    description: "Free productivity tools to help you study smarter.",
  },
  "study-tips": {
    title: "Study Tips",
    description: "Proven techniques to improve your learning and retention.",
  },
  resources: {
    title: "Resources",
    description: "Curated apps, books, and materials for students.",
  },
  "exam-prep": {
    title: "Exam Preparation",
    description: "Strategies and guides for acing your exams.",
  },
};

const articles = [
  {
    title: "The Pomodoro Technique: A Complete Guide",
    excerpt: "Learn how to use timed study sessions to maximize your productivity.",
    category: "Study Tips",
    readTime: "8 min",
    slug: "pomodoro-technique-guide",
  },
  {
    title: "How to Create Effective Study Notes",
    excerpt: "Discover proven note-taking methods that help you understand and remember.",
    category: "Study Tips",
    readTime: "6 min",
    slug: "effective-study-notes",
  },
  {
    title: "Preparing for Finals: Your 4-Week Study Plan",
    excerpt: "A structured approach to exam preparation that reduces stress.",
    category: "Exam Prep",
    readTime: "10 min",
    slug: "finals-study-plan",
  },
  {
    title: "Understanding Active Recall and Spaced Repetition",
    excerpt: "The science-backed learning techniques that top students use.",
    category: "Learning Science",
    readTime: "7 min",
    slug: "active-recall-spaced-repetition",
  },
  {
    title: "Best Apps for Student Productivity",
    excerpt: "A curated list of tools to help you stay organized and focused.",
    category: "Resources",
    readTime: "5 min",
    slug: "student-productivity-apps",
  },
  {
    title: "Managing Test Anxiety: Practical Strategies",
    excerpt: "Learn how to stay calm and perform your best under pressure.",
    category: "Wellness",
    readTime: "6 min",
    slug: "managing-test-anxiety",
  },
];

const tools = [
  {
    title: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks.",
    icon: Clock,
    slug: "pomodoro-timer",
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
  {
    title: "Study Planner",
    description: "Plan your study schedule and track your progress.",
    icon: Brain,
    slug: "study-planner",
  },
];

const categories = [
  { name: "All Articles", slug: "articles" },
  { name: "Study Tips", slug: "study-tips" },
  { name: "Exam Prep", slug: "exam-prep" },
  { name: "Productivity", slug: "productivity" },
  { name: "Resources", slug: "resources" },
];

export default function Category() {
  const { slug } = useParams();
  const isToolsPage = slug === "tools";
  const category = categoryData[slug || "articles"] || categoryData.articles;

  return (
    <Layout>
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
                <div className="grid sm:grid-cols-2 gap-4 stagger-children">
                  {tools.map((tool) => (
                    <ToolCard key={tool.slug} {...tool} />
                  ))}
                </div>
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
                    {articles.map((article) => (
                      <ArticleCard key={article.slug} {...article} />
                    ))}
                  </div>

                  <div className="mt-10 flex justify-center">
                    <Button variant="outline" size="lg">
                      Load More Articles
                    </Button>
                  </div>
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
                    {tools.slice(0, 3).map((tool) => (
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

              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">Stay Updated</h3>
                <p className="text-caption text-body mb-4">
                  Get weekly study tips and new tool announcements.
                </p>
                <Button size="sm" className="w-full">Subscribe</Button>
              </div>

              <AdPlaceholder variant="sidebar" />
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
