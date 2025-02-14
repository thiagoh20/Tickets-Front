import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import { fetchInvoices } from '@/app/lib/data';
import { string } from 'zod';
import { formatMonth } from '@/app/utils/formatMonth';

export async function GET(request: any, { params }: any) {
  try {
    const url = new URL(request.url);
    const initialDate = url.searchParams.get('initialDate');
    const finalDate = url.searchParams.get('finalDate');

    const tickets = await fetchInvoices(initialDate, finalDate)

    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    const headers = [
      'ID',
      'Nombre',
      'Apellido',
      'Correo',
      'Celular',
      'Tipo ID',
      'Número ID',
      'Fecha de Compra',
      'Fecha del Ticket',
      'Precio del Ticket',
      'Método de Pago',
      'Moneda',
      'Código del Ticket',
      'ID Operación',
      'ID Usuario',
      'Canal',
      'Descripción',
      'Estado'
    ];

    // Recorrer la cabecera y agregarla al archivo Excel
    headers.forEach((header, index) => {
      sheet.cell(1, index + 1).value(header);
      sheet.cell(1, index + 1).style('bold', true);
    });

    // Iterar sobre los datos de los tickets y agregarlos al Excel
    tickets.forEach((ticket: any, rowIndex: any) => {
      sheet.cell(rowIndex + 2, 1).value(ticket.idticket);
      sheet.cell(rowIndex + 2, 2).value(ticket.name);
      sheet.cell(rowIndex + 2, 3).value(ticket.lastname);
      sheet.cell(rowIndex + 2, 4).value(ticket.email_person);
      sheet.cell(rowIndex + 2, 5).value(ticket.phone_number);
      sheet.cell(rowIndex + 2, 6).value(ticket.identity_type);
      sheet.cell(rowIndex + 2, 7).value(ticket.identity_number);
      sheet.cell(rowIndex + 2, 8).value(new Date(ticket.createdAt).toISOString().slice(0, 10));
      sheet
      .cell(rowIndex + 2, 9)
      .value(
        ticket.date_ticket
        ? new Date(ticket.date_ticket).toISOString().slice(0, 10)
        : '',
      );
      sheet.cell(rowIndex + 2, 10).value(ticket.price_ticket);
      sheet.cell(rowIndex + 2, 11).value(ticket.type_pay);
      sheet.cell(rowIndex + 2, 12).value(ticket.type_money);
      sheet.cell(rowIndex + 2, 13).value(ticket.ticket_code);
      sheet.cell(rowIndex + 2, 14).value(ticket.id_operation);
      sheet.cell(rowIndex + 2, 15).value(ticket.user_id);
      sheet.cell(rowIndex + 2, 16).value(ticket.channel);
      sheet.cell(rowIndex + 2, 17).value(ticket.details);
      sheet.cell(rowIndex + 2, 18).value(ticket.status);
    });
    const arrayBuffer = await workbook.outputAsync();
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment;',
      },
    });
  } catch (error) {
    console.error('Error al generar el archivo Excel:', error);
    return NextResponse.json(
      { error: 'Error al generar el archivo Excel' },
      { status: 500 },
    );
  }
}
