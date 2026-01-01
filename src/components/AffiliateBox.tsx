import { ExternalLink } from "lucide-react";

interface AffiliateBoxProps {
  title: string;
  description: string;
  href: string;
  buttonText?: string;
}

export function AffiliateBox({ 
  title, 
  description, 
  href, 
  buttonText = "Try it here" 
}: AffiliateBoxProps) {
  return (
    <div className="my-8 p-5 rounded-xl border border-divider bg-surface/50 backdrop-blur-sm">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            Recommended Tool
          </p>
          <h4 className="font-semibold text-heading text-lg">{title}</h4>
        </div>
        <p className="text-body text-sm leading-relaxed">{description}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline underline-offset-2 transition-colors w-fit"
        >
          {buttonText}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

// Affiliate mappings by article slug - add your affiliate links here
export const articleAffiliates: Record<string, {
  title: string;
  description: string;
  href: string;
}> = {
  "how-to-create-study-plan": {
    title: "Notion",
    description: "Create organized study plans, track your progress, and manage all your notes in one place. Perfect for students who want to stay on top of their coursework.",
    href: "https://notion.so", // Replace with your affiliate link
  },
  "best-ways-to-study-exams": {
    title: "Anki Flashcards",
    description: "Use spaced repetition to memorize anything. Anki is the #1 tool for medical students, language learners, and anyone preparing for exams.",
    href: "https://apps.ankiweb.net", // Replace with your affiliate link
  },
  "effective-note-taking-methods": {
    title: "Notability",
    description: "Combine handwriting, typing, and audio recording for powerful note-taking. Great for lectures and study sessions.",
    href: "https://notability.com", // Replace with your affiliate link
  },
  "time-management-students": {
    title: "Todoist",
    description: "Organize your tasks, set deadlines, and never miss an assignment. The trusted productivity app for millions of students.",
    href: "https://todoist.com", // Replace with your affiliate link
  },
  "memorization-techniques": {
    title: "Quizlet",
    description: "Create flashcards, play learning games, and study with millions of existing study sets. Perfect for memorizing vocabulary and concepts.",
    href: "https://quizlet.com", // Replace with your affiliate link
  },
};
