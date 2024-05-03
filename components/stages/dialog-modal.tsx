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
import { StageSchema } from '@/schemas';
import { addStage } from '@/actions/add-data';
import { Stage } from '@/types/stages';
import { GradientPicker } from '@/components/gradient-picker';

export function DialogModalStages({ open, onOpenChange, onSuccess }: DialogModalProps<Stage>) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const form = useForm({
    resolver: zodResolver(StageSchema),
  });

  const onSubmit = async (data: z.infer<typeof StageSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      const formData = { ...data };
      if (selectedColor) {
        formData.color = selectedColor;
      }
      addStage(formData)
        .then(() => {
          setSuccess("Статус успешно добавлен");
          onSuccess && onSuccess();
        })
        .catch((error) => {
          setError("Ошибка при добавлении статуса");
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Form {...form}>
        <form
          id="stageForm"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Добавить статус</DialogTitle>
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
                      background={selectedColor} 
                      setBackground={setSelectedColor} 
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
                form="stageForm"
                className="w-full"
              >
                Добавить
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