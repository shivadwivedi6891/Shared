"use client";
import Head from "next/head";

export default function SEO({ title, description, url, image }) {
  const siteName = "AutoBid";
  const defaultImage = image || "/default-og.png";

  return (
    <Head>
      {/* Basic */}
      <title>{title ? `${title} | ${siteName}` : siteName}</title>
      <meta name="description" content={description || "AutoBid vehicle auctions"} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || siteName} />
      <meta property="og:description" content={description || "Browse and bid on vehicles"} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || siteName} />
      <meta name="twitter:description" content={description || "Join live vehicle auctions"} />
      <meta name="twitter:image" content={defaultImage} />
    </Head>
  );
}
