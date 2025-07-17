import { Sweet, SearchCriteria, PurchaseResult } from '../models/Sweet';

class SweetShop {
  private sweets: Map<number, Sweet> = new Map();

  addSweet(sweet: Sweet) {
    if (this.sweets.has(sweet.id)) {
      throw new Error('A sweet with this ID already exists.');
    }
    if (sweet.price < 0 || sweet.stock < 0) {
      throw new Error('Price and stock must not be negative.');
    }
    this.sweets.set(sweet.id, sweet);
  }

  getAllSweets(): Sweet[] {
    return Array.from(this.sweets.values()).map(sweet => ({ ...sweet }));
  }

  deleteSweet(id: number): boolean {
    return this.sweets.delete(id);
  }

  searchSweets(criteria: SearchCriteria): Sweet[] {
    let filteredSweets = Array.from(this.sweets.values());

    if (criteria.name) {
      filteredSweets = filteredSweets.filter(sweet =>
        sweet.name.toLowerCase().includes(criteria.name!.toLowerCase())
      );
    }

    if (criteria.category) {
      filteredSweets = filteredSweets.filter(sweet =>
        sweet.category.toLowerCase().includes(criteria.category!.toLowerCase())
      );
    }

    if (criteria.priceRange) {
      const { min, max } = criteria.priceRange;
      if (min !== undefined) {
        filteredSweets = filteredSweets.filter(sweet => sweet.price >= min);
      }
      if (max !== undefined) {
        filteredSweets = filteredSweets.filter(sweet => sweet.price <= max);
      }
    }

    return filteredSweets.map(sweet => ({ ...sweet }));
  }

  purchaseSweet(id: number, quantity: number): PurchaseResult {
    const sweet = this.sweets.get(id);

    if (!sweet) {
      return { success: false, message: 'Sweet not found.' };
    }

    if (sweet.stock < quantity) {
      return { success: false, message: 'Insufficient stock.' };
    }

    sweet.stock -= quantity;
    this.sweets.set(id, sweet);

    return { success: true, message: 'Purchase successful.' };
  }

  restockSweet(id: number, quantity: number): PurchaseResult {
    const sweet = this.sweets.get(id);

    if (!sweet) {
      return { success: false, message: 'Sweet not found.' };
    }

    if (quantity <= 0) {
      throw new Error('Restock quantity must be positive.');
    }

    sweet.stock += quantity;
    this.sweets.set(id, sweet);

    return { success: true, message: 'Restock successful.' };
  }
}

export default SweetShop; 