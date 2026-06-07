import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ProductForm } from './ProductForm';
import { ProductList } from './ProductList';
import { InvoicePreview } from './InvoicePreview';
import { Invoice, Product, CompanyInfo, ClientInfo } from '@/types/invoice';
import {
  Printer,
  Download,
  FileText,
  Building2,
  User,
  Package,
  StickyNote,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export const InvoiceManager = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>('client');

  const [companyInfo] = useState<CompanyInfo>({
    name: 'Empresa Exemplo Lda.',
    address: 'Rua da Amostra, 123, 1000-001 Lisboa',
    phone: '+351 123 456 789',
    email: 'geral@empresa.pt',
    taxId: '123456789',
  });

  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    address: '',
    phone: '',
    email: '',
    taxId: '',
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [notes, setNotes] = useState('');

  const calculateTotals = () => {
    const subtotal = products.reduce((sum, p) => sum + p.total, 0);
    const tax = subtotal * 0.23;
    const total = subtotal + tax;
    return { subtotal, tax, total };
  };

  const { subtotal, tax, total } = calculateTotals();

  const invoice: Invoice = {
    id: '1',
    number: `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    company: companyInfo,
    client: clientInfo,
    products,
    subtotal,
    tax,
    total,
    notes,
    status: 'draft',
  };

  const addProduct = (productData: Omit<Product, 'id' | 'total'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      total: productData.quantity * productData.price,
    };
    setProducts([...products, newProduct]);
    toast.success('Item adicionado à fatura');
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updated,
              total: (updated.quantity || p.quantity) * (updated.price || p.price),
            }
          : p
      )
    );
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Fatura_${invoice.number}`,
    onAfterPrint: () => toast.success('Fatura enviada para impressão'),
  });

  const handleSavePDF = () => {
    handlePrint();
    toast.info('Selecione "Salvar como PDF" no diálogo de impressão');
  };

  const navItems = [
    { id: 'client', icon: User, label: 'Cliente' },
    { id: 'products', icon: Package, label: 'Itens' },
    { id: 'notes', icon: StickyNote, label: 'Observações' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground tracking-tight">InvoicePro</span>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground mono">{invoice.number}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSavePDF}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-md transition-all hover:bg-secondary/60 active:scale-[0.98]"
            >
              <Download className="w-3.5 h-3.5" />
              Exportar PDF
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md transition-all active:scale-[0.98]"
              style={{ boxShadow: 'var(--shadow-button)' }}
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_520px] gap-8">
          {/* ── Left Panel ── */}
          <div className="space-y-6">
            {/* Page heading */}
            <div className="animate-fade-up">
              <p className="section-title mb-1">Nova Fatura</p>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Gestão de Faturas
              </h1>
            </div>

            {/* Nav tabs */}
            <nav className="flex gap-1 p-1 bg-secondary/40 border border-border rounded-lg w-fit animate-fade-up">
              {navItems.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                    activeSection === id
                      ? 'bg-card text-foreground border border-border shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </nav>

            {/* ── Client Section ── */}
            {activeSection === 'client' && (
              <div className="glass-card p-6 animate-fade-up">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="section-title">Dados do Cliente</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="clientName" className="field-label">Nome / Empresa <span className="text-destructive">*</span></label>
                    <input
                      id="clientName"
                      className="field-base"
                      value={clientInfo.name}
                      onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                      placeholder="Nome do cliente ou empresa"
                    />
                  </div>
                  <div>
                    <label htmlFor="clientTaxId" className="field-label">NIF</label>
                    <input
                      id="clientTaxId"
                      className="field-base mono"
                      value={clientInfo.taxId}
                      onChange={(e) => setClientInfo({ ...clientInfo, taxId: e.target.value })}
                      placeholder="123456789"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="clientAddress" className="field-label">Endereço <span className="text-destructive">*</span></label>
                  <input
                    id="clientAddress"
                    className="field-base"
                    value={clientInfo.address}
                    onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })}
                    placeholder="Rua, número, código postal, cidade"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label htmlFor="clientPhone" className="field-label">Telefone</label>
                    <input
                      id="clientPhone"
                      className="field-base"
                      value={clientInfo.phone}
                      onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                      placeholder="+351 000 000 000"
                    />
                  </div>
                  <div>
                    <label htmlFor="clientEmail" className="field-label">Email</label>
                    <input
                      id="clientEmail"
                      type="email"
                      className="field-base"
                      value={clientInfo.email}
                      onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                      placeholder="email@cliente.com"
                    />
                  </div>
                </div>

                <button
                  onClick={() => setActiveSection('products')}
                  className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  Próximo: Adicionar Itens
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* ── Products Section ── */}
            {activeSection === 'products' && (
              <div className="space-y-4 animate-fade-up">
                <ProductForm onAddProduct={addProduct} />
                <ProductList
                  products={products}
                  onUpdateProduct={updateProduct}
                  onDeleteProduct={deleteProduct}
                />
              </div>
            )}

            {/* ── Notes Section ── */}
            {activeSection === 'notes' && (
              <div className="glass-card p-6 animate-fade-up">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <StickyNote className="w-4 h-4 text-primary" />
                  </div>
                  <p className="section-title">Observações</p>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Condições de pagamento, notas adicionais ou informações relevantes para o cliente..."
                  className="field-base min-h-[140px] resize-y leading-relaxed"
                />
              </div>
            )}

            {/* ── Totals Summary ── */}
            <div className="glass-card p-5 animate-fade-up">
              <div className="flex items-center justify-between mb-4">
                <p className="section-title">Resumo</p>
                {products.length > 0 && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-success bg-success/10 border border-success/20 px-2 py-0.5 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    {products.length} {products.length === 1 ? 'item' : 'itens'}
                  </span>
                )}
              </div>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="text-sm font-medium mono text-foreground">R$ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">IVA (23%)</span>
                  <span className="text-sm font-medium mono text-foreground">R$ {tax.toFixed(2)}</span>
                </div>
                <div className="pt-2.5 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">Total</span>
                    <span className="text-xl font-bold mono text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Panel: Preview ── */}
          <div className="xl:block">
            <div className="sticky top-[72px]">
              <div className="flex items-center justify-between mb-4">
                <p className="section-title">Prévia</p>
                <span className="badge-draft inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full">
                  Rascunho
                </span>
              </div>
              <div
                className="rounded-xl border border-border overflow-hidden"
                style={{ maxHeight: 'calc(100vh - 140px)', overflowY: 'auto' }}
              >
                <InvoicePreview ref={printRef} invoice={invoice} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};