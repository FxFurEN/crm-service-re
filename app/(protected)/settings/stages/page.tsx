import { getAllStages } from '@/actions/data-load';
import StagesPage from './page.client'; 
import { cache } from 'react';
import { revalidatePath, revalidateTag } from 'next/cache';
import AccessPage from '@/components/access.denied';
import { currentRole } from '@/lib/auth';

const ServerStagesPage = cache(async () => {
  const stages = await getAllStages();
  const userRole = await currentRole();

  if (userRole !== 'ADMIN') {
    return <AccessPage />;
  }

  revalidateTag('allStages');
  revalidatePath('/settings/stages');
  return <StagesPage stages={stages} />;
});

export default ServerStagesPage;
