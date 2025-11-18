// Mock Data - Dữ liệu giả để minh họa VueJS Reactivity

// Danh sách người dùng
export const users = [
  {
    id: 1,
    name: 'Nguyễn Văn Dũng',
    email: 'nguyenvandung@example.com',
    role: 'Trader'
  },
  {
    id: 2,
    name: 'Lê Minh',
    email: 'leminh@example.com',
    role: 'Investor'
  },
  {
    id: 3,
    name: 'Lưu Đức Hoa',
    email: 'luuduchoa@example.com',
    role: 'Analyst'
  }
];

// Danh sách cổ phiếu - minh họa data binding và reactivity
export const stocks = [
  {
    id: 1,
    code: 'VNM',
    name: 'Vinamilk',
    price: 78500,
    previousPrice: 77000,
    exchange: 'HOSE',
    favorite: false,
    volume: 1250000
  },
  {
    id: 2,
    code: 'VCB',
    name: 'Vietcombank',
    price: 92300,
    previousPrice: 93500,
    exchange: 'HOSE',
    favorite: true,
    volume: 2100000
  },
  {
    id: 3,
    code: 'HPG',
    name: 'Hòa Phát Group',
    price: 25400,
    previousPrice: 25400,
    exchange: 'HOSE',
    favorite: false,
    volume: 8500000
  },
  {
    id: 4,
    code: 'FPT',
    name: 'FPT Corporation',
    price: 125000,
    previousPrice: 122000,
    exchange: 'HOSE',
    favorite: true,
    volume: 950000
  },
  {
    id: 5,
    code: 'VHM',
    name: 'Vinhomes',
    price: 45200,
    previousPrice: 46800,
    exchange: 'HOSE',
    favorite: false,
    volume: 3200000
  },
  {
    id: 6,
    code: 'MSN',
    name: 'Masan Group',
    price: 68500,
    previousPrice: 67000,
    exchange: 'HOSE',
    favorite: false,
    volume: 1800000
  },
  {
    id: 7,
    code: 'VIC',
    name: 'Vingroup',
    price: 38900,
    previousPrice: 39500,
    exchange: 'HOSE',
    favorite: true,
    volume: 4500000
  },
  {
    id: 8,
    code: 'MWG',
    name: 'Mobile World',
    price: 55600,
    previousPrice: 54200,
    exchange: 'HOSE',
    favorite: false,
    volume: 2300000
  },
  {
    id: 9,
    code: 'ACB',
    name: 'Á Châu Bank',
    price: 28700,
    previousPrice: 29100,
    exchange: 'HOSE',
    favorite: false,
    volume: 5600000
  },
  {
    id: 10,
    code: 'TCB',
    name: 'Techcombank',
    price: 48300,
    previousPrice: 48300,
    exchange: 'HOSE',
    favorite: false,
    volume: 3100000
  }
];

// Helper function để simulate price change (có thể dùng cho demo reactivity)
export function simulatePriceChange(stock) {
  const changePercent = (Math.random() - 0.5) * 0.05; // +/- 2.5%
  const newPrice = Math.round(stock.price * (1 + changePercent) / 100) * 100;
  return {
    ...stock,
    previousPrice: stock.price,
    price: newPrice
  };
}
