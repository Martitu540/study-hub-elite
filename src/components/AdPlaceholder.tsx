import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface AdPlaceholderProps {
  variant?: "banner" | "sidebar" | "inline";
  className?: string;
}

export function AdPlaceholder({
  variant = "banner",
  className,
}: AdPlaceholderProps) {
  const adRef = useRef<HTMLDivElement>(null);

  const sizes = {
    banner: "h-24 md:h-28",
    sidebar: "h-64",
    inline: "h-20",
  };

  useEffect(() => {
    if (!adRef.current) return;

    // Prevent duplicate script loads
    if (adRef.current.childNodes.length > 0) return;

    const script = document.createElement("script");
    script.src = "https://pl28377931.effectivegatecpm.com/da83e1b7e56a01ecf7ab3b201563cd2d/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    adRef.current.appendChild(script);
  }, []);

  return (
    <div
      className={cn(
        "bg-muted rounded-lg flex items-center justify-center border border-dashed border-border overflow-hidden",
        sizes[variant],
        className
      )}
    >
      <div ref={adRef} className="w-full h-full" />
    </div>
  );
}
