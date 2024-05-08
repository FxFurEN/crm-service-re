"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import CustomTable, { TableColumn } from '@/components/data-table';
import { Service } from '@/types/services';
import React, { useEffect, useState } from 'react';
import { getAllCategories, getAllServices } from '@/actions/data-load';
import FloatButton from '@/components/float-button';
import { DialogModal } from '@/components/services/dialog-modal-service';
import DeleteConfirmationDialog from '@/components/alert-dialog-confirm';
import { deleteService } from '@/actions/del-data';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { DialogModalCategory } from '@/components/services/dialog-modal-category';
import CategoryList from './_components/category-list';
import { Skeleton } from '@/components/ui/skeleton';

const serviceColumns: TableColumn<Service>[] = [
  { accessorKey: "name", header: "Наименование", cell: ({ row }) => <div>{row.getValue("name")}</div> },
  { accessorKey: "price", header: "Цена, BYN", cell: ({ row }) => <div>{row.getValue("price")}</div> },
  { accessorKey: "categoryName", header: "Категория", cell: ({ row }) => <div>{row.getValue("categoryName")}</div> },
];

const ServicesPage = () => {
  const router = useRouter();
  const role = useCurrentRole();
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [open, setOpen] = React.useState(false);
  const [openCategory, setOpenCategory] = React.useState(false);
  const [serviceData, setServiceData] = React.useState<Service | null>(null);
  const [categoryData, setCategoryData] = React.useState<Service | null>(null);
  const [mode, setMode] = React.useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteRowId, setDeleteRowId] = React.useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);

  if (role === UserRole.USER) {
    router.back(); 
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const servicesData = await getAllServices();
    if (servicesData) {
      const transformedData = servicesData.map(services => ({
        ...services,
        categoryName: services.category.name
      }));
      setServices(transformedData);
    }
    const categoriesData = await getAllCategories();
    if (categoriesData) {
      setCategories(categoriesData);
      setLoadingCategories(false); 
    }
  };

  const handleFloatButtonClick = () => {
    setOpen(true);
    setMode("add");
  };

  const handleCategoryButtonClick = () => {
    setOpenCategory(true);
    setMode("add");
  };

  const handleEdit = (id: string) => {
    const selectedService = services.find((service) => service.id === id);
    setOpen(true);
    setServiceData(selectedService);
    setMode("edit");
  };

  const handleEditCategory = (id: string) => {
    const selectedCategory = categories.find((category) => category.id === id);
    setOpenCategory(true);
    setCategoryData(selectedCategory);
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
    <div className="flex mr-5 ml-5 flex-col md:flex-row">
          {loadingCategories ? ( 
              <Skeleton className="h-[340px] w-[220px]" />
          ) : (
            <CategoryList categories={categories} onEditCategory={handleEditCategory} onCategoryButtonClick={handleCategoryButtonClick} />
          )}
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
        <DialogModalCategory open={openCategory} onOpenChange={setOpenCategory} mode={mode} categoryData={categoryData} onSuccess={handleAddOrUpdateSuccess} />
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

