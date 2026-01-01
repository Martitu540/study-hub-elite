import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function AdPlaceholder({ variant = "banner", className }: any) {
  const [loaded, setLoaded] = useState(false);

  const sizes = {
    banner: "h-24 md:h-28",
    sidebar: "h-64",
    inline: "h-20",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pl28377931.effectivegatecpm.com/da83e1b7e56a01ecf7ab3b201563cd2d/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    script.onload = () => {
      console.log("✅ Adsterra script loaded");
      setLoaded(true);
    };

    script.onerror = () => {
      console.log("❌ Adsterra script blocked");
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div
      className={cn(
        "bg-muted rounded-lg border border-dashed border-border overflow-hidden",
        sizes[variant],
        className
      )}
    >
      {!loaded && (
        <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
          Ad loading…
        </div>
      )}
    </div>
  );
}


