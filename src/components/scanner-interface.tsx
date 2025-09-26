'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Loader2, ScanLine } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { enhanceScanWithReasoning } from '@/ai/flows/enhance-scan-with-reasoning';
import { productDatabase, type Product } from '@/lib/products';

interface ScannerInterfaceProps {
  onProductScanned: (product: Product) => void;
}

export default function ScannerInterface({
  onProductScanned,
}: ScannerInterfaceProps) {
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'success'>(
    'idle'
  );
  const [scanMessage, setScanMessage] = useState('');

  useEffect(() => {
    async function getCamera() {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
          });
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        } catch (err) {
          console.error('Error accessing camera:', err);
          setError(
            'Could not access the camera. Please check permissions and try again.'
          );
        }
      } else {
        setError('Camera access is not supported by this browser.');
      }
    }

    getCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    setScanState('scanning');
    setScanMessage('Scanning...');

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const photoDataUri = canvas.toDataURL('image/jpeg');

    const initialScanResult =
      productDatabase[Math.floor(Math.random() * productDatabase.length)].name;
    const productDbString = JSON.stringify(productDatabase);

    try {
      const result = await enhanceScanWithReasoning({
        initialScanResult,
        photoDataUri,
        productDatabase: productDbString,
      });

      const matchedProduct = productDatabase.find(
        (p) => p.name === result.refinedProductMatch
      );

      if (matchedProduct) {
        onProductScanned(matchedProduct);
        setScanState('success');
        setScanMessage(`Added: ${matchedProduct.name}`);
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
      <CardContent className="p-0">
        <div className="relative aspect-square bg-secondary flex items-center justify-center">
          {error ? (
            <div className="text-center p-4 text-destructive-foreground bg-destructive">
              <p>{error}</p>
            </div>
          ) : stream ? (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                {scanState === 'idle' && (
                  <div className="w-2/3 h-1/2 border-4 border-white/50 rounded-lg shadow-2xl" />
                )}
              </div>
              {scanState !== 'idle' && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white transition-opacity duration-300">
                  {scanState === 'scanning' && (
                    <>
                      <Loader2 className="animate-spin h-12 w-12 mb-4" />
                      <p className="text-lg font-semibold">{scanMessage}</p>
                    </>
                  )}
                  {scanState === 'success' && (
                     <p className="text-lg font-semibold animate-pulse">{scanMessage}</p>
                  )}
                </div>
              )}
              {scanState === 'scanning' && <ScanLine className="absolute w-full h-1 bg-primary/70 animate-[scan_2s_ease-in-out_infinite] top-0" style={{'animationName': 'scan-animation', 'animationDuration': '2s', 'animationTimingFunction': 'ease-in-out', 'animationIterationCount': 'infinite'}} />}
              <style jsx>{`
                @keyframes scan-animation {
                  0% { top: 0; }
                  100% { top: 100%; }
                }
              `}</style>
            </>
          ) : (
            <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <div className="p-4 border-t">
          <Button
            size="lg"
            className="w-full text-lg py-6"
            onClick={handleScan}
            disabled={!stream || scanState !== 'idle'}
          >
            <Camera className="mr-2 h-6 w-6" />
            Scan Product
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
