"use client";

import { getOrdersByPeriod, getOrdersByEmployeeAndPeriod, getAllEmployees } from '@/actions/data-load';
import { format, formatDate, subDays, subWeeks, subMonths } from 'date-fns';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { report_by_employee, report_by_date } from '@/documents/tempates';
import { text, image, readOnlyText, readOnlySvg, tableBeta, line } from "@pdfme/schemas";
import { generate } from '@pdfme/generator';
import { Template, Font } from '@pdfme/common';
import { CalendarIcon } from "@radix-ui/react-icons"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const ReportDetailPage = () => {
    const pathname = usePathname();
    const name = pathname.split('/').pop();
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedTemplateName, setSelectedTemplateName] = useState<Template>();
    const [orders, setOrders] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [employees, setEmployees] = useState([]);
    const [date, setDate] = useState<DateRange | undefined>();

    let reportName = "";
    let fetchData = null;

    switch (name) {
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
        try {
            setIsLoading(true);
            if (name === "employee-report" && selectedEmployee) {
                const data = await fetchData(selectedEmployee, selectedPeriod);
                setOrders(data);
            } else if (name === "date-report") {
                if (selectedPeriod === 'manual' && date) {
                    const startDate = date.from;
                    const endDate = date.to || date.from; 
                    const data = await fetchData(selectedPeriod, startDate, endDate);
                    setOrders(data);
                }  else {
                    const data = await fetchData(selectedPeriod);
                    setOrders(data);
                }
                
            }
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
    }, [selectedPeriod, selectedEmployee, date]);

    useEffect(() => {
        switch (name) {
            case "employee-report":
                setSelectedTemplateName(report_by_employee);
                fetchEmployees();
                break;
            case "date-report":
                setSelectedTemplateName(report_by_date);
                break;
            default:
                setSelectedTemplateName(null);
        }
    }, []);


    const fetchEmployees = async () => {
        try {
            const employeeData = await getAllEmployees();
            setEmployees(employeeData);
        } catch (error) {
            console.error('Error fetching employee:', error);
        }
    };

    const generatePDF = async () => {
        setIsLoading(true);
        let inputs = [];

        let startDate;
        let endDate = new Date();
        let period;

        const font = {
            sans_serif: {
                data: 'https://fonts.gstatic.com/s/notosanskr/v36/PbyxFmXiEBPT4ITbgNA5Cgms3VYcOA-vvnIzzuoyeLTq8H4hfeE.ttf',
                fallback: true,
            },
        };

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
                case "manual":
                    if (date && date.from && date.to) {
                        startDate = date.from;
                        endDate = date.to;
                        period = `${formatDate(startDate, "dd.MM.yyyy")} - ${formatDate(endDate, "dd.MM.yyyy")}`;
                    } else {
                        startDate = new Date();
                        period = formatDate(startDate, "dd.MM.yyyy");
                    }
                    break;

            default:
                startDate = new Date();
                period = `${formatDate(startDate, "dd.MM.yyyy")} - ${formatDate(endDate, "dd.MM.yyyy")}`;
                break;
        }
        if (selectedTemplateName === report_by_employee) {
            let serviceData = "[";
            let employeeData;
            if (selectedEmployee) {
                const allEmployees = await getAllEmployees();
                const employee = allEmployees.find(emp => emp.id === selectedEmployee);
                if (employee) {
                    const roleText = employee.role === 'Admin' ? 'Администратор' : 'Сотрудник';
                    employeeData = `Сотрудник: ${employee.name}\nДолжность: ${roleText}`;
                }
            }   
            orders.forEach((order, index) => {
                const createdAt = formatDate(order.createdAt, "dd.MM.yyyy");
                const number = index + 1;
                const orderString = `[\"${number}\",\"${createdAt}\",\"${order.service.name}\"]`;

                serviceData += orderString;
                if (index < orders.length - 1) {
                    serviceData += ",";
                }
            });

            serviceData += "]";

            inputs.push({
                employeeData: employeeData,
                period: period,
                serviceData: serviceData
            });
        } else if (selectedTemplateName === report_by_date) {
            let serviceData = "[";
            orders.forEach((order, index) => {
                const createdAt = formatDate(order.createdAt, "dd.MM.yyyy");
                const number = index + 1;
                const orderString = `[\"${number}\",\"${order.service.name}\",\"${createdAt}\"]`;

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
        generate({ template: selectedTemplateName, inputs, plugins, options: { font } }).then((pdf) => {
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

    const determinePeriod = (selectedDate) => {
        if (!selectedDate || !selectedDate.from) {
            return null;
        } else if (selectedDate.to) {
            return 'manual';
        } else {
            const currentDate = new Date();
            const selectedFrom = new Date(selectedDate.from);
    
            if (formatDate(selectedFrom, 'yyyy-MM-dd') === formatDate(currentDate, 'yyyy-MM-dd')) {
                return 'today';
            } else if (formatDate(selectedFrom, 'yyyy-MM-dd') === formatDate(subDays(currentDate, 1), 'yyyy-MM-dd')) {
                return 'yesterday';
            } else {
                return 'manual';
            }
        }
    };
    

    return (
        <>
            <p className="text-2xl font-semibold text-center">
                {reportName}
            </p>
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <Select className="first:mr-auto w-[180px]" value={selectedPeriod} onValueChange={setSelectedPeriod} >
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Периоды</SelectLabel>
                            <SelectItem value="today">Сегодня</SelectItem>
                            <SelectItem value="yesterday">Вчера</SelectItem>
                            <SelectItem value="last-week">Последние 7 дней</SelectItem>
                            <SelectItem value="last-month">Последний 30 дней</SelectItem>
                            {name === 'date-report' &&  <SelectItem value="manual">Выбрать диапазон</SelectItem>}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                {name === 'employee-report' && 
                    <Select className="first:mr-auto w-[180px]" value={selectedEmployee} onValueChange={setSelectedEmployee}>
                        <SelectTrigger>
                            <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Сотрудники</SelectLabel>
                                {employees.map((employee) => (
                                    <SelectItem key={employee.id} value={employee.id}>
                                        {employee.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                }
                {name === 'date-report' && selectedPeriod === "manual" && 
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-full md:w-auto justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Выберите дату</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={(selectedDate) => {
                            const period = determinePeriod(selectedDate);
                            setSelectedPeriod(period);
                            setDate(selectedDate);
                        }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                }
                <Button className="w-full md:w-auto" onClick={generatePDF} isLoading={isLoading}>Распечатать</Button>
            </div>
            <Table className='mt-5'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Услуга</TableHead>
                        <TableHead>Дата заказа</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders ? (
                        orders.map(order => (
                            <TableRow key={order.id}>
                                <TableCell>{order.service.name}</TableCell>
                                <TableCell>{format(order.createdAt, 'dd.MM.yyyy')}</TableCell>
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