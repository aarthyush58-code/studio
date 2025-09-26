'use client';

import { useState } from 'react';
import type { Product } from '@/lib/products';
import ScannerInterface from '@/components/scanner-interface';
import ShoppingCart from '@/components/shopping-cart';
import CartSummary from '@/components/cart-summary';
import { Logo } from '@/components/icons';
import { Separator } from '@/components/ui/separator';

export type CartItem = Product & {
  instanceId: string;
};

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleProductScanned = (product: Product) => {
    const newItem: CartItem = {
      ...product,
      instanceId: `${Date.now()}-${Math.random()}`,
    };
    setCartItems((prevItems) => [...prevItems, newItem]);
  };

  const handleRemoveItem = (instanceId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.instanceId !== instanceId)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-4">
          <Logo className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">
            QuickScan
          </h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="w-full lg:col-span-3">
            <ScannerInterface onProductScanned={handleProductScanned} />
          </div>
          <div className="lg:col-span-2 flex flex-col gap-6 sticky top-6">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <div className="flex-grow">
              <ShoppingCart
                cartItems={cartItems}
                onRemoveItem={handleRemoveItem}
              />
            </div>
            <Separator />
            <CartSummary cartItems={cartItems} onClearCart={handleClearCart} />
          </div>
        </div>
      </main>
      <footer className="text-center p-6 text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} QuickScan. All rights reserved.</p>
      </footer>
    </div>
  );
}
