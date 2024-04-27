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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ClientSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { addClient } from '@/actions/add-data';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,  
} from "@/components/ui/form";
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { updateClient } from '@/actions/edit-data';
import { Client } from '@/types/client';
import { DialogModalProps} from '@/types/dialog-props';


export function DialogModal({ open, onOpenChange, mode = "add", clientData, onSuccess }: DialogModalProps<Client>) {
  const [clientType, setClientType] = useState("individual");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const formSchema = clientType === "individual" ? ClientSchema.individual() : ClientSchema.corporate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      initials: clientData?.initials ?? "",
      name: clientData?.name ?? "",
      unp: clientData?.unp ?? "",
      phone: clientData?.phone ?? "",
      email: clientData?.email ?? "",
      sign: clientData?.sign ?? false,
    },
  });
  

  const onSubmit = (values: z.infer<typeof ClientSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      const signValue = clientType === "individual" ? false : true;
      if (mode === "add") {
        addClient({ ...values, sign: signValue })
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setSuccess(data.success);
              onSuccess && onSuccess();
            }
          })
          .catch((error) => {
            setError("Что-то пошло не так");
          });
      } else if (mode === "edit") {
        updateClient(clientData.id, { ...values, sign: signValue })
          .then((data) => {
            if (data.error) {
              setError(data.error);
            } else {
              setSuccess(data.success);
              onSuccess && onSuccess(); 
            }
          })
          .catch((error) => {
            console.error("Error updating client:", error);
            setError("Что-то пошло не так");
          });
      }
    });
  };
  

  
  const handleClientTypeChange = (value: any) => {
    setClientType(value);
  };

  return (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <Form {...form}>
            <form 
                id="clientForm"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
            >
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{mode === "add" ? "Добавить клиента" : "Редактировать клиента"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="sign"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup value={clientType} onValueChange={handleClientTypeChange} className="flex flex-row gap-10px">
                            <RadioGroupItem value="individual" id="r1" />
                              <Label htmlFor="r1">Физ. лицо</Label>
                            <RadioGroupItem value="corporate" id="r2"/>
                              <Label htmlFor="r2">Юр. лицо</Label>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {clientType === "individual" && (
                    <FormField
                        control={form.control}
                        name="initials"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ФИО</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="Иван Иванов"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                      />     
                  )}
                  {clientType === "corporate" && (
                    <>
                      <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Название организации</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="ООО 'Дружные'"
                                  type="text"
                                />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />  
                      <FormField
                          control={form.control}
                          name="unp"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>УНП</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="100008858"
                                  type="text"
                                />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />  
                    </>
                  )}
                      <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Телефон</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="+375 (29) ***-**-**"
                                  type="text"
                                />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Почта</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="example@example.com"
                                  type="email"
                                />
                              </FormControl>
                              <FormMessage />
                          </FormItem>
                          )}
                      />                     
                </div>
                <DialogFooter>
                  <Button
                    isLoading={isPending}
                    type="submit"
                    form="clientForm" // указываем id формы
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
