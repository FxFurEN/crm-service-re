"use client";

import CustomTable, { TableColumn }  from '@/components/data-table';
import { Employee } from '@/types/employee';
import useRedirectIfUser from '@/hooks/use-redirect-User';

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
  useRedirectIfUser();


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
