import { getClientById, getClientOrders } from "@/actions/data-load";
import ClientDetailPage from "./page.client"; 
import { cache } from "react";

const ServerClientDetailPage = cache(async ({ params }: { params: { id: string } }) => {
  const { id } = params; 
  const client = await getClientById(id);
  const clientOrders = await getClientOrders(id);


  return <ClientDetailPage client={client} clientOrders={clientOrders} />;
});

export default ServerClientDetailPage;
