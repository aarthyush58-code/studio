'use client';

import type { CartItem } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, ShoppingCart as ShoppingCartIcon } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

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
    <Card className="shadow-md overflow-hidden">
      <CardContent className="p-0">
        <ScrollArea className="h-72">
          <div className="p-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground flex flex-col items-center justify-center">
                <ShoppingCartIcon className="mx-auto h-16 w-16 mb-4 text-primary/30" />
                <p className="text-lg font-medium">Your cart is empty.</p>
                <p className="text-sm">Add items using the scanner to see them here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {cartItems.map((item) => (
                  <li
                    key={item.instanceId}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex-grow">
                      <p className="font-semibold text-md">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full"
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
