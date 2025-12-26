import { Layout } from "@/components/layout/Layout";
import { BookOpen, Target, Users, Heart } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-heading font-heading text-4xl md:text-5xl font-bold mb-6">
            About StudyFlow
          </h1>
          
          <p className="text-body text-lg leading-relaxed mb-8">
            StudyFlow is a free collection of study tools and educational resources designed 
            to help students learn more effectively. We believe that quality study resources 
            should be accessible to everyone, regardless of their financial situation.
          </p>

          <section className="mb-12">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-body leading-relaxed">
              Our mission is simple: to provide students with practical, easy-to-use tools 
              that make studying more productive and less stressful. Whether you're preparing 
              for exams, managing your study schedule, or trying to build better learning habits, 
              we're here to help.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary" />
              What We Offer
            </h2>
            <ul className="space-y-3 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Pomodoro Timer</strong> – Stay focused with timed study sessions and breaks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Study Plan Generator</strong> – Create personalized study schedules for your exams</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>GPA Calculator</strong> – Track your academic performance easily</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Flashcard Maker</strong> – Create and review flashcards with spaced repetition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Educational Articles</strong> – Learn proven study techniques and productivity tips</span>
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <Users className="w-6 h-6 text-primary" />
              Who This Is For
            </h2>
            <p className="text-body leading-relaxed">
              StudyFlow is built for students at all levels – high school, college, and beyond. 
              Whether you're studying for finals, preparing for standardized tests, or simply 
              trying to develop better study habits, our tools are designed to fit your needs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary" />
              Our Commitment
            </h2>
            <p className="text-body leading-relaxed mb-4">
              We are committed to:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Keeping our core tools free and accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Respecting your privacy – we don't require accounts or collect personal data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Creating content that genuinely helps students succeed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Continuously improving based on student feedback</span>
              </li>
            </ul>
          </section>

          <section className="bg-surface border border-divider rounded-lg p-6">
            <h2 className="text-heading font-heading text-xl font-semibold mb-3">
              Questions or Feedback?
            </h2>
            <p className="text-body">
              We'd love to hear from you! If you have suggestions for new features, find any issues, 
              or just want to share how StudyFlow has helped you, feel free to reach out.
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}
