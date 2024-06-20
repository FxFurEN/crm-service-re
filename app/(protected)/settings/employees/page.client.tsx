"use client";

import CustomTable, { TableColumn } from '@/components/data-table';
import { Employee } from '@/types/employee';
import useRedirectIfUser from '@/hooks/use-redirect-User';

const employeeColumns: TableColumn<Employee>[] = [
  {
    accessorKey: "email",
    header: "Почта",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "name",
    header: "Имя",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "role",
    header: "Должность",
    cell: ({ row }) => (
      <div>
        {row.getValue("role") === "ADMIN" ? "Администратор" : "Сотрудник"}
      </div>
    ),
  }
];

const EmployeesPage = ({ employees }) => {
  useRedirectIfUser();

  return (
    <>
      <p className="text-2xl font-semibold text-center">
        Сотрудники
      </p>
      <div>
        <CustomTable<Employee> 
          data={employees} 
          columns={employeeColumns} 
          searchableColumns={["email"]} 
        />
      </div>
    </>
  );
}

export default EmployeesPage;
