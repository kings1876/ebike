export type ProductCategory = string;

export type ProductBadge = 'Popular' | 'New' | 'Best Value' | 'Premium' | 'Sale';

export interface ProductVariant {
  id: string;
  title: string;
  /** One value per entry in Product.options, in the same order. */
  options: string[];
  price: number;
  compareAtPrice?: number;
  available: boolean;
  image?: string;
}

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
  /** Bike-specific specs. Omitted for batteries, parts and accessories (use `details`). */
  specs?: {
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
  /** Generic label/value spec rows for non-bike products. */
  details?: Record<string, string>;
  options?: { name: string; values: string[] }[];
  variants?: ProductVariant[];
  inStock: boolean;
  brand?: string;
  /** Filterable attributes for bikes (not set for parts and accessories). */
  attributes?: {
    frame?: string;
    tyres?: string;
    suspension?: string;
    lightweight?: boolean;
    uses?: string[];
  };
  warranty?: string;
  imageUrl: string;
  /** Photo of the variant the page opens on, when it differs from imageUrl (used for the early LCP image). */
  heroImage?: string;
  /** All product photos (first is imageUrl). Present only when there is more than one. */
  images?: string[];
  accentColor?: string;
}

export interface CartItem {
  /** Unique per product + variant, so two sizes of one bike are separate lines. */
  lineId: string;
  variantId?: string;
  variantTitle?: string;
  /** Product with price/image/stock overridden by the chosen variant. */
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
  /** Last update date, shown on the post and used for dateModified. */
  updated?: string;
  /** Product whose photo is used as the hero and social image. */
  heroProductId?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Orders & Shipping' | 'Payment & Discounts' | 'Bike Specs & Laws' | 'Warranty & Service';
}
