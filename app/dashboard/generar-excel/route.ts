import { NextResponse } from 'next/server';
import XlsxPopulate from 'xlsx-populate';
import { fetchCandidatos } from '@/app/lib/data';

export async function GET() {
  try {
    const candidatos = await fetchCandidatos();
    const workbook = await XlsxPopulate.fromBlankAsync();
    const sheet = workbook.sheet(0);

    const headers = ["ID", "Nombre", "Tipo ID", "Celular", "Cargo", "Correo", "Motivo", "Estado Proceso", "Fecha Envío", "Fecha Ingreso", "Grupo", "Estado Candidato", "Usuario Creador"];
    headers.forEach((header, index) => {
      sheet.cell(1, index + 1).value(header);
      sheet.cell(1, index + 1).style("bold", true);
    });

    candidatos.forEach((candidato, rowIndex) => {
      sheet.cell(rowIndex + 2, 1).value(candidato.id);
      sheet.cell(rowIndex + 2, 2).value(candidato.nombre);
      sheet.cell(rowIndex + 2, 3).value(candidato.tipoid);
      sheet.cell(rowIndex + 2, 4).value(candidato.celular);
      sheet.cell(rowIndex + 2, 5).value(candidato.cargo);
      sheet.cell(rowIndex + 2, 6).value(candidato.correo);
      sheet.cell(rowIndex + 2, 7).value(candidato.motivo);
      sheet.cell(rowIndex + 2, 8).value(candidato.estado_proceso);
  
      sheet.cell(rowIndex + 2, 9).value(candidato.fecha_envio ? new Date(candidato.fecha_envio).toISOString().slice(0, 10) : '');
      sheet.cell(rowIndex + 2, 10).value(candidato.fecha_ingreso ? new Date(candidato.fecha_ingreso).toISOString().slice(0, 10) : '');

      sheet.cell(rowIndex + 2, 11).value(candidato.grupo);
      sheet.cell(rowIndex + 2, 12).value(candidato.estadoCandidato);
      sheet.cell(rowIndex + 2, 13).value(candidato.user_creo);
  });
  
    const arrayBuffer = await workbook.outputAsync();
    return new Response(arrayBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': 'attachment;',
      },
    });
  } catch (error) {
    console.error("Error al generar el archivo Excel:", error);
    return NextResponse.json({ error: 'Error al generar el archivo Excel' }, { status: 500 });
  }
}
