export type ProductCategory = 
  | 'Electric Mountain Bikes'
  | 'Electric Commuter Bikes'
  | 'Folding Electric Bikes'
  | 'Second Hand & Refurbished';

export type ProductBadge = 'Popular' | 'New' | 'Best Value' | 'Premium' | 'Sale';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  subcategory: string;
  price: number;
  originalPrice?: number;
  badge?: ProductBadge;
  description: string;
  keyFeatures: string[];
  specs: {
    motor: string;
    battery: string;
    range: string;
    topSpeed: string;
    brakes: string;
    gears: string;
    weight: string;
    maxLoad: string;
    frame: string;
  };
  inStock: boolean;
  warranty: string;
  imageUrl: string;
  accentColor?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export type PaymentMethod = 'Crypto' | 'Australian Bank Transfer' | 'Osko';

export interface OrderFormData {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postcode: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  discountCode?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  productName: string;
  verifiedBuyer: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  readTime: string;
  category: string;
  excerpt: string;
  content: string[];
  author: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Orders & Shipping' | 'Payment & Discounts' | 'Bike Specs & Laws' | 'Warranty & Service';
}
