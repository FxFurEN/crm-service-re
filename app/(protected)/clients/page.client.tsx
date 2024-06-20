"use client";

import { useState } from 'react';
import CustomTable, { TableColumn } from "@/components/data-table";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/clients/dialog-modal";
import { Client } from "@/types/client";
import DeleteConfirmationDialog from "@/components/alert-dialog-confirm";
import { deleteClient } from "@/actions/del-data";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

const clientColumns: TableColumn<Client>[] = [
  { accessorKey: "name", header: "Клиент", cell: ({ row }) =>  <div>{row.getValue("name")}</div>},
  { accessorKey: "email", header: "Почта", cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div> },
  { accessorKey: "phone", header: "Телефон", cell: ({ row }) => <div>{row.getValue("phone")}</div> },
  { accessorKey: "sign", header: "Тип клиента", cell: ({ row }) => <div>{row.getValue("sign") ? "Юр лицо" : "Физ лицо"}</div> },
];

const ClientsPage = ({ clients }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [clientData, setClientData] = useState<Client | null>(null);
  const [mode, setMode] = useState<"edit" | "add">("add");
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteRowId, setDeleteRowId] = useState<string | null>(null);


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
      <CustomTable
        data={clients}
        columns={clientColumns}
        searchableColumns={["email"]}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        clientData={clientData}
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

export default ClientsPage;
