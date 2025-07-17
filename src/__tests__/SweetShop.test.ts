import SweetShop from '../services/SweetShop';
import { Sweet, SearchCriteria, PurchaseResult } from '../models/Sweet';

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

  it('should return an immutable copy of the sweets', () => {
    const sweetShop = new SweetShop();
    const sweet: Sweet = { id: 1, name: 'Jelly Bean', price: 0.2, quantity: 500, category: 'Jelly' };
    sweetShop.addSweet(sweet);

    const sweets = sweetShop.getAllSweets();
    sweets[0].quantity = 10; 

    const sweetsAgain = sweetShop.getAllSweets();
    expect(sweetsAgain[0].quantity).toBe(500);
  });

  describe('searchSweets', () => {
    const sweetShop = new SweetShop();
    const sweet1: Sweet = { id: 1, name: 'Chocolate Cake', price: 20, quantity: 10, category: 'Cake' };
    const sweet2: Sweet = { id: 2, name: 'Vanilla Cake', price: 18, quantity: 12, category: 'Cake' };
    const sweet3: Sweet = { id: 3, name: 'Chocolate Muffin', price: 5, quantity: 30, category: 'Muffin' };
    sweetShop.addSweet(sweet1);
    sweetShop.addSweet(sweet2);
    sweetShop.addSweet(sweet3);

    it('should find sweets by name', () => {
      const results = sweetShop.searchSweets({ name: 'Cake' });
      expect(results).toHaveLength(2);
      expect(results).toContainEqual(sweet1);
      expect(results).toContainEqual(sweet2);
    });

    it('should find sweets by category', () => {
      const results = sweetShop.searchSweets({ category: 'Muffin' });
      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(sweet3);
    });

    it('should find sweets by price range', () => {
      const results = sweetShop.searchSweets({ priceRange: { min: 15, max: 25 } });
      expect(results).toHaveLength(2);
      expect(results).toContainEqual(sweet1);
      expect(results).toContainEqual(sweet2);
    });

    it('should return an empty array if no sweets match the criteria', () => {
      const results = sweetShop.searchSweets({ name: 'Non-existent' });
      expect(results).toHaveLength(0);
    });

    it('should find sweets by partial category match', () => {
      const results = sweetShop.searchSweets({ category: 'Muff' });
      expect(results).toHaveLength(1);
      expect(results[0]).toEqual(sweet3);
    });
  });

  describe('purchaseSweet', () => {
    let sweetShop: SweetShop;
    const sweetId = 1;
    const initialQuantity = 10;

    beforeEach(() => {
      sweetShop = new SweetShop();
      const sweet: Sweet = {
        id: sweetId,
        name: 'Caramel',
        price: 1.25,
        quantity: initialQuantity,
        category: 'Chewy',
      };
      sweetShop.addSweet(sweet);
    });

    it('should decrease the quantity of a sweet after a successful purchase', () => {
      const purchaseQuantity = 3;
      const result: PurchaseResult = sweetShop.purchaseSweet(sweetId, purchaseQuantity);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Purchase successful.');
      const updatedSweet = sweetShop.getAllSweets().find(s => s.id === sweetId);
      expect(updatedSweet?.quantity).toBe(initialQuantity - purchaseQuantity);
    });

    it('should return an error if there is insufficient stock', () => {
      const purchaseQuantity = 15;
      const result: PurchaseResult = sweetShop.purchaseSweet(sweetId, purchaseQuantity);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Insufficient stock.');
      const sweet = sweetShop.getAllSweets().find(s => s.id === sweetId);
      expect(sweet?.quantity).toBe(initialQuantity);
    });

    it('should return an error if the sweet is not found', () => {
      const result: PurchaseResult = sweetShop.purchaseSweet(999, 1);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Sweet not found.');
    });
  });

  describe('restockSweet', () => {
    let sweetShop: SweetShop;
    const sweetId = 1;
    const initialQuantity = 10;

    beforeEach(() => {
      sweetShop = new SweetShop();
      const sweet: Sweet = {
        id: sweetId,
        name: 'Gummy Bears',
        price: 2.5,
        quantity: initialQuantity,
        category: 'Gummy',
      };
      sweetShop.addSweet(sweet);
    });

    it('should increase the quantity of a sweet after a successful restock', () => {
      const restockQuantity = 20;
      const result = sweetShop.restockSweet(sweetId, restockQuantity);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Restock successful.');
      const updatedSweet = sweetShop.getAllSweets().find(s => s.id === sweetId);
      expect(updatedSweet?.quantity).toBe(initialQuantity + restockQuantity);
    });

    it('should return an error if the sweet to restock is not found', () => {
      const result = sweetShop.restockSweet(999, 10);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Sweet not found.');
    });

    it('should throw an error if the restock quantity is not positive', () => {
      expect(() => sweetShop.restockSweet(sweetId, -5)).toThrow('Restock quantity must be positive.');
      expect(() => sweetShop.restockSweet(sweetId, 0)).toThrow('Restock quantity must be positive.');
    });
  });
}); 