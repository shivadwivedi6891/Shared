"use client";
import React, { Suspense } from 'react';
import AuctionList from './AuctionList';

export default function AuctionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuctionList />
    </Suspense>
  );
}