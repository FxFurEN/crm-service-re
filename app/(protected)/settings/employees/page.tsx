"use client";

import { useEffect, useState } from 'react';
import CustomTable, { TableColumn } from '@/components/data-table';
import { Employee } from '@/types/employee';
import useRedirectIfUser from '@/hooks/use-redirect-User';
import { getAllEmployees } from '@/actions/data-load';


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
    header: "Роль",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
  }
];

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  useRedirectIfUser();

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = await getAllEmployees();
      if (data) {
        setEmployees(data);
      }
    };
    fetchEmployees();
  }, []);

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
