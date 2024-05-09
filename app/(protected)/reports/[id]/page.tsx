"use client";

import { getOrdersByPeriod, getOrdersByEmployeeAndPeriod } from '@/actions/data-load';
import { format, formatDate, subDays, subWeeks, subMonths } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { report_by_employee } from '@/documents/tempates';
import { text, image, readOnlyText, readOnlySvg, tableBeta, line  } from "@pdfme/schemas";
import { generate } from '@pdfme/generator';
import { Template } from '@pdfme/common';

const ReportDetailPage = () => {
    const pathname = usePathname(); 
    const name = pathname.split('/').pop();
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState(null); 
    const [selectedTemplateName, setSelectedTemplateName] = useState<Template>();
    const [orders, setOrders] = useState(null); 
    const [isLoading, setIsLoading] = useState(true);

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

    const handlePeriodChange = async (selectedPeriod) => {
        if (!selectedPeriod) return; 
        try {
            setIsLoading(true);
            const data = await fetchData(selectedPeriod);
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        if (selectedPeriod !== null) {
            handlePeriodChange(selectedPeriod);
        }
    }, [selectedPeriod]);

    useEffect(() => {
        switch (name) {
            case "employee-report":
                setSelectedTemplateName(report_by_employee);  
                break;
            default:
                setSelectedTemplateName(null);
        }
    }, []);
    

    const generatePDF = () => {
        setIsLoading(true);
        let inputs = [];
    
        let startDate;
        let endDate = new Date(); 
        let period;
    
        switch (selectedPeriod) {
            case "today":
                startDate = new Date();
                period = formatDate(startDate, "dd.MM.yyyy");
                break;
            case "yesterday":
                startDate = subDays(new Date(), 1);
                period = formatDate(startDate, "dd.MM.yyyy");
                break;
            case "last-week":
                startDate = subWeeks(new Date(), 1);
                period = `${formatDate(startDate, "dd.MM.yyyy")} - ${formatDate(endDate, "dd.MM.yyyy")}`;
                break;
            case "last-month":
                startDate = subMonths(new Date(), 1);
                period = `${formatDate(startDate, "dd.MM.yyyy")} - ${formatDate(endDate, "dd.MM.yyyy")}`;
                break;
            default:
                startDate = new Date();
                period = `${formatDate(startDate, "dd.MM.yyyy")} - ${formatDate(endDate, "dd.MM.yyyy")}`;
                break;
        }
        if (selectedTemplateName == report_by_employee) {
            let serviceData = "["; 
            orders.forEach((order, index) => {
                const createdAt = formatDate(order.createdAt, "dd.MM.yyyy");
                const orderString = `[\"${createdAt}\",\"${order.service.name}\",\"${order.user.name}\"]`;
            
                serviceData += orderString;
                if (index < orders.length - 1) {
                    serviceData += ",";
                }
            });
            
            serviceData += "]"; 
            
            inputs.push({
                period: period,
                serviceData: serviceData
            });
        }
        
    
        const plugins = { text, image, readOnlyText, readOnlySvg, Table: tableBeta, line };
        generate({ template: selectedTemplateName, inputs, plugins }).then((pdf) => {
            try {
                const blob = new Blob([pdf.buffer], { type: 'application/pdf' });
                window.open(URL.createObjectURL(blob));
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Error generating PDF. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        });
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
                <Button className="last:ml-auto" onClick={generatePDF} isLoading={isLoading}>Распечатать</Button>
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
