import axios from 'axios';

const BASE_URL = 'https://api.binance.com/api/v3';

export const getPrice = async (symbol: string) => {
  const res = await axios.get(`${BASE_URL}/ticker/price?symbol=${symbol}`);
  return res.data;
};

export const getRecentTrades = async (symbol: string) => {
  const res = await axios.get(`${BASE_URL}/trades?symbol=${symbol}&limit=20`);
  return res.data;
};
