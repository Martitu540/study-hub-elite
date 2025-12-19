import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  slug: string;
  featured?: boolean;
  className?: string;
}

export function ArticleCard({
  title,
  excerpt,
  category,
  readTime,
  slug,
  featured = false,
  className,
}: ArticleCardProps) {
  return (
    <Link
      to={`/article/${slug}`}
      className={cn(
        "group block bg-card rounded-xl border border-border p-5 md:p-6 transition-all duration-200 hover:shadow-card-hover hover:border-primary/20",
        featured && "md:p-8",
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-small font-medium text-primary bg-accent px-2.5 py-1 rounded-md">
            {category}
          </span>
          <span className="flex items-center gap-1 text-small text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            {readTime}
          </span>
        </div>

        <h3
          className={cn(
            "font-semibold text-heading mb-2 group-hover:text-primary transition-colors",
            featured ? "text-subtitle" : "text-body-lg"
          )}
        >
          {title}
        </h3>

        <p className="text-body text-body flex-1 mb-4 line-clamp-2">{excerpt}</p>

        <div className="flex items-center gap-1 text-caption font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          Read more
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
