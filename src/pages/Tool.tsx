import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Play, Pause, RotateCcw, Calculator, FileText, Brain } from "lucide-react";

const relatedTools = [
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

export default function Tool() {
  const { slug } = useParams();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setMinutes(25);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <Layout>
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
                Stay focused with timed study sessions. Work for 25 minutes, then take a 5-minute break.
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
                {/* Timer Display */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-48 h-48 md:w-64 md:h-64 rounded-full bg-surface border-4 border-primary/20">
                    <span className="text-display md:text-[5rem] font-bold text-heading tabular-nums">
                      {formatTime(minutes, seconds)}
                    </span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Button
                    size="xl"
                    onClick={() => setIsRunning(!isRunning)}
                    className="min-w-32"
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
                  <Button variant="outline" size="lg" onClick={handleReset}>
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                </div>

                {/* Session Counter */}
                <div className="text-center">
                  <p className="text-caption text-muted-foreground">
                    Sessions completed today: <span className="font-semibold text-heading">{sessionsCompleted}</span>
                  </p>
                </div>

                {/* Settings */}
                <div className="mt-10 pt-8 border-t border-divider">
                  <h3 className="font-semibold text-heading mb-4">Timer Settings</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="focus" className="text-caption">Focus (minutes)</Label>
                      <Input
                        id="focus"
                        type="number"
                        defaultValue={25}
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
                        defaultValue={5}
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
                        defaultValue={15}
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

              {/* How to Use */}
              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">How to Use the Pomodoro Timer</h2>
                <div className="prose">
                  <ol>
                    <li><strong>Choose your task</strong> – Decide what you want to work on during this session.</li>
                    <li><strong>Start the timer</strong> – Press start and focus completely on your task.</li>
                    <li><strong>Work until the timer rings</strong> – Avoid all distractions during this time.</li>
                    <li><strong>Take a short break</strong> – Step away for 5 minutes to rest your mind.</li>
                    <li><strong>Repeat</strong> – After 4 sessions, take a longer 15-30 minute break.</li>
                  </ol>
                </div>
              </section>

              {/* Related Tools */}
              <section className="mt-12 pt-8 border-t border-divider">
                <h2 className="text-subtitle font-bold text-heading mb-6">More Study Tools</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.slug} {...tool} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24">
                <AdPlaceholder variant="sidebar" />
                
                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent text-primary">
                      <Brain className="w-5 h-5" />
                    </div>
                    <h3 className="font-semibold text-heading">Pro Tip</h3>
                  </div>
                  <p className="text-caption text-body">
                    Put your phone in another room during focus sessions. Studies show that even having your phone visible reduces cognitive capacity.
                  </p>
                </div>

                <div className="mt-6 bg-accent rounded-xl p-6">
                  <h3 className="font-semibold text-heading mb-2">Learn the Technique</h3>
                  <p className="text-caption text-body mb-4">
                    Read our complete guide to mastering the Pomodoro Technique.
                  </p>
                  <Button variant="secondary" size="sm" className="w-full" asChild>
                    <Link to="/article/pomodoro-technique-guide">Read Article</Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
