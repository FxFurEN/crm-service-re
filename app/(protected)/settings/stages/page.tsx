import { getAllStages } from '@/actions/data-load';
import StagesPage from './page.client'; 
import { cache } from 'react';
import { revalidateTag } from 'next/cache';

const ServerStagesPage = cache(async () => {
  const stages = await getAllStages();

  revalidateTag('allStages');

  return <StagesPage stages={stages} />;
});

export default ServerStagesPage;
