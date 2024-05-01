"use client";

import CustomTable, { TableColumn } from "@/components/data-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/orders/dialog-modal";
import { Order } from "@/types/order";
import { getAllOrders } from "@/actions/data-load";
import DeleteConfirmationDialog from "@/components/alert-dialog-confirm";
import { deleteClient } from "@/actions/del-data";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { formatDate } from "date-fns";

const orderColumns: TableColumn<Order>[] = [
  { accessorKey: "serviceName", header: "Услуга", cell: ({ row }) => <div>{row.getValue("serviceName")}</div> },
  { accessorKey: "createdAt", header: "Дата создания", cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"), "dd.MM.yyyy")}</div> },
  { accessorKey: "leadTime", header: "Дата выполнения", cell: ({ row }) => <div>{formatDate(row.getValue("leadTime"), "dd.MM.yyyy")}</div> },
  { accessorKey: "userName", header: "Сотрудник", cell: ({ row }) => <div>{row.getValue("userName")}</div> },
  { accessorKey: "clientName", header: "Клиент", cell: ({ row }) => <div>{row.getValue("clientName")}</div> },
];


export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrder] = React.useState<Order[]>([]); 
  const [open, setOpen] = React.useState(false);
  const [ordersData, setOrdersData] = React.useState<Order | null>(null);
  const [mode, setMode] = React.useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false); 
  const [deleteRowId, setDeleteRowId] = React.useState<string | null>(null); 

  React.useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    const data = await getAllOrders();
    if (data) {
      const transformedData = data.map(order => ({
        ...order,
        serviceName: order.service.name,
        userName: order.user.name,
        clientName: order.client.name ? order.client.name : order.client.initials,
      }));
      setOrder(transformedData);
    }
  };
  

  const handleRowClick = (id: string) => {
    router.push(`/clients/${id}`);
  };

  const handleFloatButtonClick = () => {
    setOpen(true);
    setMode("add");
  };

  const handleEdit = (id: string) => {
    const selectedOrder = orders.find((order) => order.id === id);
    setOpen(true);
    setOrdersData(selectedOrder);
    setMode("edit");
  };

  const handleDelete = (id: string) => {
    setDeleteRowId(id); 
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (deleteRowId) {
        const response = await deleteClient(deleteRowId);
        if (response.success) {
          toast.success(response.success); 
          setOrder(orders.filter(order => order.id !== deleteRowId)); 
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
    <>
      <CustomTable<Order>
        data={orders}
        columns={orderColumns}
        searchableColumns={["clientName"]}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal open={open} onOpenChange={setOpen} mode={mode} ordersData={ordersData} onSuccess={handleAddOrUpdateSuccess} />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <Toaster richColors  />
    </>
  );
}
