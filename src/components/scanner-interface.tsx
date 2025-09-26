'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ScanLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { findProductById } from '@/ai/flows/find-product-by-id';
import { productDatabase, type Product } from '@/lib/products';

interface ScannerInterfaceProps {
  onProductScanned: (product: Product) => void;
}

export default function ScannerInterface({
  onProductScanned,
}: ScannerInterfaceProps) {
  const { toast } = useToast();
  const [productId, setProductId] = useState('');
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>(
    'idle'
  );
  const [scanMessage, setScanMessage] = useState('');

  const handleScan = async () => {
    if (!productId) return;
    setScanState('scanning');
    setScanMessage('Looking up product...');

    try {
      const result = await findProductById({
        productId,
        productDatabase: JSON.stringify(productDatabase),
      });

      const matchedProduct = productDatabase.find(
        (p) => p.name === result.productName
      );

      if (matchedProduct) {
        onProductScanned(matchedProduct);
        setScanState('success');
        setScanMessage(`Added: ${matchedProduct.name}`);
        setProductId('');
      } else {
        throw new Error('Product not found in database.');
      }
    } catch (e) {
      console.error('AI Scan failed:', e);
      toast({
        variant: 'destructive',
        title: 'Scan Failed',
        description: 'Could not identify the product. Please try again.',
      });
      setScanState('idle');
      setScanMessage('');
    } finally {
      setTimeout(() => {
        setScanState('idle');
        setScanMessage('');
      }, 1500);
    }
  };

  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-semibold">Enter Product ID</h3>
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            placeholder="e.g., prod_001"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled={scanState !== 'idle'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleScan();
              }
            }}
          />
          <Button
            onClick={handleScan}
            disabled={!productId || scanState !== 'idle'}
          >
            {scanState === 'scanning' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Add'
            )}
          </Button>
        </div>
        {scanState !== 'idle' && (
          <div className="text-center p-4">
            {scanState === 'scanning' && (
              <div className="flex items-center justify-center text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>{scanMessage}</span>
              </div>
            )}
            {scanState === 'success' && (
              <p className="text-green-600 font-semibold animate-pulse">
                {scanMessage}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
