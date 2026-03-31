// ---- Product ----
export type ProductCategory =
  | 'rosary'
  | 'bracelet'
  | 'komboskini'
  | 'macrame'
  | 'keychain'
  | 'return-gift';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  imageUrl: string;
  tags: string[];
  isFeatured: boolean;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

// ---- Customization ----
export type BeadMaterial = 'glass' | 'crystal' | 'wood' | 'pearl' | 'macrame';
export type CrossStyle   = 'silver-cross' | 'gold-cross' | 'wooden-cross' | 'medal' | 'none';
export type RosaryType   = 'classic-rosary' | 'bracelet' | 'komboskini' | 'keychain';

export interface BeadColor {
  id: string;
  name: string;
  hex: string;
}

export interface CustomizationConfig {
  type: RosaryType;
  material: BeadMaterial;
  color: BeadColor;
  crossStyle: CrossStyle;
  notes: string;
}

// ---- API response wrapper ----
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
