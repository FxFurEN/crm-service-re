import { cache } from 'react'
import ClientComponent from './page.client';
import { getOrdersByEmployee, getOrdersByStatus, getOrdersLast7Days, getOverdueOrdersCount } from '@/actions/data-load';

const HomePage = cache(async () => {
  const last7DaysData = await getOrdersLast7Days();
  const byStatusData = await getOrdersByStatus();
  const byEmployeeData = await getOrdersByEmployee();
  const overdueCount = await getOverdueOrdersCount();

  const initialData = {
    last7DaysData,
    byStatusData,
    byEmployeeData,
    overdueCount,
  };

  return <ClientComponent initialData={initialData} />;
});

export default HomePage;
