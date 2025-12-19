import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const navigation = [
  { name: "Articles", href: "/category/articles" },
  { name: "Tools", href: "/category/tools" },
  { name: "Study Tips", href: "/category/study-tips" },
  { name: "Resources", href: "/category/resources" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-divider">
      <nav className="container flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-heading">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="w-4 h-4" />
          </div>
          <span className="hidden sm:inline">StudyFlow</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-4 py-2 text-caption font-medium rounded-lg transition-colors",
                location.pathname === item.href
                  ? "text-primary bg-accent"
                  : "text-body hover:text-heading hover:bg-secondary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="text-body">
            {resolvedTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-body"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-divider bg-background animate-fade-in">
          <div className="container py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 text-body-lg font-medium rounded-lg transition-colors",
                  location.pathname === item.href
                    ? "text-primary bg-accent"
                    : "text-body hover:text-heading hover:bg-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
