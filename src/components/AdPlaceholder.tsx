import { cn } from "@/lib/utils";

interface AdPlaceholderProps {
  variant?: "banner" | "sidebar" | "inline";
  className?: string;
}

export function AdPlaceholder({ variant = "banner", className }: AdPlaceholderProps) {
  const sizes = {
    banner: "h-24 md:h-28",
    sidebar: "h-64",
    inline: "h-20",
  };

  return (
    <div
      className={cn(
        "bg-muted rounded-lg flex items-center justify-center border border-dashed border-border",
        sizes[variant],
        className
      )}
    >
      <span className="text-small text-muted-foreground">Advertisement</span>
    </div>
  );
}
