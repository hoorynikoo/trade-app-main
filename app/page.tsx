"use client";

import { useEffect, useState } from "react";
import { getPrice } from "@/utils/api";
import PairCard from "@/components/PriceCard";
import { Trash2 } from "lucide-react";

const symbols = ["BTCUSDT", "ETHUSDT", "DOGEUSDT"];

export default function Home() {
  const [prices, setPrices] = useState<{ [key: string]: string }>({});
  const [watchList, setWatchList] = useState<string[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const allPrices: any = {};
      for (const sym of symbols) {
        const data = await getPrice(sym);
        allPrices[sym] = data.price;
      }
      setPrices(allPrices);
    };

    fetchPrices();

    const stored = localStorage.getItem("watchlist");
    if (stored) setWatchList(JSON.parse(stored));
  }, []);

  const handleAddToWatch = (symbol: string) => {
    const newList = [...new Set([...watchList, symbol])];
    setWatchList(newList);
    localStorage.setItem("watchlist", JSON.stringify(newList));
  };

  const handleRemove = (symbol: string) => {
    const newList = watchList.filter((s) => s !== symbol);
    setWatchList(newList);
    localStorage.setItem("watchlist", JSON.stringify(newList));
  };

  return (
    <div className="p-6 text-white min-h-screen bg-[#050319]">
      <h1 className="text-3xl font-bold mb-6 text-violet-400">Market</h1>

      <div className="grid gap-4">
        {symbols.map((sym) => (
          <PairCard
            key={sym}
            symbol={sym}
            price={prices[sym] || "..."}
            onAdd={handleAddToWatch}
            disabled={watchList.includes(sym)}
          />
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-yellow-400">
        Watch List
      </h2>

      {watchList.length === 0 ? (
        <p className="text-gray-400 italic">Nothing in watchlist</p>
      ) : (
        <div className="grid gap-3">
          {watchList.map((sym) => (
            <div
              key={sym}
              className="flex justify-between items-center bg-[#0b0c1a] border border-[#2d2d3a] p-4 rounded-xl transition-all duration-300 hover:shadow-[0_4px_20px_rgba(255,255,255,0.1)] hover:scale-[1.01]"
            >
              <span className="font-medium text-lg">{sym}</span>
              <button
                onClick={() => handleRemove(sym)}
                className="text-white hover:text-gray-200 transition"
                aria-label="Remove"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
