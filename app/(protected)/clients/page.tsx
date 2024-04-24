"use client";

import CustomTable, { TableColumn } from "@/components/data-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";
import { DialogModal } from "@/components/clients/dialog-modal";
import { Client } from "@/types/client";
import { getAllClients } from "@/data/data-load";

const clientColumns: TableColumn<Client>[] = [
  { accessorKey: "id",header: "ID",cell: ({ row }) => <div>{row.getValue("id")}</div>,},
  { accessorKey: "name",header: "Name",cell: ({ row }) => <div>{row.getValue("name")}</div>,},
  { accessorKey: "email",header: "Email",cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,},
  { accessorKey: "phone",header: "Phone",cell: ({ row }) => <div>{row.getValue("phone")}</div>,},
  { accessorKey: "sign",header: "Sign",cell: ({ row }) => <div>{row.getValue("sign") ? "Yes" : "No"}</div>,},
  { accessorKey: "initials",header: "Initials",cell: ({ row }) => <div>{row.getValue("initials") || "-"}</div>,},
  { accessorKey: "unp",header: "UNP",cell: ({ row }) => <div>{row.getValue("unp") || "-"}</div>,},
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

  return (
    <>
      <CustomTable<Client>
        data={clients}
        columns={clientColumns}
        searchableColumns={["fullName", "email", "phone"]}
        onRowClick={handleRowClick}
      />
      <FloatButton onClick={handleFloatButtonClick} />
      <DialogModal open={open} onOpenChange={setOpen} />
    </>
  );
}
