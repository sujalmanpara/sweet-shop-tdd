import { Sweet } from '../models/Sweet';

class SweetShop {
  private sweets: Sweet[] = [];

  addSweet(sweet: Sweet) {
    if (this.sweets.some(s => s.id === sweet.id)) {
      throw new Error('A sweet with this ID already exists.');
    }
    if (sweet.price < 0 || sweet.quantity < 0) {
      throw new Error('Price and quantity must not be negative.');
    }
    this.sweets.push(sweet);
  }

  getAllSweets(): Sweet[] {
    return this.sweets;
  }

  deleteSweet(id: number): boolean {
    const initialLength = this.sweets.length;
    this.sweets = this.sweets.filter(sweet => sweet.id !== id);
    return this.sweets.length < initialLength;
  }
}

export default SweetShop; 