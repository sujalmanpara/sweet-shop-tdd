import { Sweet } from '../models/Sweet';

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
}

export default SweetShop; 