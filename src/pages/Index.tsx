import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { ToolCard } from "@/components/ToolCard";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calculator, Clock, FileText, Brain, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const featuredArticles = [
  {
    title: "The Pomodoro Technique: A Complete Guide to Focused Studying",
    excerpt: "Learn how to use timed study sessions to maximize your productivity and retain information better.",
    category: "Study Tips",
    readTime: "8 min",
    slug: "pomodoro-technique-guide",
  },
  {
    title: "How to Create Effective Study Notes That Actually Work",
    excerpt: "Discover proven note-taking methods that help you understand and remember complex topics.",
    category: "Study Tips",
    readTime: "6 min",
    slug: "effective-study-notes",
  },
  {
    title: "Preparing for Finals: Your 4-Week Study Plan",
    excerpt: "A structured approach to exam preparation that reduces stress and improves performance.",
    category: "Exam Prep",
    readTime: "10 min",
    slug: "finals-study-plan",
  },
];

const latestArticles = [
  {
    title: "Understanding Active Recall and Spaced Repetition",
    excerpt: "The science-backed learning techniques that top students use to ace their exams.",
    category: "Learning Science",
    readTime: "7 min",
    slug: "active-recall-spaced-repetition",
  },
  {
    title: "Best Apps for Student Productivity in 2024",
    excerpt: "A curated list of tools that will help you stay organized and focused.",
    category: "Resources",
    readTime: "5 min",
    slug: "student-productivity-apps",
  },
  {
    title: "Managing Test Anxiety: Practical Strategies",
    excerpt: "Learn how to stay calm and perform your best when exam pressure hits.",
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
      <section className="container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-subtitle font-bold text-heading">Featured Articles</h2>
          <Link 
            to="/category/articles" 
            className="text-caption font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger-children">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} featured />
          ))}
        </div>
      </section>

      {/* Ad Banner */}
      <div className="container">
        <AdPlaceholder variant="banner" />
      </div>

      {/* Tools Section */}
      <section className="container py-12 md:py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-subtitle font-bold text-heading mb-1">Free Study Tools</h2>
            <p className="text-caption text-body">Boost your productivity with our collection of tools</p>
          </div>
          <Link 
            to="/category/tools" 
            className="text-caption font-medium text-primary hover:underline flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4 stagger-children">
          {tools.map((tool) => (
            <ToolCard key={tool.slug} {...tool} />
          ))}
        </div>
      </section>

      {/* Latest Articles with Sidebar */}
      <section className="bg-surface border-y border-divider">
        <div className="container py-12 md:py-16">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-subtitle font-bold text-heading mb-8">Latest Articles</h2>
              <div className="space-y-5 stagger-children">
                {latestArticles.map((article) => (
                  <ArticleCard key={article.slug} {...article} />
                ))}
              </div>
              <div className="mt-8">
                <Button variant="outline" asChild>
                  <Link to="/category/articles">
                    Load More Articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <AdPlaceholder variant="sidebar" />
              
              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-heading mb-4">Categories</h3>
                <ul className="space-y-2">
                  {["Study Tips", "Exam Prep", "Productivity", "Learning Science", "Resources"].map(
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
                <h3 className="font-semibold text-heading mb-2">Stay Updated</h3>
                <p className="text-caption text-body mb-4">
                  Get weekly study tips delivered to your inbox.
                </p>
                <Button size="sm" className="w-full">Subscribe</Button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
