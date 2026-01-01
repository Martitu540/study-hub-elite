// src/components/AdsterraNative.jsx
import { useEffect } from "react";

const AdsterraNative = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://pl28377931.effectivegatecpm.com/da83e1b7e56a01ecf7ab3b201563cd2d/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");

    document.getElementById("adsterra-native")?.appendChild(script);

    return () => {
      document.getElementById("adsterra-native")?.innerHTML = "";
    };
  }, []);

  return <div id="adsterra-native" style={{ marginTop: "24px" }} />;
};

export default AdsterraNative;
