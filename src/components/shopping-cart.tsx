'use client';

import type { CartItem } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, ShoppingCart as ShoppingCartIcon } from 'lucide-react';

interface ShoppingCartProps {
  cartItems: CartItem[];
  onRemoveItem: (instanceId: string) => void;
}

export default function ShoppingCart({
  cartItems,
  onRemoveItem,
}: ShoppingCartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-0">
        <ScrollArea className="h-64">
          <div className="p-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ShoppingCartIcon className="mx-auto h-12 w-12 mb-4" />
                <p>Your cart is empty.</p>
                <p className="text-sm">Scan a product to get started!</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {cartItems.map((item) => (
                  <li
                    key={item.instanceId}
                    className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => onRemoveItem(item.instanceId)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
