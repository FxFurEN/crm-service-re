import { getAllClients } from "@/actions/data-load";
import ClientsСomponentPage from "./page.client";
import { cache } from "react";
import { revalidateTag } from "next/cache";

const ClientsPage = cache(async () => {
  const clients = await getAllClients();
  const transformedClients = clients?.map(client => ({
    ...client,
    name: client.name ? client.name : client.initials,
  }));

  revalidateTag('allClients');

  return  <ClientsСomponentPage clients={transformedClients} />;;
 
});

export default ClientsPage;
