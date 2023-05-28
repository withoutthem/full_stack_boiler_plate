export interface Product {
  brand: string;
  description: string;
  furnitureType: string;
  id: string;
  imageuri: string;
  likes: number;
  name: string;
  price: number;
  shortDescription: string;
  theme: string;
}

export interface Cart {
  Product: Product;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  isChecked: boolean;
  productId: string;
  updatedAt: string;
  userId: string;
}