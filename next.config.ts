import type { NextConfig } from 'next';

const securityHeaders = [
  {
    /* Prevent clickjacking — only allow this site to frame itself */
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    /* Stop browsers from MIME-sniffing the content type */
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    /* Control how much referrer info is sent with requests */
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    /* Enforce HTTPS for 1 year */
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    /* Opt out of FLoC / Topics API tracking */
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    /* Block XSS in older browsers that don't support CSP */
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

const nextConfig: NextConfig = {
  headers: async () => [
    {
      /* Apply to all routes */
      source: '/(.*)',
      headers: securityHeaders,
    },
  ],

  /* Restrict external image domains — add real CDN when ready */
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
