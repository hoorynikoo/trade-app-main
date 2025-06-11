"use client";

import Link from "next/link";

type Props = {
  symbol: string;
  price: string;
  onAdd: (symbol: string) => void;
  disabled?: boolean;
};

export default function PairCard({ disabled, symbol, price, onAdd }: Props) {
  return (
    <div className="bg-[#0b0c1a] border border-[#2d2d3a] rounded-xl p-4 flex justify-between items-center transition-all duration-300 hover:shadow-[0_4px_20px_rgba(144,202,249,0.2)] hover:scale-[1.02] hover:border-violet-500">
      <div>
        <h2 className="text-lg font-semibold text-white">{symbol}</h2>
        <p className="text-sm text-gray-400">
          {price} <span className="text-xs text-gray-500">USDT</span>
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAdd(symbol)}
          disabled={disabled}
          className={`px-4 py-2 rounded-md transition ${
            disabled
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-violet-500 hover:bg-violet-600"
          } text-white`}
        >
          {disabled ? "Added" : "+ Add"}
        </button>
        <Link href={`/trade/${symbol}`}>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-[#050319] text-sm px-4 py-2 rounded-lg transition">
            Trade
          </button>
        </Link>
      </div>
    </div>
  );
}
