import { getAllOrders } from "@/actions/data-load";
import OrdersPage from "./page.client";
import { cache } from "react";
import { revalidateTag } from "next/cache";

const OrderPage = cache(async () => {
  const orders = await getAllOrders();
  
  const transformedOrders = orders?.map(order => ({
    ...order,
    serviceName: order.service.name,
    userName: order.user.name,
    clientName: order.client.name ? order.client.name : order.client.initials,
  }));

  revalidateTag('allOrders');
  
  return <OrdersPage orders={transformedOrders}/>;
});

export default OrderPage;