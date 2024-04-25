"use client";

import CustomTable, { TableColumn } from "@/components/data-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/clients/dialog-modal";
import { Client } from "@/types/client";
import { getAllClients } from "@/data/data-load";
import DeleteConfirmationDialog from "@/components/alert-dialog-confirm";
import { deleteClient } from "@/actions/del-data";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const clientColumns: TableColumn<Client>[] = [
  { accessorKey: "email", header: "Почта", cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div> },
  { accessorKey: "phone", header: "Телефон", cell: ({ row }) => <div>{row.getValue("phone")}</div> },
  { accessorKey: "sign", header: "Тип клиента", cell: ({ row }) => <div>{row.getValue("sign") ? "Юр лицо" : "Физ лицо"}</div> },
];
export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = React.useState<Client[]>([]); 
  const [open, setOpen] = React.useState(false);
  const [clientData, setClientData] = React.useState<Client | null>(null);
  const [mode, setMode] = React.useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false); 
  const [deleteRowId, setDeleteRowId] = React.useState<string | null>(null); 

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllClients();
      if (data) {
        setClients(data);
      }
    };
    fetchData();
  }, []); 

  const handleRowClick = (id: string) => {
    router.push(`/clients/${id}`);
  };

  const handleFloatButtonClick = () => {
    setOpen(true);
    setMode("add");
  };
  const handleEdit = (id: string) => {
    const selectedClient = clients.find((client) => client.id === id);
    setOpen(true);
    setClientData(selectedClient);
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
      <CustomTable<Client>
        data={clients}
        columns={clientColumns}
        searchableColumns={["fullName", "email", "phone"]}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal open={open} onOpenChange={setOpen} mode={mode} clientData={clientData} />
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
