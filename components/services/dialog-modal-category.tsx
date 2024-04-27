"use client";

import { useState, useTransition } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogModalProps} from '@/types/dialog-props';
import { CategorySchema } from '@/schemas';
import { addCategory } from '@/actions/add-data';
import { updateCategory, updateService } from '@/actions/edit-data';
import { Category } from '@/types/category';
import { deleteCategory } from '@/actions/del-data';
import { toast } from 'sonner';

export function DialogModalCategory({ open, onOpenChange, mode = "add", categoryData, onSuccess }:  DialogModalProps<Category>) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition(); 

  const form = useForm({
    resolver: zodResolver(CategorySchema),
    values: {
      name: categoryData?.name ?? "",
    },
  });

  const handleDelete = async () => {
    setError("");
    setSuccess("");
    if (categoryData && categoryData.id) {
      try {
        const response = await deleteCategory(categoryData.id); 
        setSuccess("Категория успешно удалена");
        onSuccess && onSuccess();
        if (response.success) {
          toast.success(response.success); 
        }
        onOpenChange(false);
      } catch (error) {
        setError("Ошибка при удалении категории");
        toast.error("Что-то пошло не так"); 
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof CategorySchema>) => {
    setError("");
    setSuccess("");
  
    startTransition(() => {
      if (mode === "add") {
        addCategory({ ...data }) 
          .then(() => {
            setSuccess("Категория успешно добавлена");
            onSuccess && onSuccess();
          })
          .catch((error) => {
            setError("Ошибка при добавлении услуги");
          });
      } else if (mode === "edit" && categoryData) {
        updateCategory(categoryData.id, { ...data })
          .then(() => {
            setSuccess("Категория успешно обновлена");
            onSuccess && onSuccess(); 
          })
          .catch((error) => {
            setError("Ошибка при обновлении категории");
          });
      }
    });
  };
  

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form 
          id="categoryForm"
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
                      placeholder="Название категории"
                      type="text"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              {mode === 'edit' && (
                <Button
                  className="w-full mr-2"
                  onClick={handleDelete}
                  variant="destructive"
                >
                  Удалить
                </Button>
              )}
              <Button
                isLoading={isPending}
                type="submit"
                form="categoryForm"
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
