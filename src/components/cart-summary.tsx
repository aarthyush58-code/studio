'use client';

import { useMemo } from 'react';
import type { CartItem } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';

interface CartSummaryProps {
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function CartSummary({
  cartItems,
  onClearCart,
}: CartSummaryProps) {
  const { totalItems, totalCost } = useMemo(() => {
    const totalItems = cartItems.length;
    const totalCost = cartItems.reduce((sum, item) => sum + item.price, 0);
    return { totalItems, totalCost };
  }, [cartItems]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-lg">
          <span className="text-muted-foreground">Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center text-2xl font-bold">
          <span className="text-muted-foreground">Total Cost:</span>
          <span>{formatCurrency(totalCost)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button
          className="w-full bg-green-500 hover:bg-green-600 text-white"
          size="lg"
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground"
          onClick={onClearCart}
          disabled={cartItems.length === 0}
        >
          <XCircle className="mr-2 h-4 w-4" /> Clear Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
