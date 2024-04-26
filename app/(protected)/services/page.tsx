"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import CustomTable, { TableColumn } from '@/components/data-table';
import { Service } from '@/types/services';
import React from 'react';
import { getAllServices } from '@/data/data-load';

const serviceColumns: TableColumn<Service>[] = [
    { accessorKey: "name", header: "Наименование", cell: ({ row }) => <div>{row.getValue("name")}</div> },
    { accessorKey: "price", header: "Цена", cell: ({ row }) => <div>{row.getValue("price")}</div> },
    { accessorKey: "category", header: "Категория", cell: ({ row }) => <div>{row.getValue("category")}</div> },
  ];


const ServicesPage = () => {
  const router = useRouter();
  const role = useCurrentRole();
  const [services, setServices] = React.useState<Service[]>([]); 

  if (role === UserRole.USER) {
    router.back(); 
  }


  React.useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    const data = await getAllServices();
    if (data) {
    setServices(data);
    }
  };

  return ( 
    <>
        <CustomTable<Service>
        data={services}
        columns={serviceColumns}
        searchableColumns={["name"]}
      />
    </>
   );
}
 
export default ServicesPage;
