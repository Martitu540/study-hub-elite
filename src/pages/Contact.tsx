import { Layout } from "@/components/layout/Layout";
import { Mail, MessageSquare, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AdPlaceholder } from "@/components/AdPlaceholder";

export default function Contact() {
  const { toast } = useToast();
  const email = "support@studyflow.com";

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    toast({
      title: "Email Copied",
      description: "Email address copied to clipboard.",
    });
  };

  return (
    <Layout>
      <div className="container py-8 md:py-16">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <article className="lg:col-span-2 prose prose-lg max-w-none">
            <h1 className="text-heading font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
              Contact Us
            </h1>

            <p className="text-body text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              We'd love to hear from you! Whether you have feedback, suggestions, or questions
              about StudyFlow, feel free to reach out.
            </p>

            <section className="bg-surface border border-divider rounded-lg p-4 md:p-6 mb-6 md:mb-10 not-prose">
              <h2 className="text-heading font-heading text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                Email Us
              </h2>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a 
                  href={`mailto:${email}`}
                  className="text-primary text-base md:text-lg font-medium hover:underline break-all"
                >
                  {email}
                </a>
                <Button variant="outline" size="sm" onClick={copyEmail} className="flex-shrink-0">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </section>

            {/* Mobile Ad Placement */}
            <div className="lg:hidden mb-6">
              <AdPlaceholder variant="inline" />
            </div>

            <section className="mb-6 md:mb-10">
              <h2 className="text-heading font-heading text-xl md:text-2xl font-semibold mb-3 md:mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
                What We Can Help With
              </h2>
              <ul className="space-y-2 md:space-y-3 text-body">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-sm md:text-base"><strong>Feature Requests:</strong> Let us know what tools or content would help you study better</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-sm md:text-base"><strong>Bug Reports:</strong> Found something not working? We want to fix it</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-sm md:text-base"><strong>General Feedback:</strong> Tell us how StudyFlow has helped your studies</span>
                </li>
              </ul>
            </section>

            <section className="mb-6 md:mb-10">
              <h2 className="text-heading font-heading text-xl md:text-2xl font-semibold mb-3 md:mb-4">
                Response Time
              </h2>
              <p className="text-body text-sm md:text-base leading-relaxed">
                As a small team focused on creating helpful study tools, we do our best to
                respond to messages within 1-2 business days.
              </p>
            </section>

            <section className="bg-surface border border-divider rounded-lg p-4 md:p-6">
              <h2 className="text-heading font-heading text-lg md:text-xl font-semibold mb-2 md:mb-3">
                Thank You
              </h2>
              <p className="text-body text-sm md:text-base">
                Thank you for using StudyFlow. Your feedback helps us improve and create
                better resources for students everywhere.
              </p>
            </section>
          </article>

          {/* Sidebar - Desktop Only */}
          <aside className="hidden lg:block space-y-6">
            <AdPlaceholder variant="sidebar" />
            <AdPlaceholder variant="sidebar" />
          </aside>
        </div>

        {/* Bottom Mobile Ad */}
        <div className="lg:hidden mt-6">
          <AdPlaceholder variant="banner" />
        </div>
      </div>
    </Layout>
  );
}
