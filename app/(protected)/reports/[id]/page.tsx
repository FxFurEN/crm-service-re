"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';
import { getOrdersByPeriod } from '@/actions/data-load';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns'; // Импорт функции форматирования даты

const ReportDetailPage = () => {
    const pathname = usePathname(); 
    const name = pathname.split('/').pop();
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState(null); 
    const [orders, setOrders] = useState(null); 

    let reportName = "";
    switch (name) {
      case "status-report":
        reportName = "Отчет по статусам";
        break;
      case "employee-report":
        reportName = "Отчет по сотрудникам";
        break;
      case "date-report":
        reportName = "Отчет по датам";
        break;
      default:
        router.back();
    }

    useEffect(() => {
        if (selectedPeriod) {
            handlePeriodChange(selectedPeriod);
        }
    }, [selectedPeriod]);
    
    const handlePeriodChange = async (selectedPeriod) => {
        const orders = await getOrdersByPeriod(selectedPeriod); 
        setOrders(orders); 
    };


    return ( 
        <>
            <p className="text-2xl font-semibold text-center">
                {reportName}
            </p>
            <div className="flex gap-4 items-center">
                <Select className="first:mr-auto w-[180px]" value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="today">Сегодня</SelectItem>
                            <SelectItem value="yesterday">Вчера</SelectItem>
                            <SelectItem value="last-week">Последние 7 дней</SelectItem>
                            <SelectItem value="last-month">Последний 30 дней</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Button className="last:ml-auto">Распечатать</Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Услуга</TableHead>
                        <TableHead>Дата заказа</TableHead>
                        <TableHead>Назначенный сотрудник</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders ? (
                        orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.service.name}</TableCell>
                                <TableCell>{format((order.createdAt), 'dd.MM.yyyy')}</TableCell>
                                <TableCell>{order.user.name}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <>
                            <TableRow>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                                <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default ReportDetailPage;


