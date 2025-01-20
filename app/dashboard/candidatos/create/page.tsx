import Form from '@/app/ui/candidatos/create-form';
import Breadcrumbs from '@/app/ui/tickets/breadcrumbs';


export default async function Page() {

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
      <Form breadcrumbs={breadcrumbs} />
    </main>
  );
}