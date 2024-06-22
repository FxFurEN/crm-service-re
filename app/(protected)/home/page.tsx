import { cache } from 'react';
import ClientComponent from './page.client';
import { getOrdersByEmployee, getOrdersByStatus, getOrdersLast7Days, getOverdueOrdersCount } from '@/actions/data-load';

const HomePage = cache(async () => {
  const last7DaysData = await getOrdersLast7Days();
  const byStatusData = await getOrdersByStatus();
  const ordersByEmployee = await getOrdersByEmployee();
  const overdueCount = await getOverdueOrdersCount();

  const processedOrdersByEmployee = ordersByEmployee?.map(employee => {
    const name = employee.name || '';
    const lastName = name.split(' ')[0];
    return {
      ...employee,
      name: lastName,
    };
  });

  const initialData = {
    last7DaysData,
    byStatusData,
    byEmployeeData: processedOrdersByEmployee, 
    overdueCount,
  };

  return <ClientComponent initialData={initialData} />;
});

export default HomePage;
