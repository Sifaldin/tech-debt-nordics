/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // www, matching the apex -> www redirect the host performs and the canonical
  // URLs emitted from src/app/layout.tsx. These three must never disagree.
  siteUrl: 'https://www.techdebtnordics.se',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [],
  // a small marketing site does not change daily; claiming otherwise just
  // burns crawl budget
  changefreq: 'monthly',
  autoLastmod: true,
};
