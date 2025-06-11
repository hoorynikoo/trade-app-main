"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getRecentTrades } from "@/utils/api";
import TradeTable from "@/components/TradeTable";
import ChartModal from "@/components/ChartModal";
import { ArrowLeft } from "lucide-react";

export default function TradePage() {
  const router = useRouter();
  const params = useParams();
  const symbol = params?.symbol;

  const [trades, setTrades] = useState<any[]>([]);
  const [selectedTradeIndex, setSelectedTradeIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!symbol) return;

    const fetchTrades = async () => {
      const data = await getRecentTrades(symbol);
      setTrades(data);
    };

    fetchTrades();

    const intervalId = setInterval(() => {
      fetchTrades();
    }, 120000);
    return () => clearInterval(intervalId);
  }, [symbol]);

  const chartData = trades.map((trade) => ({
    time: new Date(trade.time).toLocaleTimeString(),
    price: Number(trade.price),
  }));

  return (
    <div className="p-6 min-h-screen bg-[#050319] text-white">
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="hover:text-gray-300 transition"
          aria-label="return"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-violet-400">
          Trades for {symbol}
        </h1>
      </div>

      {trades.length === 0 ? (
        <p className="text-gray-400 mt-10">No trades found.</p>
      ) : (
        <TradeTable trades={trades} onChartClick={setSelectedTradeIndex} />
      )}

      {selectedTradeIndex !== null && (
        <ChartModal
          data={chartData}
          onClose={() => setSelectedTradeIndex(null)}
        />
      )}
    </div>
  );
}
