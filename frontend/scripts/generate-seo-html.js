#!/usr/bin/env node
/* eslint-disable no-console */
// Generates per-route HTML files with route-specific title / meta / OG tags.
// Runs as postbuild. Reads build/index.html as the template, substitutes the
// SEO-relevant tags, and writes build/<route>/index.html for each entry.
//
// nginx's `try_files $uri $uri/ /index.html` will then serve the route-specific
// HTML when crawlers (Google, Bing, social bots) hit a deep URL, so they see
// real SEO data without needing to execute JavaScript.

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const TEMPLATE = path.join(BUILD_DIR, 'index.html');
const SITE = 'https://softeefi.co.uk';
const DEFAULT_OG = `${SITE}/images/softeefi-og.jpg`;

const routes = [
  {
    path: '/process',
    title: 'Our Process — How Softeefi Builds Your Project | Softeefi',
    description: 'See how Softeefi turns ideas into shipped products: discovery, design, build, launch, and support. Transparent process for SMBs in Kent and across the UK.',
  },
  {
    path: '/contact',
    title: 'Contact Softeefi — Web Development & AI Agency in Kent, UK',
    description: 'Get in touch with Softeefi for web development, AI integration, cloud infrastructure, and digital marketing services. Based in Kent, serving the UK and beyond.',
  },
  {
    path: '/faq',
    title: 'FAQ — Common Questions About Web Development & AI Projects | Softeefi',
    description: 'Answers to common questions about timelines, pricing, technology choices, and ongoing support for Softeefi web, AI, cloud, and marketing projects.',
  },
  {
    path: '/free-learning',
    title: 'Free Learning Resources — Web, AI & Marketing Guides | Softeefi',
    description: 'Free guides and reports on web development, AI integration, SEO, and digital marketing — practical knowledge for UK SMB owners and operators.',
  },
  {
    path: '/services/websites-and-apps',
    title: 'Custom Website & Web App Development | Softeefi Kent, UK',
    description: 'Custom websites and web applications built with React, Node.js, and modern cloud stacks. Softeefi delivers fast, secure, scalable web products for UK SMBs.',
  },
  {
    path: '/services/ai-solutions',
    title: 'AI Solutions & Integration Services | Softeefi UK',
    description: 'AI chatbots, RAG systems, LLM integrations, workflow automation, and custom AI tooling for UK SMBs. Powered by GPT, Claude, and Gemini APIs.',
  },
  {
    path: '/services/saas-development',
    title: 'SaaS Development Services — Build Your Software Business | Softeefi',
    description: 'End-to-end SaaS development: multi-tenant architecture, billing, auth, dashboards, and growth-ready infrastructure. Softeefi helps UK founders ship.',
  },
  {
    path: '/services/ui-ux-design',
    title: 'UI/UX Design Services — Conversion-Focused Product Design | Softeefi',
    description: 'User-centred UI/UX design that drives signups, retention, and revenue. Wireframes, prototypes, and design systems for web and mobile products.',
  },
  {
    path: '/services/cloud-infrastructure',
    title: 'Cloud Infrastructure & DevOps Services | Softeefi UK',
    description: 'AWS, Cloudflare, and DigitalOcean infrastructure: scalable architecture, CI/CD pipelines, observability, and 24/7 reliability for production workloads.',
  },
  {
    path: '/services/digital-marketing-seo',
    title: 'Digital Marketing & SEO Services in Kent | Softeefi',
    description: 'SEO, content marketing, paid ads, and analytics-driven growth for SMBs in Kent and the UK. Softeefi turns websites into measurable revenue.',
  },
  {
    path: '/services/graphic-design',
    title: 'Graphic Design & Brand Identity | Softeefi UK',
    description: 'Logos, brand systems, marketing collateral, and visual design that elevates UK SMBs. Modern, distinctive, conversion-focused work from Softeefi.',
  },
  {
    path: '/services/digital-art-nfts',
    title: 'Digital Art & NFT Design | Softeefi',
    description: 'Custom digital art, character design, and NFT collections. Softeefi builds visually compelling assets for creators, brands, and Web3 projects.',
  },
  {
    path: '/projects/cloud-infrastructure',
    title: 'Cloud Infrastructure Projects — Case Studies | Softeefi',
    description: 'See how Softeefi has built and operated production-grade cloud infrastructure for UK businesses: AWS, Cloudflare, DigitalOcean, CI/CD, and observability.',
  },
  {
    path: '/projects/digital-marketing',
    title: 'Digital Marketing Case Studies | Softeefi',
    description: 'Real digital marketing wins from Softeefi: SEO-driven traffic growth, paid ad campaigns, and content strategies that delivered measurable revenue.',
  },
  {
    path: '/projects/saas',
    title: 'SaaS Project Case Studies | Softeefi',
    description: 'Production SaaS products built by Softeefi: multi-tenant architecture, billing, auth, and the design choices behind shipping software businesses.',
  },
  {
    path: '/blog',
    title: 'Softeefi Blog — Web Development, AI, and SaaS Insights',
    description: 'Insights on web development, AI integration, SaaS architecture, and digital marketing from the Softeefi team. Practical writing for UK SMB operators.',
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Softeefi',
    description: 'Softeefi terms of service — the legal terms governing your use of softeefi.co.uk and the services we provide.',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Softeefi',
    description: 'How Softeefi collects, uses, and protects your personal data when you use softeefi.co.uk or work with us on a project.',
  },
  {
    path: '/cookie-policy',
    title: 'Cookie Policy | Softeefi',
    description: 'How softeefi.co.uk uses cookies and similar technologies — what we set, why, and how you can opt out.',
  },
];

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function transformHtml(template, route) {
  const canonical = `${SITE}${route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG;
  let html = template;

  html = html.replace(
    /<title>[^<]*<\/title>/i,
    `<title>${escapeAttr(route.title)}</title>`
  );
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(route.description)}"/>`
  );
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(canonical)}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(route.title)}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(route.description)}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(canonical)}"/>`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeAttr(ogImage)}"/>`
  );
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}"/>`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}"/>`
  );
  html = html.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeAttr(ogImage)}"/>`
  );

  return html;
}

function main() {
  if (!fs.existsSync(TEMPLATE)) {
    console.warn(`[generate-seo-html] ${TEMPLATE} not found, skipping`);
    return;
  }

  const template = fs.readFileSync(TEMPLATE, 'utf8');
  let count = 0;

  for (const route of routes) {
    const outDir = path.join(BUILD_DIR, route.path.replace(/^\//, ''));
    fs.mkdirSync(outDir, { recursive: true });
    const outFile = path.join(outDir, 'index.html');
    const html = transformHtml(template, route);
    fs.writeFileSync(outFile, html);
    count++;
  }

  console.log(`[generate-seo-html] Wrote ${count} per-route SEO HTML files.`);
}

try {
  main();
} catch (err) {
  console.warn('[generate-seo-html] Skipping due to error:', err.message);
}
