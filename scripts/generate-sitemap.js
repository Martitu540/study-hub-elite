/**
 * Sitemap Generator Script
 * Automatically generates sitemap.xml from routes and articles data
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://study-hub-elite.pages.dev';

// Static routes with their priorities and change frequencies
const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/tools/pomodoro-timer', priority: '0.9', changefreq: 'monthly' },
  { path: '/tools/study-plan-generator', priority: '0.9', changefreq: 'monthly' },
  { path: '/tools/gpa-calculator', priority: '0.9', changefreq: 'monthly' },
  { path: '/tools/flashcard-maker', priority: '0.9', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
];

// Extract article slugs from articles.ts
function extractArticleSlugs() {
  const articlesPath = path.resolve(__dirname, '../src/data/articles.ts');
  const content = fs.readFileSync(articlesPath, 'utf-8');
  
  // Match all slug: "..." patterns
  const slugRegex = /slug:\s*["']([^"']+)["']/g;
  const slugs = [];
  let match;
  
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  
  return slugs;
}

// Generate XML for a single URL entry
function generateUrlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

// Generate the complete sitemap
function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  const urls = [];
  
  // Add static routes
  for (const route of staticRoutes) {
    urls.push(generateUrlEntry(
      `${SITE_URL}${route.path}`,
      today,
      route.changefreq,
      route.priority
    ));
  }
  
  // Add article routes
  const articleSlugs = extractArticleSlugs();
  for (const slug of articleSlugs) {
    urls.push(generateUrlEntry(
      `${SITE_URL}/article/${slug}`,
      today,
      'monthly',
      '0.8'
    ));
  }
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;
  
  return sitemap;
}

// Write sitemap to public directory
function writeSitemap() {
  const sitemap = generateSitemap();
  const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
  const mapPath = path.resolve(__dirname, '../public/map.xml');
  
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  fs.writeFileSync(mapPath, sitemap, 'utf-8');
  
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   - ${outputPath}`);
  console.log(`   - ${mapPath}`);
}

writeSitemap();
