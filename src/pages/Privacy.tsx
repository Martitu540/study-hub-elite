import { Layout } from "@/components/layout/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-heading font-heading text-4xl md:text-5xl font-bold mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>

          <p className="text-body text-lg leading-relaxed mb-8">
            At StudyFlow, we respect your privacy and are committed to being transparent about 
            how our website works. This policy explains what information we collect (and don't collect) 
            when you use our site.
          </p>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              Information We Don't Collect
            </h2>
            <p className="text-body leading-relaxed mb-4">
              StudyFlow is designed to respect your privacy:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>We do not require you to create an account</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>We do not collect your name, email, or any personal information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>We do not track your individual behavior across sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>We do not sell or share data with third parties for marketing purposes</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              Local Storage
            </h2>
            <p className="text-body leading-relaxed">
              Our study tools use your browser's local storage to save your preferences and progress. 
              This data stays on your device and is never sent to our servers. You can clear this 
              data at any time through your browser settings. Examples include:
            </p>
            <ul className="space-y-2 text-body mt-4">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Your theme preference (light or dark mode)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Pomodoro timer session history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Flashcards you've created</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Study plans you've generated</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              Cookies and Analytics
            </h2>
            <p className="text-body leading-relaxed mb-4">
              We may use cookies for the following purposes:
            </p>
            <ul className="space-y-2 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Essential cookies:</strong> To remember your preferences like dark/light mode</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Analytics cookies:</strong> We may use privacy-focused analytics to understand 
                how visitors use our site in aggregate (not individually)</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              External Links
            </h2>
            <p className="text-body leading-relaxed">
              Our site may contain links to external websites. We are not responsible for the 
              privacy practices of these other sites. We encourage you to read the privacy 
              policies of any website you visit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              Children's Privacy
            </h2>
            <p className="text-body leading-relaxed">
              Our website is designed to be educational and appropriate for users of all ages. 
              We do not knowingly collect personal information from children. Since we don't 
              require accounts or collect personal data, children can safely use our study tools.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4">
              Changes to This Policy
            </h2>
            <p className="text-body leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted 
              on this page with an updated revision date. We encourage you to review this page 
              periodically.
            </p>
          </section>

          <section className="bg-surface border border-divider rounded-lg p-6">
            <h2 className="text-heading font-heading text-xl font-semibold mb-3">
              Questions?
            </h2>
            <p className="text-body">
              If you have any questions about this privacy policy, please contact us through 
              our website.
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}
