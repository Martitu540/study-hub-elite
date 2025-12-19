import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowLeft, Share2, Bookmark } from "lucide-react";

const relatedArticles = [
  {
    title: "Understanding Active Recall and Spaced Repetition",
    excerpt: "The science-backed learning techniques that top students use.",
    category: "Learning Science",
    readTime: "7 min",
    slug: "active-recall-spaced-repetition",
  },
  {
    title: "How to Create Effective Study Notes",
    excerpt: "Proven note-taking methods that help you understand and remember.",
    category: "Study Tips",
    readTime: "6 min",
    slug: "effective-study-notes",
  },
];

export default function Article() {
  const { slug } = useParams();

  return (
    <Layout>
      <article className="animate-fade-in">
        {/* Article Header */}
        <header className="bg-surface border-b border-divider">
          <div className="container py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/category/articles"
                className="inline-flex items-center gap-2 text-caption text-body hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to articles
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-small font-medium text-primary bg-accent px-2.5 py-1 rounded-md">
                  Study Tips
                </span>
              </div>

              <h1 className="text-title md:text-display font-bold text-heading mb-6">
                The Pomodoro Technique: A Complete Guide to Focused Studying
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-caption text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  January 15, 2024
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  8 min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="max-w-3xl prose">
                <p className="text-body-lg text-body mb-8 font-serif italic">
                  The Pomodoro Technique is a time management method that uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
                </p>

                <h2>What is the Pomodoro Technique?</h2>
                <p>
                  Developed by Francesco Cirillo in the late 1980s, the Pomodoro Technique is one of the most popular time management methods. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks.
                </p>
                <p>
                  Each interval is known as a "pomodoro," from the Italian word for tomato, after the tomato-shaped kitchen timer that Cirillo used as a university student.
                </p>

                {/* Inline Ad */}
                <div className="my-8 not-prose">
                  <AdPlaceholder variant="inline" />
                </div>

                <h2>How Does It Work?</h2>
                <p>
                  The basic steps of the Pomodoro Technique are simple:
                </p>
                <ol>
                  <li><strong>Choose a task</strong> – Pick something you want to work on.</li>
                  <li><strong>Set the timer</strong> – Work for 25 minutes without interruption.</li>
                  <li><strong>Take a short break</strong> – Rest for 5 minutes.</li>
                  <li><strong>Repeat</strong> – After four pomodoros, take a longer 15-30 minute break.</li>
                </ol>

                <h2>Why It Works for Students</h2>
                <p>
                  The Pomodoro Technique is particularly effective for students because it:
                </p>
                <ul>
                  <li>Reduces mental fatigue by breaking work into manageable chunks</li>
                  <li>Improves focus by creating a sense of urgency</li>
                  <li>Helps track how much time you spend on tasks</li>
                  <li>Reduces the temptation to procrastinate</li>
                </ul>

                <h3>Tips for Getting Started</h3>
                <p>
                  Start with the traditional 25-minute intervals, but feel free to adjust the timing to what works best for you. Some students prefer 50-minute sessions with 10-minute breaks for deeper work.
                </p>

                <blockquote>
                  "The Pomodoro Technique helped me stay focused during my exam prep. I went from struggling to study for an hour to completing six focused sessions a day."
                </blockquote>

                <h2>Common Mistakes to Avoid</h2>
                <p>
                  While the technique is straightforward, there are some common pitfalls:
                </p>
                <ul>
                  <li>Skipping breaks – Breaks are essential for maintaining focus</li>
                  <li>Checking your phone during pomodoros – Keep distractions away</li>
                  <li>Being too rigid – Adapt the technique to your needs</li>
                </ul>

                <h2>Conclusion</h2>
                <p>
                  The Pomodoro Technique is a simple but powerful tool for improving your study sessions. Give it a try for a week and see how it transforms your productivity.
                </p>
              </div>

              {/* Share Actions */}
              <div className="mt-10 pt-8 border-t border-divider flex flex-wrap items-center gap-3">
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="w-4 h-4" />
                  Save
                </Button>
              </div>

              {/* Related Articles */}
              <section className="mt-12 pt-8 border-t border-divider">
                <h2 className="text-subtitle font-bold text-heading mb-6">Related Articles</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {relatedArticles.map((article) => (
                    <ArticleCard key={article.slug} {...article} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                <AdPlaceholder variant="sidebar" />
                
                <div className="mt-6 bg-accent rounded-xl p-6">
                  <h3 className="font-semibold text-heading mb-2">Try Our Pomodoro Timer</h3>
                  <p className="text-caption text-body mb-4">
                    Put the technique into practice with our free study timer.
                  </p>
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/tool/pomodoro-timer">Open Timer</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
