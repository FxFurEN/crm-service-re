import { getAllCategories, getAllServices } from "@/actions/data-load";
import ServicesPage from "./page.client";
import { revalidateTag } from "next/cache";

const ServerServicesPage = async () => {
  const servicesData = await getAllServices();
  const categoriesData = await getAllCategories();

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
