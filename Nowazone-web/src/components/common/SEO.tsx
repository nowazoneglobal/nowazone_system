import React from 'react';
import { Helmet } from 'react-helmet-async';
import { jsonLdByPath } from '../../seo/jsonLd';

const SITE = 'https://www.nowazone.com';
const DEFAULT_OG_IMAGE = `${SITE}/assets/favicon.png`;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  robots?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

function toAbsolute(url?: string): string {
  if (!url) return SITE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SITE}${url.startsWith('/') ? url : `/${url}`}`;
}

function pathKey(absoluteUrl: string): string {
  try {
    const u = new URL(absoluteUrl);
    const path = u.pathname.replace(/\/$/, '') || '/';
    return path === '' ? '/' : path;
  } catch {
    return '/';
  }
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  robots = 'index, follow',
  schema,
  jsonLd,
}) => {
  const finalCanonical = toAbsolute(canonical);
  const finalOgUrl = toAbsolute(ogUrl || canonical);
  const structuredData =
    jsonLd || schema || jsonLdByPath[pathKey(finalCanonical)];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={finalCanonical} />

      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={finalOgUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage || DEFAULT_OG_IMAGE} />
      <meta property="og:site_name" content="Nowazone" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || DEFAULT_OG_IMAGE} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
