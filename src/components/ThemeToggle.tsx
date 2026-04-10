"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<HTMLDivElement>(null);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Animation logic
    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotation: 360,
        opacity: 0,
        scale: 0.5,
        duration: 0.4,
        ease: "back.in(1.7)",
        onComplete: () => {
          setTheme(newTheme);
          gsap.fromTo(iconRef.current, 
            { rotation: -360, opacity: 0, scale: 0.5 },
            { rotation: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
          );
        }
      });
    } else {
      setTheme(newTheme);
    }
  };

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed bottom-8 right-8 z-[100]"
    >
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="h-14 w-14 rounded-full border border-border bg-card notion-shadow-deep hover:bg-notion-warm-white/50 dark:hover:bg-notion-warm-dark/50 transition-colors backdrop-blur-md"
      >
        <div ref={iconRef} className="flex items-center justify-center">
          {theme === "dark" ? (
            <Moon className="h-6 w-6 text-notion-blue" />
          ) : (
            <Sun className="h-6 w-6 text-notion-blue" />
          )}
        </div>
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}
