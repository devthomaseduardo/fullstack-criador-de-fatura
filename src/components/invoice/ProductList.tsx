import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit2, Trash2, Check, X } from 'lucide-react';
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
      toast.success('Produto atualizado com sucesso!');
    }
  };

  const handleDelete = (id: string, productName: string) => {
    onDeleteProduct(id);
    toast.success(`Produto "${productName}" removido!`);
  };

  if (products.length === 0) {
    return (
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <p className="text-invoice-muted">Nenhum produto adicionado ainda</p>
            <p className="text-sm text-invoice-muted mt-2">Use o formulário acima para adicionar produtos</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader>
        <CardTitle className="text-invoice-header">Lista de Produtos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border border-border rounded-lg p-4 bg-card">
              {editingId === product.id ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Input
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Nome do produto"
                      className="border-border"
                    />
                    <Input
                      type="number"
                      step="0.01"
                      value={editForm.price || 0}
                      onChange={(e) => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      placeholder="Preço"
                      className="border-border"
                    />
                    <Input
                      type="number"
                      min="1"
                      value={editForm.quantity || 1}
                      onChange={(e) => setEditForm({ ...editForm, quantity: Number(e.target.value) })}
                      placeholder="Quantidade"
                      className="border-border"
                    />
                  </div>
                  <Input
                    value={editForm.description || ''}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Descrição"
                    className="border-border"
                  />
                  <div className="flex gap-2">
                    <Button onClick={saveEditing} variant="default" size="sm" className="bg-success">
                      <Check className="h-4 w-4 mr-1" />
                      Salvar
                    </Button>
                    <Button onClick={cancelEditing} variant="outline" size="sm">
                      <X className="h-4 w-4 mr-1" />
                      Cancelar
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-invoice-text">{product.name}</h4>
                      <span className="font-bold text-success">R${product.total.toFixed(2)}</span>
                    </div>
                    {product.description && (
                      <p className="text-sm text-invoice-muted mt-1">{product.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-invoice-muted">
                      <span>Qtd: {product.quantity}</span>
                      <span>Preço: R${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      onClick={() => startEditing(product)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary hover:text-primary-foreground"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(product.id, product.name)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};