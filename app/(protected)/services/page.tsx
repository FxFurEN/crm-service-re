"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import CustomTable, { TableColumn } from '@/components/data-table';
import { Service } from '@/types/services';
import React, { useEffect, useState } from 'react';
import { getAllCategories, getAllServices } from '@/actions/data-load';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import FloatButton from '@/components/float-button';
import { DialogModal } from '@/components/services/dialog-modal';
import DeleteConfirmationDialog from '@/components/alert-dialog-confirm';
import { deleteService } from '@/actions/del-data';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { Button } from '@/components/ui/button';
import { Pencil, Plus } from 'lucide-react';

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
  const [open, setOpen] = React.useState(false);
  const [serviceData, setServiceData] = React.useState<Service | null>(null);
  const [mode, setMode] = React.useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteRowId, setDeleteRowId] = React.useState<string | null>(null);

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

  const handleFloatButtonClick = () => {
    setOpen(true);
    setMode("add");
  };

  const handleEdit = (id: string) => {
    const selectedService = services.find((service) => service.id === id);
    setOpen(true);
    setServiceData(selectedService);
    setMode("edit");
  };

  const handleDelete = (id: string) => {
    setDeleteRowId(id); 
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteRowId) {
        const response = await deleteService(deleteRowId);
        if (response.success) {
          toast.success(response.success); 
          setServices(services.filter(services => services.id !== deleteRowId));
        }
      }
      setDeleteRowId(null);
      setDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Что-то пошло не так"); 
    }
  };

  const handleDeleteCancel = () => {
    setDeleteRowId(null); 
    setDeleteDialogOpen(false); 
  };


  const handleAddOrUpdateSuccess = () => {
    fetchData(); 
  };

  return ( 
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-48 md:flex-shrink-0 mt-7">
        <h4 className="mb-4 text-md font-medium leading-none">
          Категории
          <Button className="ml-2 rounded-full " variant="ghost" onClick={handleFloatButtonClick}>
             <Plus size={24}/>
          </Button>
        </h4>
        <ScrollArea className="h-72 w-full md:w-48 rounded-md border">
          {categories.length > 0 ? (
            <div className="p-4">
              {categories.map((category, index) => (
                <div key={index} className="text-sm">
                    {category.name}
                    <Button className="ml-2 rounded-full" variant="ghost" onClick={handleFloatButtonClick}>
                      <Pencil />
                    </Button>
                </div>
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
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        <FloatButton onClick={handleFloatButtonClick} />
        <DialogModal open={open} onOpenChange={setOpen} mode={mode} serviceData={serviceData} onSuccess={handleAddOrUpdateSuccess} />
        <DeleteConfirmationDialog
            open={isDeleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
        />
      </div>
      <Toaster richColors  />
    </div>
  );
}

export default ServicesPage;
