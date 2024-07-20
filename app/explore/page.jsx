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
    <div className="flex justify-start lg:w-2/3 md:w-2/3 items-center">
      <Tabs defaultValue="cryptoList" className="w-full">
        <TabsList className="flex flex-wrap justify-center gap-2 mb-16"> {/* Adjusting for wrapping */}
          <TabsTrigger value="cryptoList" className="flex-1 text-center">Crypto List</TabsTrigger>
          <TabsTrigger value="recentlyVisited" className="flex-1 text-center">Recently Visited</TabsTrigger>
          <TabsTrigger value="watchList" className="flex-1 text-center">Watch List</TabsTrigger>
          <TabsTrigger value="gainerFeed" className="flex-1 text-center">Gainers Feed</TabsTrigger>
          <TabsTrigger value="losersFeed" className="flex-1 text-center">Losers Feed</TabsTrigger>
          <TabsTrigger value="newsFeed" className="flex-1 text-center">News Feed</TabsTrigger>
        </TabsList>
        <TabsContent value="cryptoList">
          <CryptoList />
        </TabsContent>
        <TabsContent value="recentlyVisited">
          <RecentlyVisited />
        </TabsContent>
        <TabsContent value="watchList">
          <WatchList />
        </TabsContent>
        <TabsContent value="gainerFeed">
          <GainersList />
        </TabsContent>
        <TabsContent value="losersFeed">
          <LosersList />
        </TabsContent>
        <TabsContent value="newsFeed">
          <CryptoNewsFeed />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExplorePage;
