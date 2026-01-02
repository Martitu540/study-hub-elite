# StudyFlow Article Schema

Use this schema to generate SEO-optimized articles for StudyFlow. Each article should target long-tail keywords that students search for.

---

## Existing Articles (DO NOT DUPLICATE)

| # | Slug | Title | Category |
|---|------|-------|----------|
| 1 | `how-to-study-effectively-for-exams` | How to Study Effectively for Exams (Science-Backed Methods) | Study Tips |
| 2 | `pomodoro-technique-explained-for-students` | Pomodoro Technique Explained for Students (With Examples) | Study Tips |
| 3 | `daily-study-routine-that-works` | How to Build a Daily Study Routine That Actually Works | Study Skills |
| 4 | `pomodoro-technique-guide` | The Pomodoro Technique: A Complete Guide to Focused Studying | Study Tips |
| 5 | `effective-study-notes` | How to Create Effective Study Notes That Actually Work | Study Tips |
| 6 | `active-recall-spaced-repetition` | Understanding Active Recall and Spaced Repetition | Learning Science |
| 7 | `finals-study-plan` | Preparing for Finals: Your 4-Week Study Plan | Exam Prep |
| 8 | `managing-test-anxiety` | Managing Test Anxiety: Practical Strategies That Work | Wellness |
| 9 | `student-productivity-apps` | Best Apps and Tools for Student Productivity in 2024 | Resources |

**Total: 9 articles**

---

## TypeScript Interface

```typescript
export interface ArticleData {
  slug: string;                    // URL slug (lowercase, hyphenated)
  title: string;                   // SEO title (50-60 chars ideal)
  excerpt: string;                 // Meta description (150-160 chars)
  category: string;                // "Study Tips" | "Study Skills" | "Exam Prep" | "Productivity"
  readTime: string;                // e.g., "7 min read"
  publishDate: string;             // YYYY-MM-DD format
  relatedTools: string[];          // Tool slugs: "pomodoro-timer" | "study-plan-generator" | "gpa-calculator" | "flashcard-maker"
  relatedArticles: string[];       // Other article slugs
  content: {
    intro: string;                 // 2-3 sentences hook + what they'll learn
    sections: {
      heading: string;             // H2 heading (include keyword if natural)
      content: string;             // 2-4 sentences explaining the concept
      listItems?: string[];        // Optional bullet points (3-6 items)
    }[];
    conclusion: string;            // Summary + call to action
    faq?: {                        // Optional FAQ for featured snippets
      question: string;
      answer: string;
    }[];
  };
}
```

## Example Article (Copy This Format)

```typescript
{
  slug: "how-to-study-for-finals-in-one-week",
  title: "How to Study for Finals in One Week (Emergency Study Plan)",
  excerpt: "Running out of time before finals? Learn a proven 7-day study plan with daily schedules, prioritization strategies, and focus techniques to maximize your exam scores.",
  category: "Exam Prep",
  readTime: "8 min read",
  publishDate: "2025-01-15",
  relatedTools: ["study-plan-generator", "pomodoro-timer", "flashcard-maker"],
  relatedArticles: ["how-to-study-effectively-for-exams", "pomodoro-technique-explained-for-students"],
  content: {
    intro: "Finals week is approaching and you've just realized you have only 7 days to prepare. Don't panic. While starting earlier is always better, you can still achieve solid results with a strategic, focused approach. This guide will show you exactly how to structure your last week before exams to maximize retention and minimize stress.",
    sections: [
      {
        heading: "Day 1-2: Assess and Prioritize Your Subjects",
        content: "Start by listing all your exams and their dates. Identify which subjects need the most attention based on difficulty and your current understanding. Don't spend equal time on everything – focus on high-impact areas.",
        listItems: [
          "List all exams with dates and times",
          "Rate your confidence in each subject (1-10)",
          "Identify topics worth the most points",
          "Allocate more time to difficult subjects",
          "Gather all study materials in one place"
        ]
      },
      {
        heading: "Day 3-4: Active Review and Practice Problems",
        content: "Passive reading won't cut it when time is short. Use active recall techniques like practice tests, flashcards, and teaching concepts aloud. Focus on understanding core concepts rather than memorizing details.",
        listItems: [
          "Complete practice exams under timed conditions",
          "Create flashcards for key terms and formulas",
          "Explain concepts aloud as if teaching someone",
          "Focus on frequently tested topics",
          "Review mistakes immediately after practice tests"
        ]
      },
      {
        heading: "Day 5-6: Fill Knowledge Gaps",
        content: "By now you should know your weak spots. Dedicate these days to strengthening areas where you struggled during practice. Use the Pomodoro Technique to maintain focus during intensive study sessions.",
        listItems: [
          "Target specific topics you got wrong",
          "Watch short explanation videos for tough concepts",
          "Study in 25-minute focused blocks",
          "Take proper breaks to avoid burnout",
          "Get at least 7 hours of sleep each night"
        ]
      },
      {
        heading: "Day 7: Light Review and Rest",
        content: "The day before your first exam should be about consolidation, not cramming. Do a light review of your notes and flashcards, but prioritize sleep and relaxation. Your brain needs rest to perform well."
      }
    ],
    conclusion: "Studying for finals in one week is challenging but not impossible. The key is strategic prioritization, active learning techniques, and protecting your sleep. Use tools like the Pomodoro Timer for focused sessions and the Study Plan Generator to organize your remaining days. Remember, consistency beats intensity – steady progress over 7 days will serve you better than an all-nighter.",
    faq: [
      {
        question: "Is it possible to study for finals in just one week?",
        answer: "Yes, while not ideal, you can still achieve good results by prioritizing high-value topics, using active recall techniques, and maintaining a consistent study schedule throughout the week."
      },
      {
        question: "Should I pull an all-nighter before finals?",
        answer: "No, sleep is essential for memory consolidation. Studies show that students who sleep before exams perform better than those who stay up all night cramming."
      },
      {
        question: "How many hours should I study per day during finals week?",
        answer: "Aim for 6-8 hours of focused study broken into blocks with regular breaks. Quality matters more than quantity – use active learning methods rather than passive reading."
      }
    ]
  }
}
```

## Long-Tail Keywords to Target

Generate articles for these high-intent search queries:

### Exam Prep
- "how to study for finals in one week"
- "best way to study for multiple exams"
- "how to pass an exam you didn't study for"
- "study schedule for finals week"
- "how to memorize fast for exams"
- "cramming vs spaced repetition"

### Study Techniques
- "active recall study method explained"
- "how to take notes that actually help"
- "cornell note taking method for students"
- "how to study math effectively"
- "how to study biology for exams"
- "visual learning study techniques"

### Productivity
- "how to stop procrastinating on homework"
- "best study schedule for college students"
- "how to focus while studying at home"
- "morning vs night studying which is better"
- "how to stay motivated to study"

### Tools & Methods
- "pomodoro technique for studying"
- "spaced repetition for medical students"
- "how to make effective flashcards"
- "digital vs paper notes for studying"
- "best apps for student productivity"

### Specific Subjects
- "how to study for chemistry exams"
- "memorizing history dates and events"
- "learning a language while in school"
- "how to study for open book exams"
- "preparing for essay exams"

## SEO Guidelines

1. **Title**: Include primary keyword near the beginning, keep under 60 characters
2. **Excerpt**: Natural keyword inclusion, compelling hook, under 160 characters
3. **Headings**: Use question-based or how-to headings when possible
4. **Content**: Answer the search intent directly, provide actionable steps
5. **FAQ**: Target "People Also Ask" questions for featured snippets
6. **Internal Links**: Reference related tools and articles

## How to Add New Articles

1. Copy the example format above
2. Add your new article object to the `articles` array in `src/data/articles.ts`
3. Make sure the slug is unique
4. Update `relatedArticles` in existing articles to link to new content

## File Location

Add articles to: `src/data/articles.ts`

Export format:
```typescript
export const articles: ArticleData[] = [
  // existing articles...
  // add new article here
];
```
