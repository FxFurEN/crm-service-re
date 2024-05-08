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
import { Tag } from "antd";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrder] = React.useState<Order[]>([]); 
  const [open, setOpen] = React.useState(false);
  const [ordersData, setOrdersData] = React.useState<Order | null>(null);
  const [mode, setMode] = React.useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false); 
  const [deleteRowId, setDeleteRowId] = React.useState<string | null>(null); 
  const [filterActive, setFilterActive] = React.useState(false);


  const orderColumns: TableColumn<Order>[] = [
    { accessorKey: "serviceName", header: "Услуга", cell: ({ row }) => <div>{row.getValue("serviceName")}</div> },
    { accessorKey: "executionStatus", header: "Статус", cell: ({ row }) => {
      const execution = row.original.execution;
      const lastStage = execution.length > 0 ? execution[execution.length - 1].stage : null;
      const color = lastStage ? lastStage.color : '#000000';
      const status = lastStage ? lastStage.name : 'Нет статуса';
      return <Tag color={color}>{status}</Tag>;
    }
    },
    { accessorKey: "createdAt", header: "Дата создания", cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"), "dd.MM.yyyy")}</div> },
    { accessorKey: "leadTime", header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={handleFilterOverdueOrders}
        >
          Дата выполнения
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    }, cell: ({ row }) => <div>{formatDate(row.getValue("leadTime"), "dd.MM.yyyy")}</div> },
    { accessorKey: "userName", header: "Сотрудник", cell: ({ row }) => <div>{row.getValue("userName")}</div> },
    { accessorKey: "clientName", header: "Клиент", cell: ({ row }) => <div>{row.getValue("clientName")}</div> },
  ];


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
    return data;
  };
  
  const handleFilterOverdueOrders = () => {
    if (filterActive) {
      fetchData();
      setFilterActive(false);
    } else {

      const currentDate = new Date();
      const overdueOrders = orders.filter(order => {
        const leadTime = new Date(order.leadTime);
        const isOverdue = leadTime < new Date(currentDate.setHours(0, 0, 0, 0)); // Просрочен ли заказ
        const isNotClosedOrReady = !["Закрыт", "Готов"].includes(order.execution[order.execution.length - 1].stage.name);
        return isOverdue && isNotClosedOrReady;
      });
      setOrder(overdueOrders);
      setFilterActive(true);
    }
  };
  

  const handleRowClick = (id: string) => {
    router.push(`/orders/${id}`);
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
      <DialogModal open={open} onOpenChange={setOpen} mode={mode} orderData={ordersData} onSuccess={handleAddOrUpdateSuccess} />
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
