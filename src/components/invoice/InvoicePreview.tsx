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
        <Card className="bg-gradient-invoice shadow-invoice print:shadow-none print:border-0">
          <CardContent className="p-8 print:p-6">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">FATURA</h1>
                <div className="text-invoice-muted">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-invoice-header mb-3 border-b border-primary pb-1">
                  DADOS DA EMPRESA
                </h3>
                <div className="space-y-1 text-sm">
                  <p className="font-semibold text-invoice-text">{invoice.company.name}</p>
                  <p className="text-invoice-muted">{invoice.company.address}</p>
                  <p className="text-invoice-muted">Tel: {invoice.company.phone}</p>
                  <p className="text-invoice-muted">Email: {invoice.company.email}</p>
                  <p className="text-invoice-muted">NIF: {invoice.company.taxId}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-invoice-header mb-3 border-b border-primary pb-1">
                  DADOS DO CLIENTE
                </h3>
                <div className="space-y-1 text-sm">
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
            <div className="mb-8">
              <h3 className="font-semibold text-invoice-header mb-4 border-b border-primary pb-1">
                PRODUTOS / SERVIÇOS
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-invoice-light">
                      <th className="text-left p-3 text-sm font-semibold text-invoice-header border-b border-border">
                        Descrição
                      </th>
                      <th className="text-center p-3 text-sm font-semibold text-invoice-header border-b border-border w-20">
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
                      <tr key={product.id} className={index % 2 === 0 ? 'bg-background' : 'bg-invoice-light'}>
                        <td className="p-3 text-sm border-b border-border/50">
                          <div>
                            <p className="font-medium text-invoice-text">{product.name}</p>
                            {product.description && (
                              <p className="text-xs text-invoice-muted mt-1">{product.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-sm text-center border-b border-border/50 text-invoice-text">
                          {product.quantity}
                        </td>
                        <td className="p-3 text-sm text-right border-b border-border/50 text-invoice-text">
                          R${product.price.toFixed(2)}
                        </td>
                        <td className="p-3 text-sm text-right border-b border-border/50 font-semibold text-invoice-text">
                          R${product.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals */}
            <div className="flex justify-end mb-8">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-invoice-muted">Subtotal:</span>
                  <span className="text-invoice-text">R${invoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-invoice-muted">IVA (23%):</span>
                  <span className="text-invoice-text">R${invoice.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-invoice-header">Total:</span>
                  <span className="text-success">R${invoice.total.toFixed(2)}</span>
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