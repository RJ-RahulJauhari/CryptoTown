import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Currency",
  description: "Crypto Currency App: Track Currency and make Money!!!",
};

// Sample data, replace with actual state or props
const watchListCoins = [
  { name: "Bitcoin" },
  { name: "Ethereum" },
  { name: "Cardano" },
];

const recentlyVisitedCoins = [
  { name: "Dogecoin" },
  { name: "Solana" },
  { name: "Polkadot" },
];

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col h-screen bg-gray-50`}>
          <Navbar />
          <div className="flex flex-1">
            <main className="flex-1 p-4">{children}</main>
            <Sidebar watchListCoins={watchListCoins} recentlyVisitedCoins={recentlyVisitedCoins} />
          </div>

      </body>
    </html>
  );
}
