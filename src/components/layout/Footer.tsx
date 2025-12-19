import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const footerLinks = {
  resources: [
    { name: "Articles", href: "/category/articles" },
    { name: "Study Tools", href: "/category/tools" },
    { name: "Exam Prep", href: "/category/exam-prep" },
    { name: "Resources", href: "/category/resources" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "/careers" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-surface border-t border-divider mt-auto">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold text-heading mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="w-4 h-4" />
              </div>
              <span>StudyFlow</span>
            </Link>
            <p className="text-caption text-body max-w-xs">
              Your companion for smarter studying and better exam preparation.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-heading text-caption mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-caption text-body hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-heading text-caption mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-caption text-body hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-heading text-caption mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-caption text-body hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-divider flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-small text-muted-foreground">
            © {new Date().getFullYear()} StudyFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
