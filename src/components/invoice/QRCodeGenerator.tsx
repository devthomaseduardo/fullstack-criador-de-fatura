import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

export const QRCodeGenerator = ({ value, size = 150, className = '' }: QRCodeGeneratorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateQR = async () => {
      if (canvasRef.current && value) {
        try {
          setIsLoading(true);
          await QRCode.toCanvas(canvasRef.current, value, {
            width: size,
            margin: 2,
            color: {
              dark: '#1e293b',
              light: '#ffffff'
            }
          });
        } catch (error) {
          console.error('Error generating QR code:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    generateQR();
  }, [value, size]);

  return (
    <div className={`flex flex-col items-center space-y-2 ${className}`}>
      <canvas 
        ref={canvasRef} 
        className={`border border-border rounded-md ${isLoading ? 'opacity-50' : ''}`}
      />
      <span className="text-xs text-invoice-muted">QR Code da Fatura</span>
    </div>
  );
};