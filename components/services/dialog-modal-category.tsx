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
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { Service } from '@/types/services';
import { DialogModalProps} from '@/types/dialog-props';
import { ServiceSchema } from '@/schemas';
import { addService } from '@/actions/add-data';
import { updateService } from '@/actions/edit-data';
import { getAllCategories } from '@/actions/data-load';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function DialogModalCategory({ open, onOpenChange, mode = "add", serviceData, onSuccess }:  DialogModalProps<Service>) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [categories, setCategories] = useState([]); 

  const form = useForm({
    resolver: zodResolver(ServiceSchema),
    values: {
      name: serviceData?.name ?? "",
      price: serviceData?.price ?? "",
      categoryId: serviceData?.categoryId ?? "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onSubmit = async (data: z.infer<typeof ServiceSchema>) => {
    setError("");
    setSuccess("");
  
    startTransition(() => {
      if (mode === "add") {
        addService({ ...data }) 
          .then(() => {
            setSuccess("Услуга успешно добавлена");
            onSuccess && onSuccess();
          })
          .catch((error) => {
            setError("Ошибка при добавлении услуги");
          });
      } else if (mode === "edit" && serviceData) {
        updateService(serviceData.id, { ...data })
          .then(() => {
            setSuccess("Услуга успешно обновлена");
            onSuccess && onSuccess(); 
          })
          .catch((error) => {
            setError("Ошибка при обновлении услуги");
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
              <DialogTitle>{mode === "add" ? "Добавить категорию" : "Редактировать категорию"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Наименование</FormLabel>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Название услуги"
                      type="text"
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
