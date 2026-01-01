import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function AdPlaceholder({ variant = "banner", className }: any) {
  const sizes = {
    banner: "min-h-[120px]",
    sidebar: "min-h-[250px]",
    inline: "min-h-[100px]",
  };

  useEffect(() => {
    if (document.getElementById("adsterra-script")) return;

    const script = document.createElement("script");
    script.id = "adsterra-script";
    script.src = "https://pl28377931.effectivegatecpm.com/da83e1b7e56a01ecf7ab3b201563cd2d/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="atContainer"
      className={cn(
        "border border-dashed border-border rounded-lg overflow-hidden",
        sizes[variant],
        className
      )}
    />
  );
}
