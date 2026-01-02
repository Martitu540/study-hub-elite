import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStudyPlan, StudyPlanInput } from "@/hooks/useStudyPlan";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  BookOpen,
  Target,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  CheckCircle2,
  FileText,
  Calculator,
  Brain
} from "lucide-react";
import { cn } from "@/lib/utils";

const relatedTools = [
  {
    title: "Pomodoro Timer",
    description: "Stay focused with timed study sessions and breaks.",
    icon: Clock,
    slug: "pomodoro-timer",
  },
  {
    title: "GPA Calculator",
    description: "Calculate your grade point average quickly.",
    icon: Calculator,
    slug: "gpa-calculator",
  },
  {
    title: "Flashcard Maker",
    description: "Create digital flashcards for memorization.",
    icon: FileText,
    slug: "flashcard-maker",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Study Plan Generator - Free Exam Preparation Tool",
  "description": "Create a personalized study schedule for your exams. Enter your subject, exam date, and available hours to get a detailed weekly study plan with daily tasks and review reminders.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Personalized study schedules",
    "Weekly and daily task breakdowns",
    "Built-in review reminders",
    "Phase-based learning approach",
    "Instant plan generation"
  ]
};

export default function StudyPlanTool() {
  const { plan, isGenerating, generatePlan, clearPlan } = useStudyPlan();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [formData, setFormData] = useState<StudyPlanInput>({
    subject: "",
    examDate: "",
    dailyHours: 2,
  });
  const [error, setError] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.subject.trim()) {
      setError("Please enter a subject");
      return;
    }
    if (!formData.examDate) {
      setError("Please select an exam date");
      return;
    }
    if (formData.examDate <= today) {
      setError("Exam date must be in the future");
      return;
    }
    if (formData.dailyHours < 0.5 || formData.dailyHours > 12) {
      setError("Daily hours must be between 0.5 and 12");
      return;
    }

    const result = generatePlan(formData);
    if (!result) {
      setError("Failed to generate plan. Please check your inputs.");
    }
  };

  const handleReset = () => {
    clearPlan();
    setFormData({ subject: "", examDate: "", dailyHours: 2 });
    setError("");
    setExpandedWeek(1);
  };

  return (
    <Layout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="animate-fade-in">
        {/* Tool Header */}
        <header className="bg-surface border-b border-divider">
          <div className="container py-8 md:py-12">
            <div className="max-w-3xl">
              <Link
                to="/category/tools"
                className="inline-flex items-center gap-2 text-caption text-body hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to tools
              </Link>

              <h1 className="text-title font-bold text-heading mb-3">Study Plan Generator</h1>
              <p className="text-body-lg text-body">
                Create a personalized study schedule for your upcoming exams. Enter your subject, 
                exam date, and available study hours to get a detailed weekly plan.
              </p>
            </div>
          </div>
        </header>

        {/* Tool Content */}
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Tool */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                {/* Input Form */}
                {!plan ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="subject" className="text-body font-medium">
                        Subject or Course Name
                      </Label>
                      <Input
                        id="subject"
                        type="text"
                        placeholder="e.g., Calculus II, Biology 101, History"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="mt-2"
                        maxLength={100}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="examDate" className="text-body font-medium">
                          Exam Date
                        </Label>
                        <Input
                          id="examDate"
                          type="date"
                          value={formData.examDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, examDate: e.target.value }))}
                          min={new Date(Date.now() + 86400000).toISOString().split("T")[0]}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dailyHours" className="text-body font-medium">
                          Daily Study Hours
                        </Label>
                        <Input
                          id="dailyHours"
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="12"
                          value={formData.dailyHours}
                          onChange={(e) => setFormData(prev => ({ ...prev, dailyHours: parseFloat(e.target.value) || 2 }))}
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-small text-destructive">{error}</p>
                    )}

                    <Button type="submit" size="lg" className="w-full" disabled={isGenerating}>
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Calendar className="w-4 h-4" />
                          Generate Study Plan
                        </>
                      )}
                    </Button>
                  </form>
                ) : (
                  /* Generated Plan */
                  <div className="space-y-6">
                    {/* Plan Summary */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-divider">
                      <div>
                        <h2 className="text-subtitle font-bold text-heading">{plan.subject}</h2>
                        <p className="text-caption text-muted-foreground">
                          Exam: {new Date(plan.examDate).toLocaleDateString("en-US", { 
                            weekday: "long", 
                            month: "long", 
                            day: "numeric", 
                            year: "numeric" 
                          })}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" onClick={handleReset}>
                        <RefreshCw className="w-4 h-4" />
                        New Plan
                      </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-surface rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <p className="text-subtitle font-bold text-heading">{plan.totalDays}</p>
                        <p className="text-small text-muted-foreground">Days</p>
                      </div>
                      <div className="bg-surface rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                          <Clock className="w-5 h-5" />
                        </div>
                        <p className="text-subtitle font-bold text-heading">{plan.totalHours}</p>
                        <p className="text-small text-muted-foreground">Hours</p>
                      </div>
                      <div className="bg-surface rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <p className="text-subtitle font-bold text-heading">{plan.weeklyPlans.length}</p>
                        <p className="text-small text-muted-foreground">Weeks</p>
                      </div>
                    </div>

                    {/* Weekly Plans */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-heading">Weekly Schedule</h3>
                      {plan.weeklyPlans.map((week) => (
                        <div key={week.week} className="border border-border rounded-xl overflow-hidden">
                          <button
                            onClick={() => setExpandedWeek(expandedWeek === week.week ? null : week.week)}
                            className="w-full flex items-center justify-between p-4 bg-surface hover:bg-muted/50 transition-colors text-left"
                          >
                            <div>
                              <p className="font-semibold text-heading">Week {week.week}</p>
                              <p className="text-small text-muted-foreground">
                                {week.startDate} - {week.endDate} • {week.theme}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-small text-muted-foreground">{week.totalHours}h</span>
                              {expandedWeek === week.week ? (
                                <ChevronUp className="w-5 h-5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              )}
                            </div>
                          </button>
                          
                          {expandedWeek === week.week && (
                            <div className="p-4 space-y-3 border-t border-divider">
                              {week.days.map((day, idx) => (
                                <div 
                                  key={idx} 
                                  className={cn(
                                    "p-4 rounded-lg",
                                    day.isReview ? "bg-accent" : "bg-surface"
                                  )}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium text-heading">{day.day}</p>
                                      <span className="text-small text-muted-foreground">{day.date}</span>
                                    </div>
                                    {day.isReview && (
                                      <span className="text-small font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                                        Review Day
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-small text-muted-foreground mb-2">
                                    {day.focusArea} • {day.hours}h
                                  </p>
                                  <ul className="space-y-1">
                                    {day.tasks.map((task, taskIdx) => (
                                      <li key={taskIdx} className="flex items-start gap-2 text-caption text-body">
                                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {task}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Tips */}
                    <div className="bg-accent rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                          <Lightbulb className="w-5 h-5" />
                        </div>
                        <h4 className="font-semibold text-heading">Study Tips</h4>
                      </div>
                      <ul className="space-y-2">
                        {plan.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-caption text-body">
                            <Target className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Ad Banner */}
              <div className="mt-8">
                <AdPlaceholder variant="banner" />
              </div>

              {/* SEO Content */}
              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">How to Create an Effective Study Plan</h2>
                <div className="prose">
                  <p>
                    A well-structured study plan is essential for exam success. Our <strong>Study Plan Generator</strong> helps 
                    you create a personalized schedule that breaks down your preparation into manageable daily tasks, ensuring 
                    you cover all material before your exam date.
                  </p>
                  <p>
                    Research shows that students who follow structured study plans perform significantly better on exams 
                    compared to those who study without a plan. The key benefits include reduced stress, better time 
                    management, and more comprehensive coverage of course material.
                  </p>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">How This Study Plan Generator Works</h2>
                <div className="prose">
                  <p>Our study plan generator uses proven learning science principles:</p>
                  <ol>
                    <li><strong>Phase-based learning</strong> – Your study time is divided into four phases: Foundation, Deep Dive, Practice, and Review.</li>
                    <li><strong>Spaced repetition</strong> – Built-in review days every third day help reinforce what you've learned.</li>
                    <li><strong>Time allocation</strong> – Tasks are proportioned based on your available study hours.</li>
                    <li><strong>Flexibility</strong> – Adjust the plan to fit your schedule and learning pace.</li>
                  </ol>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">Tips for Following Your Study Plan</h2>
                <div className="prose">
                  <ul>
                    <li><strong>Start early</strong> – The more days until your exam, the more balanced and less stressful your plan will be.</li>
                    <li><strong>Be consistent</strong> – Study at the same time each day to build a routine.</li>
                    <li><strong>Take breaks</strong> – Use the Pomodoro Technique for focused study sessions.</li>
                    <li><strong>Review regularly</strong> – Don't skip review days; they're crucial for long-term retention.</li>
                    <li><strong>Stay flexible</strong> – If you fall behind, adjust rather than give up.</li>
                  </ul>
                </div>
              </section>

              {/* Internal Links CTA */}
              <section className="mt-10 bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">Maximize Your Study Sessions</h3>
                <p className="text-caption text-body mb-4">
                  Use our Pomodoro Timer to maintain focus during your planned study sessions.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/tool/pomodoro-timer">Start Pomodoro Timer</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/article/finals-study-plan">Read: 4-Week Finals Plan</Link>
                  </Button>
                </div>
              </section>

              {/* Related Tools */}
              <section className="mt-12 pt-8 border-t border-divider">
                <h2 className="text-subtitle font-bold text-heading mb-6">More Study Tools</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.slug} {...tool} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                <div className="bg-surface-elevated rounded-xl p-4 border border-divider">
                  <p className="text-xs text-muted-foreground mb-2 text-center">Sponsored</p>
                  <AdPlaceholder variant="sidebar" />
                </div>
                
                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-primary">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-heading">Pro Tip</h3>
                  </div>
                  <p className="text-caption text-body">
                    Start your study plan at least 2-3 weeks before your exam. This gives you enough time for 
                    thorough preparation without last-minute cramming.
                  </p>
                </div>

                <div className="mt-6 bg-accent rounded-xl p-6">
                  <h3 className="font-semibold text-heading mb-2">Need Focus Help?</h3>
                  <p className="text-caption text-body mb-4">
                    Use our Pomodoro Timer for timed study sessions with built-in breaks.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full" asChild>
                    <Link to="/tool/pomodoro-timer">Open Timer</Link>
                  </Button>
                </div>

                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-heading mb-4">Related Articles</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link 
                        to="/article/finals-study-plan" 
                        className="text-caption text-body hover:text-primary transition-colors"
                      >
                        4-Week Finals Preparation Guide
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/article/active-recall-spaced-repetition" 
                        className="text-caption text-body hover:text-primary transition-colors"
                      >
                        Active Recall & Spaced Repetition
                      </Link>
                    </li>
                    <li>
                      <Link 
                        to="/article/managing-test-anxiety" 
                        className="text-caption text-body hover:text-primary transition-colors"
                      >
                        Managing Test Anxiety
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
