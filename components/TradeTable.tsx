import { BarChart2 } from "lucide-react";

interface Trade {
  id: string;
  price: number;
  qty: number;
  time: number;
}

interface TradeTableProps {
  trades: Trade[];
  onChartClick: (index: number) => void;
}

export default function TradeTable({ trades, onChartClick }: TradeTableProps) {
  return (
    <div className="overflow-x-auto border border-[#2d2d3a] rounded-xl shadow-md">
      <table className="w-full text-sm text-left">
        <thead className="bg-[#0b0c1a] text-gray-400 uppercase text-xs border-b border-[#2d2d3a]">
          <tr>
            <th className="px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="text-green-400">Price</span>
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="text-blue-400">Quantity</span>
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">Time</span>
              </div>
            </th>
            <th className="px-4 py-3 text-center">
              <BarChart2 size={14} />
            </th>
          </tr>
        </thead>

        <tbody>
          {trades.map((trade, index) => (
            <tr
              key={trade.id}
              className="hover:bg-[#1a1b2d] transition-colors duration-200 border-b border-[#2d2d3a]"
            >
              <td className="px-4 py-3 text-green-400 font-medium">
                {trade.price}
              </td>
              <td className="px-4 py-3 text-blue-400">{trade.qty}</td>
              <td className="px-4 py-3 text-yellow-400">
                {new Date(trade.time).toLocaleTimeString()}
              </td>
              <td className="px-4 py-3 text-justify">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChartClick(index);
                  }}
                  className="text-gray-400 hover:text-violet-400 transition"
                  aria-label="Show chart"
                >
                  <BarChart2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
