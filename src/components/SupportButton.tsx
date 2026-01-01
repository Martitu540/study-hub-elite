import { useState } from "react";
import { Heart, Coffee, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const BUYMEACOFFEE_USERNAME = "yourusername"; // Replace with your Buy Me a Coffee username

const fixedAmounts = [
  { amount: 3, label: "1 Coffee", emoji: "☕" },
  { amount: 5, label: "2 Coffees", emoji: "☕☕" },
  { amount: 10, label: "5 Coffees", emoji: "☕☕☕" },
  { amount: 25, label: "Big Support", emoji: "🎉" },
];

export function SupportButton() {
  const [customAmount, setCustomAmount] = useState("");
  const [open, setOpen] = useState(false);

  const handleSupport = (amount: number) => {
    // Buy Me a Coffee link - opens in new tab
    const url = `https://www.buymeacoffee.com/${BUYMEACOFFEE_USERNAME}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  const handleCustomSupport = () => {
    const amount = parseFloat(customAmount);
    if (amount && amount > 0) {
      handleSupport(amount);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 rounded-full h-12 w-12 md:h-14 md:w-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          size="icon"
        >
          <Heart className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
          <span className="sr-only">Support us</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Coffee className="w-5 h-5 text-primary" />
            Support StudyFlow
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-2">
          <p className="text-sm text-muted-foreground">
            Help us keep creating free study tools and content! Your support means the world to us.
          </p>

          {/* Fixed Amounts Grid */}
          <div className="grid grid-cols-2 gap-3">
            {fixedAmounts.map((option) => (
              <button
                key={option.amount}
                onClick={() => handleSupport(option.amount)}
                className="flex flex-col items-center gap-1 p-4 rounded-lg border border-border bg-card hover:bg-accent hover:border-primary/50 transition-all duration-200 group"
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-medium text-sm text-heading group-hover:text-primary">
                  ${option.amount}
                </span>
                <span className="text-xs text-muted-foreground">
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-heading">
              Custom Amount
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="pl-7"
                />
              </div>
              <Button 
                onClick={handleCustomSupport}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
              >
                Support
              </Button>
            </div>
          </div>

          {/* Buy Me a Coffee branding */}
          <div className="pt-2 border-t border-divider">
            <p className="text-xs text-center text-muted-foreground">
              Powered by{" "}
              <a
                href="https://www.buymeacoffee.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Buy Me a Coffee
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
