'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Usuario invalido.';
        default:
          return 'Algo salió mal.';
      }
    }
    throw error;
  }
}

const FormSchemaa = z.object({
  id: z.string().nonempty({ message: 'Número de documento es Requerido.' }),
  tipoid: z.string().nonempty({ message: 'Tipo de documento es Requerido.' }),
  nombre: z.string().nonempty({ message: 'Nombre es Requerido.' }),
  apellidos: z.string().min(1, { message: 'Apellido es requerido.' }),
  ticket: z.string().min(3, { message: 'Seleccione un pasaporte como minimo' }),
});

export type Statee = {
  errors?: {
    id?: string[];
    tipoid?: string[];
    nombre?: string[];
    apellidos?: string[];
    ticket?: string[];
  };
  message?: string | null;
};

const CreateCandidato = FormSchemaa.omit({});

export async function createCandidato(prevState: Statee, formData: FormData) {
  const formObject = Object.fromEntries(formData.entries());
  const validatedFields = CreateCandidato.safeParse({
    id: formObject.id,
    tipoid: formObject.tipoid,
    nombre: formObject.nombre,
    apellidos: formObject.apellidos,
    ticket: formObject.ticket,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Faltan campos.',
    };
  }
  const { id, tipoid, nombre, apellidos, ticket } = validatedFields.data;
  try {
    let parsedTicket: any;
    if (ticket) {
      parsedTicket = JSON.parse(ticket);
    }
    let adultsCount = 0;
    let kidsCount = 0;
    if (parsedTicket && Array.isArray(parsedTicket)) {
      parsedTicket.forEach((item: any) => {
        if (item.title.includes('Adultos')) {
          adultsCount += item.quantity;
        } else if (item.title.includes('Niños')) {
          kidsCount += item.quantity;
        }
      });
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_LINK}/api/taquilla/buyTicketsPresencial`,
      {
        idpark: 2,
        name: nombre,
        lastname: apellidos,
        phone_number: '2222222222',
        identity_type: tipoid,
        identity_number: id,
        adults_count: adultsCount,
        kids_count: kidsCount,
      },
    );

    return {
      message: response.data.message,
    };
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Candidate.',
    };
  }
  revalidatePath('/dashboard/candidatos');
  redirect('/dashboard/candidatos');
}

export async function validateTicket(ticketCode: any) {
  try {

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACK_LINK}/api/taquilla/validateTicket`,
      ticketCode,
    );
    return response.data.message;
  } catch (error) {
    console.error('Error al validar el ticket:', error);
    throw error; // Propagar el error
  }
}

const UpdateCandidato = FormSchemaa.omit({ id: true });

// export async function updateCandidato(
//   id: string,
//   prevState: Statee,
//   formData: FormData,
// ) {
//   const formObject = Object.fromEntries(formData.entries());
//   const validatedFields = UpdateCandidato.safeParse({
//     tipoid: formObject.tipoid,
//     nombre: formObject.nombre,
//     celular: formObject.celular,
//     cargo: formObject.cargo,
//     correo: formObject.correo,
//     motivo: formObject.motivo,
//     estado_proceso: formObject.estado_proceso,
//     fecha_envio: formObject.fecha_envio,
//     fecha_ingreso: formObject.fecha_ingreso,
//     grupo: formObject.grupo,
//     estadoCandidato: formObject.estadoCandidato
//       ? Number(formObject.estadoCandidato)
//       : undefined,
//     user_creo: formObject.user_creo ? Number(formObject.user_creo) : undefined,
//     page: formObject.page,
//     keyword: formObject.keyword,
//   });

//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//       message: 'Missing Fields. Failed to Update Candidate.',
//     };
//   }

//   const {
//     tipoid,
//     nombre,
//     celular,
//     cargo,
//     correo,
//     motivo,
//     estado_proceso,
//     fecha_envio,
//     fecha_ingreso,
//     grupo,
//     page,
//     keyword,
//     estadoCandidato,
//     user_creo,
//   } = validatedFields.data;

//   try {
//     await sql`
//       UPDATE candidato
//       SET tipoid = ${tipoid},
//           nombre = ${nombre},
//           celular = ${celular},
//           cargo = ${cargo},
//           correo = ${correo},
//           motivo = ${motivo},
//           estado_proceso = ${estado_proceso},
//           fecha_envio= ${fecha_envio || null},
//           fecha_ingreso=${fecha_ingreso || null},
//           grupo = ${grupo},
//           estadoCandidato = 1,
//           user_creo = 1
//       WHERE id = ${id}
//     `;
//   } catch (error) {
//     return { message: 'Database Error: Failed to Update Candidate.' };
//   }

//   revalidatePath('/dashboard/' + keyword + '?page=' + page);
//   redirect('/dashboard/' + keyword + '?page=' + page);
// }

export async function deleteCandidato(id: string) {
  try {
    await sql`DELETE FROM candidato WHERE id = ${id}`;
    revalidatePath('/dashboard/candidatos');
    return { message: 'Deleted Candidate' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Candidate' };
  }
}
