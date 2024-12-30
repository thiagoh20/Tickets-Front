'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';


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
  id: z.string().nonempty({ message: 'Document ID is required.' }),
  tipoid: z.string().nonempty({ message: 'Document type is required.' }),
  nombre: z.string().nonempty({ message: 'Name is required.' }),
  celular: z.string().optional(),
  cargo: z.string().optional(),
  correo: z.string().email({ message: 'Invalid email address.' }),
  motivo: z.string().optional(),
  estado_proceso: z.string().nonempty({ message: 'Process status is required.' }),
  fecha_envio: z.string().optional(),
  fecha_ingreso: z.string().optional(),
  grupo: z.string().optional(),
  estadoCandidato: z.number().optional(),
  user_creo: z.number().optional(),
  page: z.string().optional(),
  keyword: z.string().optional(),
});

export type Statee = {
  errors?: {
    id?: string[];
    tipoid?: string[];
    nombre?: string[];
    celular?: string[];
    cargo?: string[];
    correo?: string[];
    motivo?: string[];
    estado_proceso?: string[];
    grupo?: string[];
    estadoCandidato?: string[];
    user_creo?: string[];
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
    celular: formObject.celular,
    cargo: formObject.cargo,
    correo: formObject.correo,
    motivo: formObject.motivo,
    estado_proceso: formObject.estado_proceso,
    fecha_envio: formObject.fecha_envio,
    fecha_ingreso: formObject.fecha_ingreso,
    grupo: formObject.grupo,
    estadoCandidato: formObject.estadoCandidato ? Number(formObject.estadoCandidato) : undefined,
    user_creo: formObject.user_creo ? Number(formObject.user_creo) : undefined,
    keyword: formObject.keyword,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Candidate.',
    };
  }

  const { id, tipoid, nombre, celular, cargo, correo, motivo, estado_proceso, fecha_envio, fecha_ingreso, grupo, keyword, estadoCandidato, user_creo } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO candidato (
        id, tipoid, nombre, celular, cargo, correo, motivo, estado_proceso, fecha_envio, fecha_ingreso, grupo, estadoCandidato, user_creo
      )
      VALUES (
        ${id}, ${tipoid}, ${nombre}, ${celular}, ${cargo}, ${correo}, ${motivo}, ${estado_proceso}, ${fecha_envio || null}, ${fecha_ingreso || null}, ${grupo}, 1, 1
      )
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Candidate.',
    };
  }

  revalidatePath('/dashboard/' + keyword);
  redirect('/dashboard/' + keyword);
}


const UpdateCandidato = FormSchemaa.omit({ id: true });

export async function updateCandidato(
  id: string,
  prevState: Statee,
  formData: FormData
) {
  const formObject = Object.fromEntries(formData.entries());
  const validatedFields = UpdateCandidato.safeParse({
    tipoid: formObject.tipoid,
    nombre: formObject.nombre,
    celular: formObject.celular,
    cargo: formObject.cargo,
    correo: formObject.correo,
    motivo: formObject.motivo,
    estado_proceso: formObject.estado_proceso,
    fecha_envio: formObject.fecha_envio,
    fecha_ingreso: formObject.fecha_ingreso,
    grupo: formObject.grupo,
    estadoCandidato: formObject.estadoCandidato ? Number(formObject.estadoCandidato) : undefined,
    user_creo: formObject.user_creo ? Number(formObject.user_creo) : undefined,
    page: formObject.page,
    keyword: formObject.keyword,
  });

 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Candidate.',
    };
  }

  const { tipoid, nombre, celular, cargo, correo, motivo, estado_proceso, fecha_envio, fecha_ingreso, grupo, page, keyword, estadoCandidato, user_creo } = validatedFields.data;

  try {
    await sql`
      UPDATE candidato
      SET tipoid = ${tipoid},
          nombre = ${nombre},
          celular = ${celular},
          cargo = ${cargo},
          correo = ${correo},
          motivo = ${motivo},
          estado_proceso = ${estado_proceso},
          fecha_envio= ${fecha_envio || null},
          fecha_ingreso=${fecha_ingreso || null},
          grupo = ${grupo},
          estadoCandidato = 1,
          user_creo = 1
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Candidate.' };
  }

  revalidatePath('/dashboard/' + keyword + '?page=' + page);
  redirect('/dashboard/' + keyword + '?page=' + page);
}

export async function deleteCandidato(id: string) {
  try {
    await sql`DELETE FROM candidato WHERE id = ${id}`;
    revalidatePath('/dashboard/candidatos');
    return { message: 'Deleted Candidate' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Candidate' };
  }
}



