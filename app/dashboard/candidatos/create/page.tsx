import Form from '@/app/ui/candidatos/create-form';
import Breadcrumbs from '@/app/ui/candidatos/breadcrumbs';
import { fetchCandidatos } from '@/app/lib/data';

export default async function Page() {

  const candidato = await fetchCandidatos();
  const breadcrumbs = [
    { label: 'Cero a Siempre', href: '/dashboard/candidatos' },
    {
      label: 'Crear',
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