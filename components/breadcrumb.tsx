import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

const pathTranslations: {
    [key: string]: string;
  } = {
    home: "Главная",
    orders: "Заказы",
    clients: "Клиенты",
    services: "Услуги",
    reports: "Отчет",
    settings: "Настройки",
    stages: "Статусы",
    profile: "Профиль",
    employees: "Сотрудники",
  };

export function BreadcrumbDemo() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => (
          <React.Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {index < pathSegments.length - 1 ? (
                <BreadcrumbLink href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                  {pathTranslations[segment] || segment}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{pathTranslations[segment] || segment}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
