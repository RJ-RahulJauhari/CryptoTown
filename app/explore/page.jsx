"use client"

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Adjust path as necessary
import CryptoNewsFeed from '@/components/CryptoNewsFeed'; // Adjust path as necessary
import CryptoList from '@/components/CryptoList'; // Adjust path as necessary
import RecentlyVisited from '@/components/RecentlyVisited'; // Adjust path as necessary
import WatchList from '@/components/WatchList'; // Adjust path as necessary
import GainersList from '@/components/GainerList';
import LosersList from '@/components/LosersList';

const ExplorePage = () => {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="cryptoList" className="w-full">
        <TabsList className="mb-4 flex justify-around">
        <TabsTrigger value="cryptoList">Crypto List</TabsTrigger>
        <TabsTrigger value="recentlyVisited">Recently Visited</TabsTrigger>
        <TabsTrigger value="watchList">Watch List</TabsTrigger>
        <TabsTrigger value="gainerFeed">Gainers Feed</TabsTrigger>
        <TabsTrigger value="losersFeed">Losers Feed</TabsTrigger>
        <TabsTrigger value="newsFeed">News Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="cryptoList">
          <CryptoList></CryptoList>
        </TabsContent>
        <TabsContent value="recentlyVisited">
          <RecentlyVisited></RecentlyVisited>
        </TabsContent>
        <TabsContent value="watchList">
          <WatchList></WatchList>
        </TabsContent>
        <TabsContent value="gainerFeed">
          <GainersList></GainersList>
        </TabsContent>
        <TabsContent value="losersFeed">
          <LosersList></LosersList>
        </TabsContent>
        <TabsContent value="newsFeed">
          <CryptoNewsFeed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorePage;
