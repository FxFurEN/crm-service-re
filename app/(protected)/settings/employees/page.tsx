import { getAllEmployees } from "@/actions/data-load";
import EmployeesPage from "./page.client"; 
import { cache } from "react";
import { revalidatePath } from "next/cache";
import AccessPage from "@/components/access.denied";
import { currentRole } from "@/lib/auth";

const ServerEmployeesPage = cache(async () => {
  const employees = await getAllEmployees();
  const userRole = await currentRole();

  if (userRole !== 'ADMIN') {
    return <AccessPage />;
  }

  revalidatePath('/settings/employees')
  return <EmployeesPage employees={employees} />;
});

export default ServerEmployeesPage;
