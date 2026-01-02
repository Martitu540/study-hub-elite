import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { AdBanner300x250 } from "@/components/AdBanner300x250";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGpaCalculator, GRADE_OPTIONS } from "@/hooks/useGpaCalculator";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Calculator,
  Clock,
  FileText,
  CalendarDays,
  GraduationCap,
  RotateCcw,
  TrendingUp,
  Award,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const relatedTools = [
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
    title: "Flashcard Maker",
    description: "Create digital flashcards for memorization.",
    icon: FileText,
    slug: "flashcard-maker",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "GPA Calculator - Free Grade Point Average Calculator",
  description:
    "Calculate your GPA instantly with our free GPA calculator. Enter your courses, credits, and grades to get your cumulative grade point average. Supports 4.0 scale with A+ to F grades.",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Calculate GPA on 4.0 scale",
    "Support for A+ through F grades",
    "Credit-weighted calculations",
    "Save progress automatically",
    "Add unlimited courses",
  ],
};

export default function GpaCalculatorTool() {
  const {
    courses,
    result,
    addCourse,
    removeCourse,
    updateCourse,
    calculateGpa,
    clearAll,
    getGpaColor,
    getGpaLabel,
  } = useGpaCalculator();

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

              <h1 className="text-title font-bold text-heading mb-3">
                GPA Calculator
              </h1>
              <p className="text-body-lg text-body">
                Calculate your grade point average quickly and accurately. Add
                your courses, enter credits and grades, and get your GPA
                instantly.
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
                {/* Courses List */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-12 gap-3 text-caption font-medium text-muted-foreground">
                    <div className="col-span-5">Course Name</div>
                    <div className="col-span-3">Credits</div>
                    <div className="col-span-3">Grade</div>
                    <div className="col-span-1"></div>
                  </div>

                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="grid grid-cols-12 gap-3 items-center"
                    >
                      <div className="col-span-5">
                        <Input
                          placeholder={`Course ${index + 1}`}
                          value={course.name}
                          onChange={(e) =>
                            updateCourse(course.id, "name", e.target.value)
                          }
                          maxLength={50}
                        />
                      </div>
                      <div className="col-span-3">
                        <Input
                          type="number"
                          placeholder="3"
                          value={course.credits}
                          onChange={(e) =>
                            updateCourse(
                              course.id,
                              "credits",
                              Math.max(0, Math.min(10, parseFloat(e.target.value) || 0))
                            )
                          }
                          min={0}
                          max={10}
                          step={0.5}
                        />
                      </div>
                      <div className="col-span-3">
                        <Select
                          value={course.grade}
                          onValueChange={(value) =>
                            updateCourse(course.id, "grade", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Grade" />
                          </SelectTrigger>
                          <SelectContent>
                            {GRADE_OPTIONS.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-1 flex justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeCourse(course.id)}
                          disabled={courses.length === 1}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Course Button */}
                <Button
                  variant="outline"
                  onClick={addCourse}
                  className="w-full mb-6"
                >
                  <Plus className="w-4 h-4" />
                  Add Course
                </Button>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button onClick={calculateGpa} size="lg" className="flex-1">
                    <Calculator className="w-4 h-4" />
                    Calculate GPA
                  </Button>
                  <Button variant="outline" size="lg" onClick={clearAll}>
                    <RotateCcw className="w-4 h-4" />
                    Clear
                  </Button>
                </div>

                {/* Result */}
                {result && (
                  <div className="mt-8 pt-8 border-t border-divider animate-fade-in">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent mb-4">
                        <GraduationCap className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-caption text-muted-foreground mb-2">
                        Your GPA
                      </p>
                      <p
                        className={`text-display font-bold ${getGpaColor(
                          result.gpa
                        )}`}
                      >
                        {result.gpa.toFixed(2)}
                      </p>
                      <p className="text-body-lg text-muted-foreground mt-1">
                        {getGpaLabel(result.gpa)}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-surface rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                          <Award className="w-5 h-5" />
                        </div>
                        <p className="text-subtitle font-bold text-heading">
                          {result.totalCredits}
                        </p>
                        <p className="text-small text-muted-foreground">
                          Total Credits
                        </p>
                      </div>
                      <div className="bg-surface rounded-xl p-4 text-center">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mx-auto mb-2">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <p className="text-subtitle font-bold text-heading">
                          {result.totalPoints.toFixed(1)}
                        </p>
                        <p className="text-small text-muted-foreground">
                          Quality Points
                        </p>
                      </div>
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
                <h2 className="text-subtitle font-bold text-heading mb-4">
                  How to Calculate Your GPA
                </h2>
                <div className="prose">
                  <p>
                    Your <strong>Grade Point Average (GPA)</strong> is a
                    standardized way of measuring academic achievement in the
                    United States. Most colleges and universities use a 4.0
                    scale, where an A equals 4.0 and an F equals 0.0.
                  </p>
                  <p>
                    To calculate your GPA, multiply each grade by its credit
                    hours, add all the products together, and divide by the
                    total number of credit hours. This weighted average gives
                    more importance to courses with more credits.
                  </p>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">
                  GPA Scale Reference
                </h2>
                <div className="prose">
                  <p>Here's the standard 4.0 GPA scale used by most institutions:</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4 not-prose">
                    <div className="bg-surface rounded-lg p-4">
                      <div className="space-y-2 text-caption">
                        <div className="flex justify-between">
                          <span>A+ / A</span>
                          <span className="font-semibold">4.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>A-</span>
                          <span className="font-semibold">3.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span>B+</span>
                          <span className="font-semibold">3.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>B</span>
                          <span className="font-semibold">3.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>B-</span>
                          <span className="font-semibold">2.7</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-surface rounded-lg p-4">
                      <div className="space-y-2 text-caption">
                        <div className="flex justify-between">
                          <span>C+</span>
                          <span className="font-semibold">2.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span>C</span>
                          <span className="font-semibold">2.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span>C-</span>
                          <span className="font-semibold">1.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span>D+ / D / D-</span>
                          <span className="font-semibold">1.3 - 0.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span>F</span>
                          <span className="font-semibold">0.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h2 className="text-subtitle font-bold text-heading mb-4">
                  Tips to Improve Your GPA
                </h2>
                <div className="prose">
                  <ul>
                    <li>
                      <strong>Prioritize high-credit courses</strong> – These
                      have a bigger impact on your overall GPA.
                    </li>
                    <li>
                      <strong>Use study tools</strong> – Try our Pomodoro Timer
                      and Study Plan Generator to boost productivity.
                    </li>
                    <li>
                      <strong>Seek help early</strong> – Visit office hours or
                      tutoring centers before falling behind.
                    </li>
                    <li>
                      <strong>Stay organized</strong> – Keep track of
                      assignments and deadlines to avoid missed work.
                    </li>
                    <li>
                      <strong>Retake courses</strong> – Some schools allow grade
                      replacement for repeated courses.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Internal Links CTA */}
              <section className="mt-10 bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">
                  Boost Your Academic Performance
                </h3>
                <p className="text-caption text-body mb-4">
                  Use our free study tools to improve your grades and reach your
                  GPA goals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="secondary" size="sm" asChild>
                    <Link to="/tool/pomodoro-timer">Try Pomodoro Timer</Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/tool/study-plan-generator">Create Study Plan</Link>
                  </Button>
                </div>
              </section>

              {/* Related Tools */}
              <section className="mt-12 pt-8 border-t border-divider">
                <h2 className="text-subtitle font-bold text-heading mb-6">
                  Related Tools
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedTools.map((tool) => (
                    <ToolCard key={tool.slug} {...tool} />
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-surface-elevated rounded-xl p-4 border border-divider">
                <p className="text-xs text-muted-foreground mb-2 text-center">Sponsored</p>
                <AdBanner300x250 />
              </div>

              <div className="bg-card rounded-xl border border-border p-6">
                <h3 className="font-semibold text-heading mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-caption text-body">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Enter course names to help track your grades
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Your data saves automatically in your browser
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Add all courses for accurate cumulative GPA
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Use decimals for half-credit courses
                  </li>
                </ul>
              </div>

              <div className="bg-accent rounded-xl p-6">
                <h3 className="font-semibold text-heading mb-2">
                  Need Help Studying?
                </h3>
                <p className="text-caption text-body mb-4">
                  Create a personalized study plan to improve your grades.
                </p>
                <Button size="sm" className="w-full" asChild>
                  <Link to="/tool/study-plan-generator">Get Started</Link>
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
