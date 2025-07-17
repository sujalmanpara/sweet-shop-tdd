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

  it('should not add a sweet with a duplicate ID', () => {
    const sweetShop = new SweetShop();
    const sweet1: Sweet = { id: 1, name: 'Gummy Bears', price: 1.5, quantity: 50, category: 'Gummy' };
    const sweet2: Sweet = { id: 1, name: 'Sour Patch Kids', price: 2.0, quantity: 40, category: 'Sour' };
    sweetShop.addSweet(sweet1);
    expect(() => sweetShop.addSweet(sweet2)).toThrow('A sweet with this ID already exists.');
  });

  it('should not add a sweet with a negative price', () => {
    const sweetShop = new SweetShop();
    const invalidSweet: Sweet = { id: 2, name: 'Invalid Sweet', price: -1, quantity: 10, category: 'Invalid' };
    expect(() => sweetShop.addSweet(invalidSweet)).toThrow('Price and quantity must not be negative.');
  });

  it('should not add a sweet with a negative quantity', () => {
    const sweetShop = new SweetShop();
    const invalidSweet: Sweet = { id: 3, name: 'Invalid Sweet', price: 1, quantity: -10, category: 'Invalid' };
    expect(() => sweetShop.addSweet(invalidSweet)).toThrow('Price and quantity must not be negative.');
  });

  it('should delete a sweet by its ID', () => {
    const sweetShop = new SweetShop();
    const sweet1: Sweet = { id: 1, name: 'Lollipop', price: 0.5, quantity: 200, category: 'Candy' };
    sweetShop.addSweet(sweet1);
    const result = sweetShop.deleteSweet(1);
    expect(result).toBe(true);
    expect(sweetShop.getAllSweets()).not.toContainEqual(sweet1);
  });

  it('should return false if the sweet to delete is not found', () => {
    const sweetShop = new SweetShop();
    const result = sweetShop.deleteSweet(999);
    expect(result).toBe(false);
  });

  it('should return all sweets in the shop', () => {
    const sweetShop = new SweetShop();
    const sweet1: Sweet = { id: 1, name: 'Caramel', price: 1, quantity: 100, category: 'Chewy' };
    const sweet2: Sweet = { id: 2, name: 'Toffee', price: 1.5, quantity: 150, category: 'Chewy' };
    sweetShop.addSweet(sweet1);
    sweetShop.addSweet(sweet2);
    const sweets = sweetShop.getAllSweets();
    expect(sweets).toHaveLength(2);
    expect(sweets).toContainEqual(sweet1);
    expect(sweets).toContainEqual(sweet2);
  });
}); 