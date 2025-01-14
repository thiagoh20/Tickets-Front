import Form from '@/app/ui/candidatos/create-form';
import Breadcrumbs from '@/app/ui/tickets/breadcrumbs';
import { fetchCandidatos } from '@/app/lib/data';

export default async function Page() {

  const candidato = await fetchCandidatos();
  const breadcrumbs = [
    { label: 'Usuarios del sistema', href: '/dashboard/candidatos' },
    {
      label: 'Nuevo Usuario',
      href: '/dashboard/candidatos/create',
      active: true,
    }
  ];
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={breadcrumbs}
      />
      <Form candidato={candidato} breadcrumbs={breadcrumbs} />
    </main>
  );
}