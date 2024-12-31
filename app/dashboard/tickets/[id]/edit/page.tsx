import Form from '@/app/ui/candidatos/edit-form';
import Breadcrumbs from '@/app/ui/candidatos/breadcrumbs';
import { fetchCandidatoById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [candidato] = await Promise.all([
     
        fetchCandidatoById(id),
       
      ]);
      
      if (!candidato) {
        notFound();
      }
      const breadcrumbs = [
        { label: 'Cero a Siempre', href: '/dashboard/candidatos' },
        {
          label: 'Editar Candidato',
          href: '/dashboard/candidatos/'+id+'/edit',
          active: true,
        }
      ];
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
      />
      <Form candidato={candidato}grupo={'Cero a Siempre'}   breadcrumbs={breadcrumbs} />
    </main>
  );
}