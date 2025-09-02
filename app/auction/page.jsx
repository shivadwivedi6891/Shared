
import React, { Suspense } from "react";
import AuctionList from "./AuctionList";
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

export default function AuctionPage() {
  return (
   
      <AuctionList/>

  );
}