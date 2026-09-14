import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  schema?: Record<string, any> | Array<Record<string, any>>;
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
  schema,
  jsonLd,
}) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const finalCanonical = canonical || currentUrl;
  const structuredData = jsonLd || schema;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {finalCanonical && <link rel="canonical" href={finalCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:url" content={ogUrl || finalCanonical} />
      <meta property="og:type" content="website" />

      {/* Schema.org Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
