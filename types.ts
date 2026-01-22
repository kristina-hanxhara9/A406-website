export interface Product {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  features: string[];
  image: string;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum ServiceType {
  WINDOWS = 'Windows & Glazing',
  DOORS = 'Doors & Security'
}