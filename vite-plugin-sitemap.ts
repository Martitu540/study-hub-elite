/**
 * Vite Plugin to generate sitemap during build
 */

import { execSync } from 'child_process';
import type { Plugin } from 'vite';

export function sitemapPlugin(): Plugin {
  return {
    name: 'vite-plugin-sitemap',
    buildStart() {
      try {
        console.log('🗺️  Generating sitemap...');
        execSync('node scripts/generate-sitemap.js', { stdio: 'inherit' });
      } catch (error) {
        console.error('Failed to generate sitemap:', error);
      }
    },
  };
}
