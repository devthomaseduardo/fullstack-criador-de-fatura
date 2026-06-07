import { useState } from 'react';
import { Edit2, Trash2, Check, X, ShoppingBag } from 'lucide-react';
import { Product } from '@/types/invoice';
import { toast } from 'sonner';

interface ProductListProps {
  products: Product[];
  onUpdateProduct: (id: string, product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
}

export const ProductList = ({ products, onUpdateProduct, onDeleteProduct }: ProductListProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});

  const startEditing = (product: Product) => {
    setEditingId(product.id);
    setEditForm(product);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEditing = () => {
    if (editingId && editForm.name && editForm.price && editForm.quantity) {
      onUpdateProduct(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      toast.success('Item atualizado');
    }
  };

  const handleDelete = (id: string, name: string) => {
    onDeleteProduct(id);
    toast.success(`"${name}" removido`);
  };

  if (products.length === 0) {
    return (
      <div className="glass-card p-8 flex flex-col items-center justify-center gap-3 text-center">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
          <ShoppingBag className="w-5 h-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground/70">Nenhum item adicionado</p>
          <p className="text-xs text-muted-foreground mt-0.5">Use o formulário acima para inserir produtos ou serviços</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <p className="section-title">Itens da Fatura</p>
        <span className="text-xs text-muted-foreground">{products.length} {products.length === 1 ? 'item' : 'itens'}</span>
      </div>

      <div className="divide-y divide-border">
        {products.map((product, index) => (
          <div
            key={product.id}
            className="px-6 py-4 animate-slide-in"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            {editingId === product.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    className="field-base col-span-1"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    placeholder="Nome"
                  />
                  <input
                    type="number"
                    step="0.01"
                    className="field-base mono"
                    value={editForm.price || 0}
                    onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                    placeholder="Preço"
                  />
                  <input
                    type="number"
                    min="1"
                    className="field-base mono"
                    value={editForm.quantity || 1}
                    onChange={(e) => setEditForm({ ...editForm, quantity: Number(e.target.value) })}
                    placeholder="Qtd"
                  />
                </div>
                <input
                  className="field-base"
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  placeholder="Descrição (opcional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEditing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-success bg-success/10 border border-success/25 rounded-md hover:bg-success/15 transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    Salvar
                  </button>
                  <button
                    onClick={cancelEditing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border rounded-md hover:bg-secondary/60 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4 group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">{product.name}</p>
                  </div>
                  {product.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{product.description}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-muted-foreground mono">
                      {product.quantity}× R$ {product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm font-semibold mono text-success">
                    R$ {product.total.toFixed(2)}
                  </span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEditing(product)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      className="w-7 h-7 rounded-md flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};