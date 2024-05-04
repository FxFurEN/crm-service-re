"use client";

import { useState, useEffect, useTransition } from 'react';
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
import { DialogModalProps} from '@/types/dialog-props';
import { ExecutionSchema } from '@/schemas';
import { addExecution } from '@/actions/add-data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllStages } from '@/actions/data-load';
import { Tag } from 'antd';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Execution } from '@/types/execution';

export function DialogModalChangeStages({ open, onOpenChange, onSuccess, orderId,  }: DialogModalProps<Execution>) {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const [stages, setStages] = useState([] as { id: string; name: string; color: string; }[]);

  const user = useCurrentUser();

  const form = useForm<z.infer<typeof ExecutionSchema>>({
    resolver: zodResolver(ExecutionSchema),
    values: {
      name: ' ',
      stageId: ' ',
      userId: user?.id || ' ',
      orderId: orderId || ' ',
    }
  });

  const onSubmit = async (data: z.infer<typeof ExecutionSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const userId = user?.id;
      addExecution(orderId, userId, { ...data })
        .then(() => {
          setSuccess("Статус успешно добавлен");
          onSuccess && onSuccess();
        })
        .catch((error) => {
          setError("Ошибка при добавлении статуса");
        });
    });
  };


  useEffect(() => {
    fetchStages();
  }, []);

  const fetchStages= async () => {
    try {
      const stagesData = await getAllStages();
      setStages(stagesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
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
              <DialogTitle>Изменить стату заказа</DialogTitle>
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
                      value={field.value}
                      disabled={isPending}
                      placeholder="Названия выполнения"
                      type="text"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="stageId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Статус</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите статус" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage.id} value={stage.id}>
                             <Tag color={stage.color}>{stage.name}</Tag>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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