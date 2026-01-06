import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { AffiliateBox, articleAffiliates } from "@/components/AffiliateBox";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, ArrowLeft, Share2, HelpCircle, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { getArticleBySlug, getRelatedArticles, articles } from "@/data/articles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export default function Article() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug || "");
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = article?.title || "Check out this article";

  const shareOptions = [
    {
      name: "Twitter / X",
      icon: "𝕏",
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: "Facebook",
      icon: "f",
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: "LinkedIn",
      icon: "in",
      action: () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank"),
    },
    {
      name: "WhatsApp",
      icon: "📱",
      action: () => window.open(`https://wa.me/?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`, "_blank"),
    },
    {
      name: "Email",
      icon: "✉️",
      action: () => window.open(`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent("Check out this article: " + shareUrl)}`, "_blank"),
    },
  ];

  // Fallback for unknown articles
  if (!article) {
    const fallbackArticle = articles[0];
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-title font-bold text-heading mb-4">Article Not Found</h1>
          <p className="text-body text-muted-foreground mb-8">
            The article you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/category/articles">Browse All Articles</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const relatedArticleData = getRelatedArticles(article.relatedArticles).slice(0, 2);

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt,
    "datePublished": article.publishDate,
    "author": {
      "@type": "Organization",
      "name": "StudyHub"
    },
    "publisher": {
      "@type": "Organization",
      "name": "StudyHub"
    }
  };

  // FAQ structured data if article has FAQs
  const faqStructuredData = article.content.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": article.content.faq.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <Layout>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {faqStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      )}

      <article className="animate-fade-in">
        {/* Article Header */}
        <header className="bg-surface border-b border-divider">
          <div className="container py-8 md:py-12">
            <div className="max-w-3xl mx-auto">
              <Link
                to="/category/articles"
                className="inline-flex items-center gap-2 text-caption text-body hover:text-primary transition-colors mb-6"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to articles
              </Link>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-small font-medium text-primary bg-accent px-2.5 py-1 rounded-md">
                  {article.category}
                </span>
              </div>

              <h1 className="text-title md:text-display font-bold text-heading mb-6">
                {article.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-caption text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.publishDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {article.readTime} read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="container py-6 md:py-12">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="max-w-3xl prose prose-sm md:prose">
                <p className="text-base md:text-body-lg text-body mb-6 md:mb-8 font-serif italic">
                  {article.content.intro}
                </p>

                {article.content.sections.map((section, index) => (
                  <div key={index}>
                    <h2>{section.heading}</h2>
                    <p>{section.content}</p>
                {section.listItems && (
                  <ul>
                    {section.listItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                  </div>
                ))}

                <h2>Conclusion</h2>
                <p>{article.content.conclusion}</p>
              </div>

              {/* Affiliate Recommendation - One per article */}
              {slug && articleAffiliates[slug] && (
                <AffiliateBox
                  title={articleAffiliates[slug].title}
                  description={articleAffiliates[slug].description}
                  href={articleAffiliates[slug].href}
                />
              )}

              {/* FAQ Section */}
              {article.content.faq && article.content.faq.length > 0 && (
                <section className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-divider">
                  <div className="flex items-center gap-2 mb-4 md:mb-6">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <h2 className="text-lg md:text-subtitle font-bold text-heading">Frequently Asked Questions</h2>
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {article.content.faq.map((faq, index) => (
                      <AccordionItem key={index} value={`faq-${index}`}>
                        <AccordionTrigger className="text-left text-sm md:text-body font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm md:text-base text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              )}

              {/* Related Tools CTA */}
              {article.relatedTools.length > 0 && (
                <section className="mt-8 md:mt-10 bg-accent rounded-xl p-4 md:p-6">
                  <h3 className="font-semibold text-heading mb-2">Try Our Free Tools</h3>
                  <p className="text-xs md:text-caption text-body mb-4">
                    Put what you've learned into practice with our study tools.
                  </p>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {article.relatedTools.map((toolSlug) => (
                      <Button key={toolSlug} variant="secondary" size="sm" asChild>
                        <Link to={`/tool/${toolSlug}`}>
                          {toolSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </section>
              )}

              {/* Share Actions */}
              <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-divider flex flex-wrap items-center gap-2 md:gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {shareOptions.map((option) => (
                      <DropdownMenuItem 
                        key={option.name} 
                        onClick={option.action}
                        className="cursor-pointer"
                      >
                        <span className="w-6 text-center font-semibold">{option.icon}</span>
                        {option.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
                      {copied ? (
                        <Check className="w-4 h-4 ml-1 mr-2 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4 ml-1 mr-2" />
                      )}
                      {copied ? "Copied!" : "Copy Link"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Related Articles */}
              {relatedArticleData.length > 0 && (
                <section className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-divider">
                  <h2 className="text-lg md:text-subtitle font-bold text-heading mb-4 md:mb-6">Related Articles</h2>
                  <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
                    {relatedArticleData.map((relatedArticle) => (
                      <ArticleCard
                        key={relatedArticle.slug}
                        title={relatedArticle.title}
                        excerpt={relatedArticle.excerpt}
                        category={relatedArticle.category}
                        readTime={relatedArticle.readTime}
                        slug={relatedArticle.slug}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block space-y-6">
              <div className="sticky top-24">
                <div className="mt-6 bg-accent rounded-xl p-6">
                  <h3 className="font-semibold text-heading mb-2">Try Our Pomodoro Timer</h3>
                  <p className="text-caption text-body mb-4">
                    Put the technique into practice with our free study timer.
                  </p>
                  <Button size="sm" className="w-full" asChild>
                    <Link to="/tool/pomodoro-timer">Open Timer</Link>
                  </Button>
                </div>

                <div className="mt-6 bg-card rounded-xl border border-border p-6">
                  <h3 className="font-semibold text-heading mb-4">More Articles</h3>
                  <ul className="space-y-3">
                    {articles.slice(0, 4).filter(a => a.slug !== slug).slice(0, 3).map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`/article/${a.slug}`}
                          className="text-caption text-body hover:text-primary transition-colors line-clamp-2"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </Layout>
  );
}
