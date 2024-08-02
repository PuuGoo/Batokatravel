export interface Catelogy {
  id: number;
  name: string;
  image: string;
  storage: number;
  isFeatured: boolean;
}

export interface Product {
  id: number;
  price: number;
  price_sale: number;
  name: string;
  location: string;
  time: number;
  images: string;
  rate_sale: number;
  isSale: boolean;
  isFeatured: boolean;
  isPopular: boolean;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
}

export interface Order {
  id: number;
  idProd: Product;
  quantity: number;
}

export interface Voucher {
  id: number,
  name: string,
  value: number
}