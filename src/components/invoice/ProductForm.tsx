import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Product } from '@/types/invoice';

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id' | 'total'>) => void;
}

export const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: 1,
    price: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name && product.price > 0) {
      onAddProduct(product);
      setProduct({ name: '', description: '', quantity: 1, price: 0 });
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="text-invoice-header flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Adicionar Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto *</Label>
              <Input
                id="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Digite o nome do produto"
                className="border-border focus:border-primary"
                required
              />
            </div>
            <div className="flex flex-col gap-1 w-full max-w-xs">
  <label 
    htmlFor="price" 
    className="text-sm font-medium text-gray-700"
  >
    Preço Unitário (R$) *
  </label>
  <div className="relative">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">R$</span>
    <input
      id="price"
      type="number"
      step="0.01"
      value={product.price}
      onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
      placeholder="0.00"
      className="w-full pl-8 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-gray-900 placeholder-gray-400 transition"
      required
    />
  </div>
</div>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantidade *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={product.quantity}
                onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
                className="border-border focus:border-primary"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                placeholder="Descrição opcional"
                className="border-border focus:border-primary"
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-primary shadow-button hover:scale-[1.02] transition-all">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};