"use client";

import CustomTable, { TableColumn } from "@/components/data-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/clients/dialog-modal";
import { Client } from "@/types/client";
import { getAllClients } from "@/data/data-load";

const clientColumns: TableColumn<Client>[] = [
  { accessorKey: "email", header: "Почта", cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div> },
  { accessorKey: "phone", header: "Телефон", cell: ({ row }) => <div>{row.getValue("phone")}</div> },
  { accessorKey: "sign", header: "Тип клиента", cell: ({ row }) => <div>{row.getValue("sign") ? "Юр лицо" : "Физ лицо"}</div> },
];
export default function ClientsPage() {
  const router = useRouter();
  const [clients, setClients] = React.useState<Client[]>([]); 
  const [open, setOpen] = React.useState(false);

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
  };
  const handleEdit = (id: string) => {
    // Open the dialog modal for editing with the selected client's data
    setOpen(true);
    // You can fetch the client data based on the id and set it to the form fields
  };

  return (
    <>
      <CustomTable<Client>
        data={clients}
        columns={clientColumns}
        searchableColumns={["fullName", "email", "phone"]}
        onRowClick={handleRowClick}
        onEdit={handleEdit}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal open={open} onOpenChange={setOpen} />
    </>
  );
}
