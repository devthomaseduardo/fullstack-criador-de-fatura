import { forwardRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { QRCodeGenerator } from './QRCodeGenerator';
import { Invoice } from '@/types/invoice';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface InvoicePreviewProps {
  invoice: Invoice;
}

export const InvoicePreview = forwardRef<HTMLDivElement, InvoicePreviewProps>(
  ({ invoice }, ref) => {
    const qrCodeValue = `Fatura ${invoice.number} - R$${invoice.total.toFixed(2)}`;

    return (
      <div ref={ref} className="w-full max-w-4xl mx-auto">
        <Card className="bg-[#121216] text-white border-white/10 shadow-invoice print:shadow-none print:border-0 print:bg-white print:text-black overflow-hidden relative">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 opacity-50 pointer-events-none print:hidden"></div>
          
          <CardContent className="p-10 print:p-6 relative z-10">
            {/* Header */}
            <div className="flex justify-between items-start mb-12">
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent mb-3 tracking-wider print:text-black">FATURA</h1>
                <div className="text-invoice-muted space-y-1">
                  <p>Número: <span className="font-semibold text-invoice-text">{invoice.number}</span></p>
                  <p>Data: {format(invoice.date, 'dd/MM/yyyy', { locale: ptBR })}</p>
                  <p>Vencimento: {format(invoice.dueDate, 'dd/MM/yyyy', { locale: ptBR })}</p>
                </div>
              </div>
              <div className="text-right">
                <QRCodeGenerator value={qrCodeValue} size={120} />
              </div>
            </div>

            {/* Company and Client Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl print:bg-transparent print:border-0 print:p-0">
                <h3 className="text-xs font-bold text-primary-light mb-4 tracking-widest uppercase">
                  DADOS DA EMPRESA
                </h3>
                <div className="space-y-1.5 text-sm">
                  <p className="font-semibold text-invoice-text">{invoice.company.name}</p>
                  <p className="text-invoice-muted">{invoice.company.address}</p>
                  <p className="text-invoice-muted">Tel: {invoice.company.phone}</p>
                  <p className="text-invoice-muted">Email: {invoice.company.email}</p>
                  <p className="text-invoice-muted">NIF: {invoice.company.taxId}</p>
                </div>
              </div>
              
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl print:bg-transparent print:border-0 print:p-0">
                <h3 className="text-xs font-bold text-primary-light mb-4 tracking-widest uppercase">
                  DADOS DO CLIENTE
                </h3>
                <div className="space-y-1.5 text-sm">
                  <p className="font-semibold text-invoice-text">{invoice.client.name}</p>
                  <p className="text-invoice-muted">{invoice.client.address}</p>
                  <p className="text-invoice-muted">Tel: {invoice.client.phone}</p>
                  <p className="text-invoice-muted">Email: {invoice.client.email}</p>
                  {invoice.client.taxId && (
                    <p className="text-invoice-muted">NIF: {invoice.client.taxId}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-10 bg-white/[0.02] border border-white/5 rounded-2xl overflow-hidden print:bg-transparent print:border-0">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 print:bg-gray-100">
                      <th className="text-left p-4 text-xs font-bold text-primary-light tracking-wider uppercase">
                        Descrição
                      </th>
                      <th className="text-center p-4 text-xs font-bold text-primary-light tracking-wider uppercase w-20">
                        Qtd
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-invoice-header border-b border-border w-24">
                        Preço Unit.
                      </th>
                      <th className="text-right p-3 text-sm font-semibold text-invoice-header border-b border-border w-24">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.products.map((product, index) => (
                      <tr key={product.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors print:border-gray-200">
                        <td className="p-4 text-sm">
                          <div>
                            <p className="font-medium text-invoice-text">{product.name}</p>
                            {product.description && (
                              <p className="text-xs text-invoice-muted mt-1">{product.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-center text-invoice-text">
                          {product.quantity}
                        </td>
                        <td className="p-4 text-sm text-right text-invoice-text font-mono">
                          R${product.price.toFixed(2)}
                        </td>
                        <td className="p-4 text-sm text-right font-bold text-white print:text-black font-mono">
                          R${product.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-12">
              <div className="w-full max-w-sm space-y-3 bg-white/5 border border-white/5 p-6 rounded-2xl print:bg-transparent print:border-0 print:p-0">
                <div className="flex justify-between text-sm">
                  <span className="text-invoice-muted font-medium">Subtotal</span>
                  <span className="text-invoice-text font-mono">R${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-invoice-muted font-medium">IVA (23%)</span>
                  <span className="text-invoice-text font-mono">R${invoice.tax.toFixed(2)}</span>
                </div>
                <Separator className="bg-white/10 my-4 print:bg-gray-300" />
                <div className="flex justify-between items-center text-xl">
                  <span className="font-bold text-white print:text-black">Total</span>
                  <span className="font-black text-primary bg-primary/10 px-3 py-1 rounded-lg border border-primary/20 print:border-0 print:bg-transparent">
                    R${invoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Notes */}
            {invoice.notes && (
              <div className="border-t border-border pt-6">
                <h4 className="font-semibold text-invoice-header mb-2">Observações:</h4>
                <p className="text-sm text-invoice-muted">{invoice.notes}</p>
              </div>
            )}

            {/* Status */}
            <div className="flex justify-center mt-8">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                invoice.status === 'paid' ? 'bg-success text-success-foreground' :
                invoice.status === 'sent' ? 'bg-primary text-primary-foreground' :
                invoice.status === 'overdue' ? 'bg-destructive text-destructive-foreground' :
                'bg-muted text-muted-foreground'
              }`}>
                Status: {
                  invoice.status === 'paid' ? 'Paga' :
                  invoice.status === 'sent' ? 'Enviada' :
                  invoice.status === 'overdue' ? 'Vencida' :
                  'Rascunho'
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
);

InvoicePreview.displayName = 'InvoicePreview';