"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import CustomTable, { TableColumn } from '@/components/data-table';
import { Service } from '@/types/services';
import React, { useEffect, useState } from 'react';
import { getAllCategories, getAllServices } from '@/data/data-load';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const serviceColumns: TableColumn<Service>[] = [
  { accessorKey: "name", header: "Наименование", cell: ({ row }) => <div>{row.getValue("name")}</div> },
  { accessorKey: "price", header: "Цена", cell: ({ row }) => <div>{row.getValue("price")}</div> },
  { accessorKey: "category", header: "Категория", cell: ({ row }) => <div>{row.getValue("category")}</div> },
];

const ServicesPage = () => {
  const router = useRouter();
  const role = useCurrentRole();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  if (role === UserRole.USER) {
    router.back(); 
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const servicesData = await getAllServices();
    if (servicesData) {
      setServices(servicesData);
    }

    const categoriesData = await getAllCategories();
    if (categoriesData) {
      setCategories(categoriesData);
    }
  };

  return ( 
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-48 md:flex-shrink-0 mt-7">
        <h4 className="mb-4 text-md font-medium leading-none">Категории</h4>
        <ScrollArea className="h-72 w-full md:w-48 rounded-md border">
          {categories.length > 0 ? (
            <div className="p-4">
              {categories.map((category) => (
                <>
                  <div key={category} className="text-sm">
                    {category}
                  </div>
                  <Separator className="my-2" />
                </>
              ))}
            </div>
          ) : (
            <p className="text-center mt-5">Нет результатов</p>
          )}
        </ScrollArea>
      </div>
      <div className="w-full">
        <CustomTable<Service>
          data={services}
          columns={serviceColumns}
          searchableColumns={["name"]}
        />
      </div>
    </div>
  );
}

export default ServicesPage;
