import Form from '@/app/ui/candidatos/create-form';
import Breadcrumbs from '@/app/ui/candidatos/breadcrumbs';
import { fetchCandidatos } from '@/app/lib/data';
import Search from '@/app/ui/search';
import { CreateInvoice } from '@/app/ui/candidatos/buttons';

export default async function Page() {

  const candidato = await fetchCandidatos();
  const breadcrumbs = [
    { label: 'Juan Pablo II', href: '/dashboard/candidatos' },
    {
      label: 'Validar',
      href: '/dashboard/candidatos/create',
      active: true,
    }
  ];
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
      />
      
      <Form candidato={candidato} grupo={'Cero a Siempre'} breadcrumbs={breadcrumbs} />
    </main>
  );
}