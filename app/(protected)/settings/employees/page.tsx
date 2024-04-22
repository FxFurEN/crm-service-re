"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import CustomTable, { TableColumn }  from '@/components/data-table';
import { Client } from '@/types/client';

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



const EmployeesPage = () => {
  const router = useRouter();
  const role = useCurrentRole();

  if (role === UserRole.USER) {
    router.back(); 
  }

  return ( 
    <>
        <p className="text-2xl font-semibold text-center">
          Сотрудники
        </p>
        <div>
          <CustomTable<Client> 
            data={clientData} 
            columns={clientColumns} 
            searchableColumns={["fullName", "email", "phone"]} 
          />
        </div>
        
    </>
   );
}
 
export default EmployeesPage;
