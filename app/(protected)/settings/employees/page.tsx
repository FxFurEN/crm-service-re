"use client";

import { useRouter } from 'next/navigation';
import { UserRole } from "@prisma/client";
import { useCurrentRole } from "@/hooks/use-current-role";
import CustomTable, { TableColumn }  from '@/components/data-table';
import { Employee } from '@/types/employee';

const employeeColumns: TableColumn<Employee>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "initials",
    header: "Initials",
    cell: ({ row }) => <div>{row.getValue("initials")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "sign",
    header: "Sign",
    cell: ({ row }) => <div>{row.getValue("sign") ? "Yes" : "No"}</div>,
  },
  {
    accessorKey: "position",
    header: "Position",
    cell: ({ row }) => <div>{row.getValue("position")}</div>,
  },
];

const employeeData: Employee[] = [
  {
    id: "1",
    initials: "JD",
    email: "john.doe@example.com",
    sign: false,
    position: "Manager",
  },
  {
    id: "2",
    initials: "AS",
    email: "alice.smith@example.com",
    sign: true,
    position: "Developer",
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
          <CustomTable<Employee> 
            data={employeeData} 
            columns={employeeColumns} 
            searchableColumns={["email"]} 
          />
        </div>
        
    </>
   );
}
 
export default EmployeesPage;
