import { useState } from 'react';
import { Plus, Hash, AlignLeft, DollarSign, Layers } from 'lucide-react';
import { Product } from '@/types/invoice';

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id' | 'total'>) => void;
}

export const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    quantity: 1,
    price: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (product.name && product.price > 0) {
      onAddProduct(product);
      setProduct({ name: '', description: '', quantity: 1, price: 0 });
    }
  };

  const total = product.quantity * product.price;

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Layers className="w-4 h-4 text-primary" />
        </div>
        <p className="section-title">Adicionar Item</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="prod-name" className="field-label">
              Nome do Item <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <AlignLeft className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <input
                id="prod-name"
                className="field-base pl-8"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                placeholder="Ex: Desenvolvimento Web"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="prod-desc" className="field-label">
              Descrição
            </label>
            <input
              id="prod-desc"
              className="field-base"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Detalhe opcional"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="prod-qty" className="field-label">
              <Hash className="inline w-3 h-3 mr-1" />
              Quantidade
            </label>
            <input
              id="prod-qty"
              type="number"
              min="1"
              className="field-base mono"
              value={product.quantity}
              onChange={(e) => setProduct({ ...product, quantity: Number(e.target.value) })}
              required
            />
          </div>

          <div>
            <label htmlFor="prod-price" className="field-label">
              <DollarSign className="inline w-3 h-3 mr-1" />
              Preço Unitário (R$) <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs mono">R$</span>
              <input
                id="prod-price"
                type="number"
                step="0.01"
                min="0"
                className="field-base pl-9 mono"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                placeholder="0.00"
                required
              />
            </div>
          </div>
        </div>

        {/* Live total preview */}
        {total > 0 && (
          <div className="flex items-center justify-between px-3 py-2 bg-primary/5 border border-primary/15 rounded-md">
            <span className="text-xs text-muted-foreground">Total do item</span>
            <span className="text-sm font-semibold mono text-primary">R$ {total.toFixed(2)}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-lg transition-all active:scale-[0.98]"
          style={{ boxShadow: 'var(--shadow-button)' }}
        >
          <Plus className="w-4 h-4" />
          Adicionar Item à Fatura
        </button>
      </form>
    </div>
  );
};