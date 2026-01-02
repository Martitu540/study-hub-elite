import { useEffect, useRef, useId } from "react";

declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

export const AdBanner300x250 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useId();
  const loadedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || loadedRef.current) return;

    loadedRef.current = true;

    // Set the atOptions on window
    window.atOptions = {
      key: "9540831946d0614d49db005da1efa4b6",
      format: "iframe",
      height: 250,
      width: 300,
      params: {},
    };

    // Create and append the script
    const script = document.createElement("script");
    script.src = "https://www.highperformanceformat.com/9540831946d0614d49db005da1efa4b6/invoke.js";
    script.async = true;

    container.appendChild(script);

    return () => {
      if (container) {
        container.innerHTML = "";
      }
      loadedRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-ad-slot={uniqueId}
      className="flex items-center justify-center min-h-[250px] w-full max-w-[300px] mx-auto overflow-hidden"
      style={{
        contain: "layout style",
        isolation: "isolate",
      }}
    />
  );
};
