import { getAllEmployees } from "@/actions/data-load";
import EmployeesPage from "./page.client"; 
import { cache } from "react";

const ServerEmployeesPage = cache(async () => {
  const employees = await getAllEmployees();
  return <EmployeesPage employees={employees} />;
});

export default ServerEmployeesPage;
