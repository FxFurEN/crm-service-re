import { getOrderById, getOrderExecutionHistory } from '@/actions/data-load';
import { cache } from "react";
import { revalidateTag } from "next/cache";
import OrderDetailPage from './page.client'; 

const OrderDatailPage = cache(async ({ params }: { params: { id: string } }) => {
  const { id } = params; 
  const order = await getOrderById(id);
  const executionHistory = await getOrderExecutionHistory(id);

  revalidateTag('allHistory');
  
  return <OrderDetailPage order={order} executionHistory={executionHistory} />;
});

export default OrderDatailPage;
