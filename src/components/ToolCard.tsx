import { Link } from "react-router-dom";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  slug: string;
  className?: string;
}

export function ToolCard({ title, description, icon: Icon, slug, className }: ToolCardProps) {
  return (
    <Link
      to={`/tool/${slug}`}
      className={cn(
        "group block bg-card rounded-xl border border-border p-5 md:p-6 transition-all duration-200 hover:shadow-card-hover hover:border-primary/20",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-heading text-body-lg mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-caption text-body line-clamp-2">{description}</p>
        </div>

        <ArrowRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
      </div>
    </Link>
  );
}
