export interface Sweet {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
}

export type SearchCriteria = {
  name?: string;
  category?: string;
  priceRange?: { min?: number; max?: number };
};

export type PurchaseResult = {
  success: boolean;
  message: string;
}; 