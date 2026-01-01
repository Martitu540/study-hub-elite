import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export function AdPlaceholder({ variant = "banner", className }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptIdRef = useRef<string>(`adsterra-${Math.random().toString(36).substr(2, 9)}`);

  const sizes = {
    banner: "min-h-[100px] md:min-h-[120px]",
    sidebar: "min-h-[250px]",
    inline: "min-h-[90px] md:min-h-[100px]",
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create a unique container for this ad instance
    const adContainer = document.createElement("div");
    adContainer.id = scriptIdRef.current;
    container.appendChild(adContainer);

    const script = document.createElement("script");
    script.src = "https://pl28377931.effectivegatecpm.com/da83e1b7e56a01ecf7ab3b201563cd2d/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "border border-dashed border-border rounded-lg overflow-hidden flex items-center justify-center",
        sizes[variant],
        className
      )}
    />
  );
}
