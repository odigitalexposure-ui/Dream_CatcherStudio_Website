import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.dreamcatcherstudio.co.in';

const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0',
    title: 'DREAMCATCHER Studio | Best Wedding Photographer in Kolkata, Rajpur & Sonarpur'
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'About DREAMCATCHER Studio | Top Photographer in Rajpur & Sonarpur Kolkata'
  },
  {
    url: '/gallery',
    changefreq: 'weekly',
    priority: '0.9',
    title: 'Portfolio Showcase | Wedding, Pre-Wedding, Corporate & Product Photography'
  },
  {
    url: '/services',
    changefreq: 'monthly',
    priority: '0.8',
    title: 'Services | Video Editing Service in Kolkata, Pre-Wedding Shoots & Corporate Events'
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.7',
    title: 'Contact DREAMCATCHER Studio | Book Videography Studio Near Me in Rajpur Sonarpur'
  }
];

function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const sitemapPath = path.resolve('public/sitemap.xml');
  fs.writeFileSync(sitemapPath, xmlContent.trim(), 'utf8');
  console.log(`[SEO] Sitemap successfully generated at: ${sitemapPath}`);
}

generateSitemap();
