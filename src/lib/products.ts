export type Product = {
  id: string;
  name: string;
  price: number;
};

export const productDatabase: Product[] = [
  { id: 'prod_001', name: 'Organic Apples', price: 2.5 },
  { id: 'prod_002', name: 'Whole Milk', price: 3.25 },
  { id: 'prod_003', name: 'Sourdough Bread', price: 4.5 },
  { id: 'prod_004', name: 'Free-Range Eggs', price: 5.0 },
  { id: 'prod_005', name: 'Avocado', price: 1.75 },
  { id: 'prod_006', name: 'Dark Chocolate Bar', price: 3.0 },
  { id: 'prod_007', name: 'Oat Milk', price: 4.0 },
  { id: 'prod_008', name: 'Cherry Tomatoes', price: 2.99 },
];
