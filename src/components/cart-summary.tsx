'use client';

import { useMemo } from 'react';
import type { CartItem } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle, CreditCard } from 'lucide-react';

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
    <Card className="shadow-lg border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-md">
          <span className="text-muted-foreground">Total Items:</span>
          <span className="font-semibold">{totalItems}</span>
        </div>
        <div className="flex justify-between items-center text-3xl font-bold">
          <span className="text-muted-foreground">Total:</span>
          <span className="text-primary">{formatCurrency(totalCost)}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-4">
        <Button
          className="w-full"
          size="lg"
          disabled={cartItems.length === 0}
        >
          <CreditCard className="mr-2 h-5 w-5" /> Proceed to Checkout
        </Button>
        <Button
          variant="ghost"
          className="w-full text-muted-foreground hover:text-destructive"
          onClick={onClearCart}
          disabled={cartItems.length === 0}
        >
          <XCircle className="mr-2 h-4 w-4" /> Clear Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
