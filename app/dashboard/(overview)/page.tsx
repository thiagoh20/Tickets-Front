
import ChartComposition from '@/app/ui/dashboard/chartComposition';
import Marketing from '@/app/ui/dashboard/marketing';
import PageShell from '@/app/ui/dashboard/pageShell';
const Page = ({ children }: any) => {

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <Marketing />
    </main>
    // <main className="">
    //   <PageShell/>
    //   {/* <ChartComposition/> */}
    // </main>
  );
};

export default Page;
