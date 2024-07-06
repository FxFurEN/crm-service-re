import { getAllCategories, getAllServices } from "@/actions/data-load";
import ServicesPage from "./page.client";
import { revalidatePath } from 'next/cache'
import { currentRole } from "@/lib/auth";
import AccessPage from "@/components/access.denied";
import { cache } from "react";

const ServerServicesPage = cache(async () => {
  const userRole = await currentRole();

  if (userRole !== 'ADMIN') {
    return <AccessPage />;
  }

  const servicesData = await getAllServices();
  const categoriesData = await getAllCategories();

  const transformedServices = servicesData?.map(service => ({
    ...service,
    categoryName: service.category.name,
  }));

  revalidatePath('/services')

  return (
    <ServicesPage
      initialServices={transformedServices}
      initialCategories={categoriesData}
    />
  );
});

export default ServerServicesPage;
