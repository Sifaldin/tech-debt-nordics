// Single source of truth for the canonical origin.
//
// It must match the host the server actually serves: the apex 308-redirects to
// www, so anything emitting non-www (canonical, og:url, JSON-LD @id, sitemap)
// would point search engines at a URL that immediately redirects.
//
// next-sitemap.config.js carries the same value and cannot import this file
// (it is CommonJS, loaded outside the bundle). If you change this, change that
// too.
export const SITE_URL = 'https://www.techdebtnordics.se';
