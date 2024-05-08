"use client";

import { getOrdersByPeriod, getOrdersByEmployeeAndPeriod } from '@/actions/data-load';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const ReportDetailPage = () => {
    const pathname = usePathname();
    const name = pathname.split('/').pop();
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [orders, setOrders] = useState(null);

    let reportName = "";
    let fetchData = null;

    switch (name) {
        case "status-report":
            reportName = "Отчет по статусам";
            fetchData = getOrdersByPeriod;
            break;
        case "employee-report":
            reportName = "Отчет по сотрудникам";
            fetchData = getOrdersByEmployeeAndPeriod;
            break;
        case "date-report":
            reportName = "Отчет по датам";
            fetchData = getOrdersByPeriod;
            break;
        default:
            router.back();
    }

    useEffect(() => {
        if (selectedPeriod) {
            fetchData(selectedPeriod).then(data => {
                setOrders(data);
            });
        }
    }, [selectedPeriod, fetchData]);

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
                        {name === 'employee-report' && <TableHead>Назначенный сотрудник</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders ? (
                        orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.service.name}</TableCell>
                                <TableCell>{format(order.createdAt, 'dd.MM.yyyy')}</TableCell>
                                {name === 'employee-report' && <TableCell>{order.user.name}</TableCell>}
                            </TableRow>
                        ))
                    ) : (
                        <>
                            <TableRow>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                {name === 'employee-report' && <TableCell><Skeleton className="h-4 w-full" /></TableCell>}
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                {name === 'employee-report' && <TableCell><Skeleton className="h-4 w-full" /></TableCell>}
                            </TableRow>
                            <TableRow>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-full" /></TableCell>
                                {name === 'employee-report' && <TableCell><Skeleton className="h-4 w-full" /></TableCell>}
                            </TableRow>
                        </>
                    )}
                </TableBody>
            </Table>
        </>
    );
};

export default ReportDetailPage;
