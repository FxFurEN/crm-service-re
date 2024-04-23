"use client";

import CustomTable, { TableColumn } from "@/components/data-table";
import * as React from "react";
import { useRouter } from "next/navigation";
import FloatButton from "@/components/float-button";

export type Client = {
  id: string;
  fullName: string;
  clientType: "individual" | "corporate";
  email: string;
  phone: string;
};

const clientColumns: TableColumn<Client>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => <div>{row.getValue("fullName")}</div>,
  },
  {
    accessorKey: "clientType",
    header: "Client Type",
    cell: ({ row }) => <div>{row.getValue("clientType")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
];

const clientData: Client[] = [
  {
    id: "1",
    fullName: "John Doe",
    clientType: "individual",
    email: "john.doe@example.com",
    phone: "+1234567890",
  },
  {
    id: "2",
    fullName: "ABC Inc.",
    clientType: "corporate",
    email: "info@abcinc.com",
    phone: "+9876543210",
  },
  {
    id: "3",
    fullName: "Jane Smith",
    clientType: "individual",
    email: "jane.smith@example.com",
    phone: "+1987654321",
  },
];

export default function ClientsPage() {
  const router = useRouter();

  const handleRowClick = (id: string) => {
    // Navigate to the dynamic [id] page with the selected id
    router.push(`/clients/${id}`);
  };

  return (
    <>
      <CustomTable<Client> 
        data={clientData} 
        columns={clientColumns} 
        searchableColumns={["fullName", "email", "phone"]} 
        onRowClick={handleRowClick} />
      <FloatButton onClick={() => console.log('Button clicked!')} />
    </>
    
  );
}
