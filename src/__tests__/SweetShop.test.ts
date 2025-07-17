import SweetShop from '../services/SweetShop';
import { Sweet } from '../models/Sweet';

describe('SweetShop', () => {
  it('should add a new sweet to the shop', () => {
    const sweetShop = new SweetShop();
    const newSweet: Sweet = {
      id: 1,
      name: 'Chocolate Bar',
      price: 2.5,
      quantity: 100,
      category: 'Chocolate',
    };
    sweetShop.addSweet(newSweet);
    expect(sweetShop.getAllSweets()).toContainEqual(newSweet);
  });
}); 