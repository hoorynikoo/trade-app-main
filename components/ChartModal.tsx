import { X } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface ChartModalProps {
  data: { time: string; price: number }[];
  onClose: () => void;
}

export default function ChartModal({ data, onClose }: ChartModalProps) {
  return (
    <div className="fixed inset-0 bg-[#00000045] backdrop-blur-md bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="border border-gray-500 bg-[#0b0c1a] rounded-lg p-6 w-full max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-violet-400">Price Chart</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="time" stroke="#8884d8" />
            <YAxis domain={["auto", "auto"]} stroke="#8884d8" />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
