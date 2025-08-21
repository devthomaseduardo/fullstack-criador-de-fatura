import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';
import { InvoicePreview } from './InvoicePreview';
import { Invoice, Product, CompanyInfo, ClientInfo } from '@/types/invoice';
import { Printer, FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

export const InvoiceManager = () => {
  const printRef = useRef<HTMLDivElement>(null);
  
  // Default company info (can be made configurable later)
  const [companyInfo] = useState<CompanyInfo>({
    name: 'Empresa Exemplo Lda.',
    address: 'Rua da Amostra, 123, 1000-001 Lisboa',
    phone: '+351 123 456 789',
    email: 'geral@empresa.pt',
    taxId: '123456789'
  });

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    address: '',
    phone: '',
    email: '',
    taxId: ''
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [notes, setNotes] = useState('');
  
  const calculateTotals = () => {
    const subtotal = products.reduce((sum, product) => sum + product.total, 0);
    const tax = subtotal * 0.23; // 23% IVA
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const invoice: Invoice = {
    id: '1',
    number: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    company: companyInfo,
    client: clientInfo,
    products,
    subtotal,
    tax,
    total,
    notes,
    status: 'draft'
  };

  const addProduct = (productData: Omit<Product, 'id' | 'total'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      total: productData.quantity * productData.price
    };
    setProducts([...products, newProduct]);
    toast.success('Produto adicionado com sucesso!');
  };

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts(products.map(product => 
      product.id === id 
        ? { 
            ...product, 
            ...updatedProduct, 
            total: (updatedProduct.quantity || product.quantity) * (updatedProduct.price || product.price)
          }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Fatura_${invoice.number}`,
    onAfterPrint: () => toast.success('Fatura enviada para impressão!'),
  });

  const handleSavePDF = () => {
    // Trigger print dialog which can be used to save as PDF
    handlePrint();
    toast.info('Use a opção "Imprimir para PDF" no diálogo de impressão');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary bg-gradient-primary bg-clip-text text-transparent">
              Gestão de Faturas
            </h1>
            <p className="text-invoice-muted mt-2">Sistema profissional de faturação</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={handleSavePDF} 
              variant="outline" 
              className="shadow-button hover:scale-[1.02] transition-all"
            >
              <Download className="h-4 w-4 mr-2" />
              Salvar PDF
            </Button>
            <Button 
              onClick={handlePrint} 
              className="bg-gradient-primary shadow-button hover:scale-[1.02] transition-all"
            >
              <Printer className="h-4 w-4 mr-2" />
              Imprimir
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column - Forms */}
          <div className="space-y-6">
            {/* Client Information */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-invoice-header flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Informações do Cliente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome/Empresa *</Label>
                    <Input
                      id="clientName"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      placeholder="Nome do cliente"
                      className="border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientTaxId">NIF</Label>
                    <Input
                      id="clientTaxId"
                      value={clientInfo.taxId}
                      onChange={(e) => setClientInfo({ ...clientInfo, taxId: e.target.value })}
                      placeholder="Número fiscal"
                      className="border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Endereço *</Label>
                  <Input
                    id="clientAddress"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    placeholder="Endereço completo"
                    className="border-border focus:border-primary"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Telefone</Label>
                    <Input
                      id="clientPhone"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      placeholder="Número de telefone"
                      className="border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      placeholder="email@cliente.com"
                      className="border-border focus:border-primary"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Product Form */}
            <ProductForm onAddProduct={addProduct} />

            {/* Product List */}
            <ProductList 
              products={products}
              onUpdateProduct={updateProduct}
              onDeleteProduct={deleteProduct}
            />

            {/* Notes */}
            <Card className="bg-gradient-card shadow-card">
              <CardHeader>
                <CardTitle className="text-invoice-header">Observações</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observações adicionais para a fatura..."
                  className="min-h-[100px] border-border focus:border-primary"
                />
              </CardContent>
            </Card>

            {/* Totals Summary */}
            <Card className="bg-gradient-primary text-primary-foreground shadow-invoice">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm opacity-90">
                    <span>Subtotal:</span>
                    <span>R${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm opacity-90">
                    <span>IVA (23%):</span>
                    <span>R${tax.toFixed(2)}</span>
                  </div>
                  <Separator className="bg-primary-foreground/20" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total:</span>
                    <span>R${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Invoice Preview */}
          <div className="space-y-6">
            <div className="sticky top-6">
              <h2 className="text-2xl font-semibold text-invoice-header mb-4">Prévia da Fatura</h2>
              <div className="max-h-[calc(100vh-200px)] overflow-auto">
                <InvoicePreview ref={printRef} invoice={invoice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};