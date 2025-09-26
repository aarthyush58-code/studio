'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, Sparkles, PlusCircle } from 'lucide-react';
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
      }, 2000);
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-6 w-6 text-primary" />
          Enter Product ID
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-2 space-y-4">
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
            className="text-lg h-12"
          />
          <Button
            onClick={handleScan}
            disabled={!productId || scanState !== 'idle'}
            size="lg"
            className="h-12"
          >
            {scanState === 'scanning' ? (
              <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
              <>
                <PlusCircle className="mr-2 h-5 w-5" /> Add to Cart
              </>
            )}
          </Button>
        </div>
        <div className="h-6 mt-2 text-center">
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
      </CardContent>
    </Card>
  );
}
