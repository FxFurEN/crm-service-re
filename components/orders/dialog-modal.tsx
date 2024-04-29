"use client";

import { useEffect, useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Order } from '@/types/order';
import { DialogModalProps} from '@/types/dialog-props';
import { OrderSchema } from '@/schemas';
import { addOrder } from '@/actions/add-data';
import { updateService } from '@/actions/edit-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllClients, getAllEmployees, getAllServices } from '@/actions/data-load';
import { CalendarIcon } from 'lucide-react';
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Textarea } from '@/components/ui/textarea';

export function DialogModal({ open, onOpenChange, mode = "add", orderData, onSuccess }:  DialogModalProps<Order>) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [clients, setClients] = useState([]); 
  const [employees, setEmployee] = useState([]); 
  const [services, setServices] = useState([]);

  const form = useForm({
    resolver: zodResolver(OrderSchema),
    values: {
      id: orderData?.id ?? "",
      createdAt: orderData?.createdAt ?? "",
      comments: orderData?.comments ?? "",
      leadTime: orderData?.leadTime ?? "",
      userId: orderData?.userId ?? "", 
      clientId: orderData?.clientId ?? "", 
      serviceId: orderData?.serviceId ?? "",
    },
  });

  useEffect(() => {
    fetchClients();
    fetchServices();
    fetchEmployees();
  }, []);

  const fetchClients = async () => {
    try {
      const clientsData = await getAllClients();
      setClients(clientsData);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const servicesData = await getAllServices();
      setServices(servicesData);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const employeeData = await getAllEmployees();
      setEmployee(employeeData);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const onSubmit = async (data: z.infer<typeof OrderSchema>) => {
    setError("");
    setSuccess("");
  
    startTransition(() => {
      if (mode === "add") {
        addOrder({ ...data }) 
          .then(() => {
            setSuccess("Заказ успешно добавлена");
            onSuccess && onSuccess();
          })
          .catch((error) => {
            setError("Ошибка при добавлении заказа");
          });
      } else if (mode === "edit" && orderData) {
        updateService(orderData.id, { ...data })
          .then(() => {
            setSuccess("Заказ успешно обновлен");
            onSuccess && onSuccess(); 
          })
          .catch((error) => {
            setError("Ошибка при обновлении заказа");
          });
      }
    });
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form 
          id="serviceForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{mode === "add" ? "Добавить заказ" : "Редактировать заказ"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
            <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Услуга</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите услугу" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Дата создания</FormLabel>
                    <div className="flex items-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leadTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Время выполнения</FormLabel>
                    <div className="flex items-center">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Выберите дату</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="clientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Клиент</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите клиента" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.initials ? client.initials : client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Сотрудник</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите сотрудника" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employees.map((employee) => (
                          <SelectItem key={employee.id} value={employee.id}>
                            {employee.name}, {employee.role === 'ADMIN' ? 'Администратор' : 'Сотрудник'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Комментарий к заказу</FormLabel>
                    <Textarea
                      className="resize-none"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                isLoading={isPending}
                type="submit"
                form="serviceForm"
                className="w-full"
              >
                {mode === "add" ? "Добавить" : "Сохранить"}
              </Button>
            </DialogFooter>
            <FormError message={error} />
            <FormSuccess message={success} />
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
}
