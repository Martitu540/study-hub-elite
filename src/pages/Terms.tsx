import { Layout } from "@/components/layout/Layout";

export default function Terms() {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-heading font-heading text-4xl md:text-5xl font-bold mb-2">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <p className="text-body text-lg leading-relaxed mb-8">
            Welcome to StudyFlow. By using our website and tools, you agree to these terms. 
            Please read them carefully. We've tried to keep them clear and straightforward.
          </p>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              1. What StudyFlow Provides
            </h2>
            <p className="text-body leading-relaxed mb-4">
              StudyFlow offers free study tools and educational content, including:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Pomodoro Timer for focused study sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Study Plan Generator for exam preparation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>GPA Calculator for tracking academic performance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Flashcard Maker with spaced repetition</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Educational articles about study techniques</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              2. Using Our Tools
            </h2>
            <p className="text-body leading-relaxed mb-4">
              You are welcome to use our tools for personal, educational purposes. When using StudyFlow:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Use the tools as intended for studying and productivity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Don't attempt to disrupt or damage our website</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Don't use automated systems to access our site in ways that could harm it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Respect other users if we add community features in the future</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              3. Your Data
            </h2>
            <p className="text-body leading-relaxed mb-4">
              StudyFlow stores data locally in your browser:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Your flashcards, study plans, and timer history are stored on your device</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Clearing your browser data will delete this information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>We don't have access to your locally stored data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>You are responsible for backing up any important information</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              4. Educational Content Disclaimer
            </h2>
            <p className="text-body leading-relaxed">
              Our articles and tips are for general educational purposes. While we strive to 
              provide accurate and helpful information, we cannot guarantee specific academic 
              results. Study techniques work differently for different people, and success 
              depends on many factors beyond using our tools.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              5. GPA Calculator Disclaimer
            </h2>
            <p className="text-body leading-relaxed">
              Our GPA calculator provides estimates based on the information you enter. 
              Different schools may use different grading scales or calculation methods. 
              Always verify your official GPA with your school or institution.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              6. Intellectual Property
            </h2>
            <p className="text-body leading-relaxed mb-4">
              The content on StudyFlow, including articles, design, and code, is our property 
              or used with permission. You may:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Use our tools for personal study</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Share links to our pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Quote our articles with attribution</span>
              </li>
            </ul>
            <p className="text-body leading-relaxed mt-4">
              You may not reproduce our entire site or tools for commercial purposes without permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              7. Availability
            </h2>
            <p className="text-body leading-relaxed">
              We strive to keep StudyFlow available, but we cannot guarantee uninterrupted access.
              The site may occasionally be unavailable for maintenance or due to technical issues.
              We are not liable for any inconvenience caused by downtime.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              8. Changes to These Terms
            </h2>
            <p className="text-body leading-relaxed">
              We may update these terms occasionally. Continued use of StudyFlow after changes
              means you accept the new terms. We encourage you to review this page periodically.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-body leading-relaxed">
              StudyFlow is provided "as is" without warranties of any kind. We are not liable
              for any damages arising from your use of our website or tools. This includes,
              but is not limited to, loss of data stored in your browser's local storage.
            </p>
          </section>

          <section className="bg-surface border border-divider rounded-lg p-6">
            <h2 className="text-heading font-heading text-xl font-semibold mb-3">
              Questions About These Terms?
            </h2>
            <p className="text-body">
              If you have questions about these terms of service, please contact us through 
              our website. We're happy to clarify anything.
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}
