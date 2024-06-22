"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'; 

const EmployeesPage = ({ employees }) => {

  return (
    <>
      <Card className="w-full mt-4 border-none">
        <CardHeader>
          <CardTitle>Сотрудники</CardTitle>
        </CardHeader>
        <CardContent className="max-h-[500px] overflow-y-auto">
          {employees.map((employee, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src={employee.image} alt="Avatar" />
                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{employee.name}</p>
                <p className="text-sm text-muted-foreground">{employee.email}, {employee.role === "ADMIN" ? "Администратор" : "Сотрудник"}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}

export default EmployeesPage;
