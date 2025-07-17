import { Sweet } from '../models/Sweet';

class SweetShop {
  private sweets: Sweet[] = [];

  addSweet(sweet: Sweet) {
    this.sweets.push(sweet);
  }

  getAllSweets(): Sweet[] {
    return this.sweets;
  }
}

export default SweetShop; 