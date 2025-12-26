import { Layout } from "@/components/layout/Layout";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-heading font-heading text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>
          
          <p className="text-body text-lg leading-relaxed mb-8">
            We'd love to hear from you! Whether you have feedback, suggestions, or questions 
            about StudyFlow, feel free to reach out.
          </p>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              How to Reach Us
            </h2>
            <p className="text-body leading-relaxed mb-4">
              Since StudyFlow is a free, community-focused project, we handle inquiries through 
              the following channels:
            </p>
            <ul className="space-y-3 text-body">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Feature Requests:</strong> Let us know what tools or content would help you study better</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>Bug Reports:</strong> Found something not working? We want to fix it</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span><strong>General Feedback:</strong> Tell us how StudyFlow has helped your studies</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary" />
              Response Time
            </h2>
            <p className="text-body leading-relaxed">
              As a small team focused on creating helpful study tools, we do our best to 
              respond to messages in a timely manner. Please allow a few days for a response, 
              especially during busy academic periods.
            </p>
          </section>

          <section className="bg-surface border border-divider rounded-lg p-6">
            <h2 className="text-heading font-heading text-xl font-semibold mb-3">
              Thank You
            </h2>
            <p className="text-body">
              Thank you for using StudyFlow. Your feedback helps us improve and create 
              better resources for students everywhere.
            </p>
          </section>
        </article>
      </div>
    </Layout>
  );
}
