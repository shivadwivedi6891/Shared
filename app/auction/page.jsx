
import React, { Suspense } from 'react';
import AuctionList from './AuctionList';

export const metadata = {
  title: "Live Auctions | YourSiteName",
  description: "Browse and bid on live vehicle auctions. Filter by state, brand, and category",
};



export default function AuctionPage() {
  return (
    <AuctionList/>
  );
}