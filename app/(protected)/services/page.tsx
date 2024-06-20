import { getAllCategories, getAllServices } from "@/actions/data-load";
import ServicesPage from "./page.client";
import { revalidateTag } from "next/cache";
import { currentRole } from "@/lib/auth";
import AccessPage from "@/components/access.denied";

const ServerServicesPage = async () => {
  const servicesData = await getAllServices();
  const categoriesData = await getAllCategories();
  const userRole = await currentRole();

  if (userRole !== 'ADMIN') {
    return <AccessPage />;
  }

  const transformedServices = servicesData?.map(service => ({
    ...service,
    categoryName: service.category.name,
  }));

  revalidateTag('allServiceAndCategory');

  return (
    <ServicesPage
      initialServices={transformedServices}
      initialCategories={categoriesData}
    />
  );
};

export default ServerServicesPage;
