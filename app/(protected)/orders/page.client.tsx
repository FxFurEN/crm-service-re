"use client";

import CustomTable, { TableColumn } from "@/components/data-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/orders/dialog-modal";
import { Order } from "@/types/order";
import { formatDate } from "date-fns";
import { Tag } from "antd";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { deleteClient } from "@/actions/del-data";
import { Toaster, toast } from "sonner";
import DeleteConfirmationDialog from "@/components/alert-dialog-confirm";

const ClientOrdersPage = ({ orders }) => {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [ordersData, setOrdersData] = React.useState<Order | null>(null);
  const [mode, setMode] = React.useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [deleteRowId, setDeleteRowId] = React.useState<string | null>(null);
  const [filterActive, setFilterActive] = React.useState(false);

  const orderColumns: TableColumn<Order>[] = [
    { accessorKey: "serviceName", header: "Услуга", cell: ({ row }) => <div>{row.getValue("serviceName")}</div> },
    {
      accessorKey: "executionStatus",
      header: "Статус",
      cell: ({ row }) => {
        const execution = row.original.execution;
        const lastStage = execution.length > 0 ? execution[execution.length - 1].stage : null;
        const color = lastStage ? lastStage.color : "#000000";
        const status = lastStage ? lastStage.name : "Нет статуса";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      accessorKey: "createdAt",
      header: "Дата создания",
      cell: ({ row }) => <div>{formatDate(row.getValue("createdAt"), "dd.MM.yyyy")}</div>,
    },
    {
      accessorKey: "leadTime",
      header: ({ column }) => (
        <Button variant="ghost" onClick={handleFilterOverdueOrders}>
          Дата выполнения
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{formatDate(row.getValue("leadTime"), "dd.MM.yyyy")}</div>,
    },
    { accessorKey: "userName", header: "Сотрудник", cell: ({ row }) => <div>{row.getValue("userName")}</div> },
    { accessorKey: "clientName", header: "Клиент", cell: ({ row }) => <div>{row.getValue("clientName")}</div> },
  ];

  const handleFilterOverdueOrders = () => {
    if (filterActive) {
      setFilterActive(false);
    } else {
      const currentDate = new Date();
      const overdueOrders = orders.filter((order) => {
        const leadTime = new Date(order.leadTime);
        const isOverdue = leadTime < new Date(currentDate.setHours(0, 0, 0, 0)); // Просрочен ли заказ
        const isNotClosedOrReady = !["Закрыт", "Готов"].includes(order.execution[order.execution.length - 1].stage.name);
        return isOverdue && isNotClosedOrReady;
      });
      setOrdersData(overdueOrders);
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
          setOrdersData(orders.filter((order) => order.id !== deleteRowId));
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


  return (
    <>
      <CustomTable
        data={orders}
        columns={orderColumns}
        searchableColumns={["clientName"]}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        orderData={ordersData}
      />
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
      <Toaster richColors />
    </>
  );
};

export default ClientOrdersPage;
