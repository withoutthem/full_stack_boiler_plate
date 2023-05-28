export interface ProductInterface {
  id: string;
  imageuri: string;
  name: string;
  brand: string;
  shortDescription: string;
  description: string;
  furnitureType: string;
  theme: string;
  price: number;
  likes: number;
  Collections?:any;
}