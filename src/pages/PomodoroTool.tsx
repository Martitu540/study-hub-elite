import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AdBanner300x250 } from "@/components/AdBanner300x250";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePomodoro, SessionType } from "@/hooks/usePomodoro";
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward,
  Calculator, 
  FileText, 
  Brain,
  Coffee,
  Target,
  Clock,
  TrendingUp,
  Lightbulb,
  X,
  CalendarDays
} from "lucide-react";
import { cn } from "@/lib/utils";

const relatedTools = [
  {
    title: "Study Plan Generator",
    description: "Create a personalized study schedule for your exams.",
    icon: CalendarDays,
    slug: "study-plan-generator",
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
  "name": "Pomodoro Timer - Free Online Study Timer",
  "description": "Free online Pomodoro timer for students. Boost your study productivity with timed focus sessions, break reminders, and daily progress tracking.",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "featureList": [
    "Customizable focus and break durations",
    "Automatic session transitions",
    "Daily productivity tracking",
    "Progress persistence across sessions",
    "Audio notifications"
  ]
};

export default function PomodoroTool() {
  const {
    minutes,
    seconds,
    progress,
    isRunning,
    sessionType,
    currentSession,
    settings,
    dailyStats,
    showTip,
    currentTip,
    dismissTip,
    start,
    pause,
    reset,
    skipToNext,
    switchSession,
    updateSettings,
  } = usePomodoro();

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getSessionLabel = (type: SessionType) => {
    switch (type) {
      case "focus": return "Focus Time";
      case "shortBreak": return "Short Break";
      case "longBreak": return "Long Break";
    }
  };

  const getSessionIcon = (type: SessionType) => {
    switch (type) {
      case "focus": return Target;
      case "shortBreak": return Coffee;
      case "longBreak": return Brain;
    }
  };

  const SessionIcon = getSessionIcon(sessionType);

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

              <h1 className="text-title font-bold text-heading mb-3">Pomodoro Timer</h1>
              <p className="text-body-lg text-body">
                Boost your study productivity with timed focus sessions. Work for 25 minutes, 
                take a break, and track your daily progress.
              </p>
            </div>
          </div>
        </header>

        {/* Tool Content */}
        <div className="container py-8 md:py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Tool */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl border border-border p-6 md:p-10">
                {/* Session Type Tabs */}
                <div className="flex justify-center gap-2 mb-8">
                  {(["focus", "shortBreak", "longBreak"] as SessionType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => switchSession(type)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-caption font-medium transition-colors",
                        sessionType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      {getSessionLabel(type)}
                    </button>
                  ))}
                </div>

                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="relative inline-flex items-center justify-center w-52 h-52 md:w-72 md:h-72">
                    {/* Progress Ring */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        className="text-muted"
                      />
                      <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${progress * 283} 283`}
                        className={cn(
                          "transition-all duration-1000",
                          sessionType === "focus" ? "text-primary" : "text-green-500"
                        )}
                      />
                    </svg>
                    
                    <div className="text-center">
                      <SessionIcon className={cn(
                        "w-8 h-8 mx-auto mb-2",
                        sessionType === "focus" ? "text-primary" : "text-green-500"
                      )} />
                      <span className="text-display md:text-[4.5rem] font-bold text-heading tabular-nums">
                        {formatTime(minutes, seconds)}
                      </span>
                      <p className="text-caption text-muted-foreground mt-1">
                        {getSessionLabel(sessionType)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Button
                    size="xl"
                    onClick={isRunning ? pause : start}
                    className="min-w-36"
                  >
                    {isRunning ? (
                      <>
                        <Pause className="w-5 h-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="outline" size="lg" onClick={reset}>
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                  <Button variant="ghost" size="lg" onClick={skipToNext}>
                    <SkipForward className="w-4 h-4" />
                    Skip
                  </Button>
                </div>

                {/* Productivity Tip */}
                {showTip && (
                  <div className="bg-accent border border-primary/20 rounded-xl p-5 mb-8 relative animate-fade-in">
                    <button 
                      onClick={dismissTip}
                      className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-heading mb-1">Productivity Tip</h4>
                        <p className="text-caption text-body">{currentTip}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Daily Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-surface rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                      <Target className="w-5 h-5" />
                    </div>
                    <p className="text-subtitle font-bold text-heading">{dailyStats.focusSessions}</p>
                    <p className="text-small text-muted-foreground">Sessions</p>
                  </div>
                  <div className="bg-surface rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                      <Clock className="w-5 h-5" />
                    </div>
                    <p className="text-subtitle font-bold text-heading">{dailyStats.totalFocusMinutes}</p>
                    <p className="text-small text-muted-foreground">Minutes</p>
                  </div>
                  <div className="bg-surface rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <p className="text-subtitle font-bold text-heading">
                      {currentSession}/{settings.sessionsBeforeLongBreak}
                    </p>
                    <p className="text-small text-muted-foreground">Until Break</p>
                  </div>
                </div>

                {/* Settings */}
                <div className="pt-8 border-t border-divider">
                  <h3 className="font-semibold text-heading mb-4">Timer Settings</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="focus" className="text-caption">Focus (minutes)</Label>
                      <Input
                        id="focus"
                        type="number"
                        value={settings.focusDuration}
                        onChange={(e) => updateSettings({ focusDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 25)) })}
                        min={1}
                        max={60}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shortBreak" className="text-caption">Short break</Label>
                      <Input
                        id="shortBreak"
                        type="number"
                        value={settings.shortBreakDuration}
                        onChange={(e) => updateSettings({ shortBreakDuration: Math.max(1, Math.min(30, parseInt(e.target.value) || 5)) })}
                        min={1}
                        max={30}
                        className="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label htmlFor="longBreak" className="text-caption">Long break</Label>
                      <Input
                        id="longBreak"
                        type="number"
                        value={settings.longBreakDuration}
                        onChange={(e) => updateSettings({ longBreakDuration: Math.max(1, Math.min(60, parseInt(e.target.value) || 15)) })}
                        min={1}
                        max={60}
                        className="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ad Banner */}
              <div className="mt-8">
                <AdPlaceholder variant="banner" />
              </div>

              {/* SEO Content */}
              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">What is the Pomodoro Technique?</h2>
                <div className="prose">
                  <p>
                    The <strong>Pomodoro Technique</strong> is a time management method developed by Francesco Cirillo 
                    in the late 1980s. Named after the tomato-shaped kitchen timer Cirillo used as a university student, 
                    this technique has helped millions of students and professionals improve their focus and productivity.
                  </p>
                  <p>
                    The method is simple: work in focused 25-minute intervals (called "pomodoros"), followed by 5-minute 
                    breaks. After completing four pomodoros, take a longer 15-30 minute break to rest and recharge.
                  </p>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">How to Use This Pomodoro Timer</h2>
                <div className="prose">
                  <ol>
                    <li><strong>Choose your task</strong> – Decide what you want to work on during this session.</li>
                    <li><strong>Start the timer</strong> – Press start and focus completely on your task for 25 minutes.</li>
                    <li><strong>Work until the timer ends</strong> – Avoid all distractions during this time.</li>
                    <li><strong>Take a short break</strong> – When the timer rings, step away for 5 minutes.</li>
                    <li><strong>Repeat</strong> – After 4 sessions, take a longer 15-30 minute break.</li>
                  </ol>
                  <p>
                    Your progress is automatically saved, so you can track how many focus sessions you complete each day 
                    and see your total study time.
                  </p>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">Benefits of the Pomodoro Technique for Students</h2>
                <div className="prose">
                  <ul>
                    <li><strong>Reduces mental fatigue</strong> – Regular breaks prevent burnout and keep your mind fresh.</li>
                    <li><strong>Improves focus</strong> – The ticking timer creates urgency and discourages procrastination.</li>
                    <li><strong>Tracks study time</strong> – Know exactly how long you've studied each subject.</li>
                    <li><strong>Builds better habits</strong> – Consistent use trains your brain to focus more effectively.</li>
                    <li><strong>Reduces anxiety</strong> – Breaking large tasks into small intervals makes them less overwhelming.</li>
                  </ul>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">Tips for Maximum Productivity</h2>
                <div className="prose">
                  <ul>
                    <li><strong>Eliminate distractions</strong> – Put your phone in another room and close unnecessary browser tabs.</li>
                    <li><strong>Prepare your workspace</strong> – Have everything you need ready before starting a session.</li>
                    <li><strong>Use breaks wisely</strong> – Stand up, stretch, or get water instead of scrolling social media.</li>
                    <li><strong>Adjust timing to your needs</strong> – Some students prefer 50-minute sessions with 10-minute breaks.</li>
                    <li><strong>Track your progress</strong> – Review your daily stats to stay motivated and identify patterns.</li>
                  </ul>
                </div>
              </section>

              {/* Internal Links CTA */}
              <section className="mt-10 bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">Ready to Plan Your Study Schedule?</h3>
                <p className="text-caption text-body mb-4">
                  Combine the Pomodoro Technique with a structured study plan for maximum exam preparation success.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/tool/study-plan-generator">Create Study Plan</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/article/pomodoro-technique-guide">Read Full Guide</Link>
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
                  <AdBanner300x250 />
                </div>
                
                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-primary">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-heading">Quick Tip</h3>
                  </div>
                  <p className="text-caption text-body">
                    Put your phone in another room during focus sessions. Studies show that even having 
                    your phone visible reduces cognitive capacity by up to 10%.
                  </p>
                </div>

                <div className="mt-6 bg-accent rounded-xl p-6">
                  <h3 className="font-semibold text-heading mb-2">Master the Technique</h3>
                  <p className="text-caption text-body mb-4">
                    Read our complete guide to using the Pomodoro Technique for exam success.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full" asChild>
                    <Link to="/article/pomodoro-technique-guide">Read Article</Link>
                  </Button>
                </div>

                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-heading mb-4">Related Articles</h3>
                  <ul className="space-y-3">
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
                        to="/article/effective-study-notes" 
                        className="text-caption text-body hover:text-primary transition-colors"
                      >
                        How to Create Effective Study Notes
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
