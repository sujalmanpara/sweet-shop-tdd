import { Sweet, SearchCriteria } from '../models/Sweet';

class SweetShop {
  private sweets: Map<number, Sweet> = new Map();

  addSweet(sweet: Sweet) {
    if (this.sweets.has(sweet.id)) {
      throw new Error('A sweet with this ID already exists.');
    }
    if (sweet.price < 0 || sweet.quantity < 0) {
      throw new Error('Price and quantity must not be negative.');
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
}

export default SweetShop; 