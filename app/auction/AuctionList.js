// app/auction/page.jsx
import AuctionListClient from "./AuctionListClient";
import { getAuctionList } from "@/services/AuctionServices/AuctionApiFunction";

export const metadata = {
  title: "Live Car Auctions | AutoBid",
  description: "Browse and participate in live car and vehicle auctions. Place your bids easily and track results.",
  keywords: ["car auction", "live bidding", "AutoBid", "vehicle auctions"],
  openGraph: {
    title: "Live Car Auctions | AutoBid",
    description: "Join AutoBid to explore live vehicle auctions and place your bids in real-time.",
    url: "https://yourdomain.com/auction",
    siteName: "AutoBid",
    images: [
      {
        url: "https://yourdomain.com/og-auction.jpg",
        width: 1200,
        height: 630,
        alt: "Live Car Auction",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

// --- Server Component (SSR) ---
export default async function AuctionList() {
  let auctions = [];
  let totalPages = 1;
  let structuredData = null;
  try {
    const payload = {
      start: 0,
      number: 10,
      state: "",
      brand: "",
      category: "",
    };
    const res = await getAuctionList(payload);
    if (res?.data?.success) {
      auctions = res.data.data.result.items || [];
      totalPages = res.data.data.result.numberOfPages || 1;
      structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "itemListElement": auctions.map((auction, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "url": `/auction/${auction.id}`,
          "name": auction.name,
          "description": auction.description
        }))
      };
    }
  } catch (error) {
    auctions = [];
    totalPages = 1;
    structuredData = null;
  }
  return <>
    {/* SEO Structured Data for Auctions */}
    {structuredData && (
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(structuredData)}
      </script>
    )}
    <AuctionListClient initialAuctions={auctions} initialTotalPages={totalPages} />
  </>;
}
