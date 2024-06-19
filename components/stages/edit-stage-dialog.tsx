import React, { useState, useTransition, useEffect } from 'react';
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
import { DialogModalProps } from '@/types/dialog-props';
import { StageSchema } from '@/schemas';
import { updateStage } from '@/actions/edit-data';
import { Stage } from '@/types/stages';
import { GradientPicker } from '@/components/gradient-picker';
import { deleteStage } from '@/actions/del-data';
import { Toaster, toast } from 'sonner';

export function EditStageDialog({ open, onOpenChange, onSuccess, stageData }: DialogModalProps<Stage>) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(stageData?.color ?? '#B4D455');

  const form = useForm({
    resolver: zodResolver(StageSchema),
    defaultValues: {
      name: stageData?.name ?? '',
      color: stageData?.color ?? '',
    },
  });

  useEffect(() => {
    form.reset({
      name: stageData?.name ?? '',
      color: stageData?.color ?? '',
    });
    setSelectedColor(stageData?.color ?? '#B4D455');
  }, [stageData, form]);

  const onSubmit = async (data: z.infer<typeof StageSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      const formData = { ...data };
      if (selectedColor) {
        formData.color = selectedColor;
      }
      if (stageData) {
        updateStage(stageData.id, formData)
          .then(() => {
            setSuccess("Статус успешно обновлен");
            onSuccess && onSuccess();
          })
          .catch((error) => {
            setError("Ошибка при обновлении статуса");
            console.error(error);
          });
      }
    });
  };

  const onDeleteClick = async () => {
    setError("");
    setSuccess("");
    if (stageData && stageData.id) {
      try {
        const response = await deleteStage(stageData.id); 
        setSuccess("Статус успешно удалена");
        onSuccess && onSuccess();
        if (response.success) {
          toast.success("Статус успешно удален"); 
        }
        onOpenChange(false);
      } catch (error) {
        setError("Ошибка при удалении категории");
        toast.error("Что-то пошло не так"); 
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form id="editStageForm" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Редактировать статус</DialogTitle>
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
                      value={field.value ?? ''}
                      disabled={isPending}
                      placeholder="Название статуса"
                      type="text"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Цвет</FormLabel>
                    <GradientPicker
                      background={field.value ?? selectedColor}
                      setBackground={(color) => {
                        setSelectedColor(color);
                        field.onChange(color);
                      }}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
            <Button
                isLoading={isPending}
                onClick={onDeleteClick}
                className="w-full"
                variant="destructive"
              >
                Удалить
              </Button>
              <Button
                isLoading={isPending}
                type="submit"
                form="editStageForm"
                className="w-full"
              >
                Сохранить
              </Button>
            </DialogFooter>
            <FormError message={error} />
            <FormSuccess message={success} />
          </DialogContent>
        </form>
      </Form>
      <Toaster richColors  />
    </Dialog>
  );
}
