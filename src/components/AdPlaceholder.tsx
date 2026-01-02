import { cn } from "@/lib/utils";
import { useEffect, useRef, useId, forwardRef } from "react";

// Adsterra Native Banner configuration
const ADSTERRA_KEY = "da83e1b7e56a01ecf7ab3b201563cd2d";
const ADSTERRA_SCRIPT_URL = `https://pl28377931.effectivegatecpm.com/${ADSTERRA_KEY}/invoke.js`;

// Track if script has been loaded globally to avoid duplicates
let scriptLoaded = false;

interface AdPlaceholderProps {
  variant?: "banner" | "sidebar" | "inline";
  className?: string;
}

export const AdPlaceholder = forwardRef<HTMLDivElement, AdPlaceholderProps>(
  ({ variant = "banner", className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const uniqueId = useId();
    const containerId = `container-${ADSTERRA_KEY}`;

    const sizes = {
      banner: "min-h-[100px] md:min-h-[120px]",
      sidebar: "min-h-[250px]",
      inline: "min-h-[90px] md:min-h-[100px]",
    };

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Check if there's already a container with this ID on the page
      const existingContainer = document.getElementById(containerId);
      
      if (existingContainer && existingContainer !== container.firstChild) {
        // Another ad instance already claimed this ID - limitation of this ad type
        return;
      }

      // Create the container with the EXACT ID Adsterra expects
      const adContainer = document.createElement("div");
      adContainer.id = containerId;
      container.appendChild(adContainer);

      // Only load the script once per page
      if (!scriptLoaded) {
        scriptLoaded = true;
        
        const script = document.createElement("script");
        script.src = ADSTERRA_SCRIPT_URL;
        script.async = true;
        script.setAttribute("data-cfasync", "false");

        script.onerror = () => {
          console.warn("[Adsterra] Script failed to load - possibly blocked by ad blocker");
          scriptLoaded = false;
        };

        document.body.appendChild(script);
      }

      return () => {
        if (container) container.innerHTML = "";
      };
    }, [containerId]);

    return (
      <div
        ref={containerRef}
        data-ad-slot={uniqueId}
        className={cn(
          "rounded-lg overflow-hidden relative",
          sizes[variant],
          className
        )}
        style={{ 
          contain: 'layout style',
          isolation: 'isolate'
        }}
      />
    );
  }
);

AdPlaceholder.displayName = "AdPlaceholder";
