import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Mail, MessageSquare, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const mailtoLink = `mailto:contact@studyflow.com?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;

    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Your default email application should open now.",
    });
  };

  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <article className="prose prose-lg max-w-3xl mx-auto">
          <h1 className="text-heading font-heading text-4xl md:text-5xl font-bold mb-6">
            Contact Us
          </h1>

          <p className="text-body text-lg leading-relaxed mb-8">
            We'd love to hear from you! Whether you have feedback, suggestions, or questions
            about StudyFlow, feel free to reach out using the form below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 not-prose mb-12">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="What is this about?"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us what's on your mind..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>

          <section className="mb-10">
            <h2 className="text-heading font-heading text-2xl font-semibold mb-4 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              What We Can Help With
            </h2>
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
              respond to messages within 1-2 business days. Please allow extra time during
              busy academic periods.
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
