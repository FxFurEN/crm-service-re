"use client";

import { SkeletonCard } from '@/components/skeleton-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getOrderById, getOrderExecutionHistory  } from '@/actions/data-load';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { History } from 'lucide-react';
import { Tag } from "antd";
import { DialogModalChangeStages } from '@/components/orders/dialog-modal-change-stage';
import { DialogModal } from '@/components/templates/dialog-modal';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Toaster } from 'sonner';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}.${month}, ${hours}:${minutes}`;
};


export default function OrderDetailPage() {
  const pathname = usePathname(); 
  const id = pathname.split('/').pop();
  const [order, setOrder] = useState(null);
  const [executionHistory, setExecutionHistory] = useState([]);
  const [open, setOpen] = useState(false);
  const [openTempate, setOpenTempate] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    fetchExecutionHistory();
    fetchOrder();
  }, [id]);


const fetchOrder = async () => {
  setIsPending(true); 
  if (id) {
    try {
      const fetchedOrder = await getOrderById(id);
      setOrder(fetchedOrder);
    } catch (error) {
      Toaster.error("Error fetching order:", error);
    } finally {
      setIsPending(false); 
    }
  }
};

  const fetchExecutionHistory = async () => {
    if (id) {
      const history = await getOrderExecutionHistory(id);
      setExecutionHistory(history);
    }
  };

  const handleAddOrUpdateSuccess = () => {
    fetchExecutionHistory();
  };

  return (
    <div>
        <>
          <div className='flex items-center ml-5 mb-5'>
              <Button  isLoading={isPending} onClick={() => setOpen(true)}>Изменить статус заказа</Button>
              <Button className="ml-5" isLoading={isPending} onClick={() => setOpenTempate(true)}>Печатать</Button>
              <Sheet side="right" >
                <SheetTrigger asChild>
                      <Button className="ml-5" isLoading={isPending}>
                        <History size={24} />
                      </Button>
                </SheetTrigger>
                <SheetContent>
                  <ScrollArea className="h-[400px] w-full rounded-md">
                    {executionHistory.map((execution) => (
                      <div key={execution.id}>
                        <p>
                          {execution.name !== 'Заказ добавлен' && execution.name !== 'Заказ обновлен' ? (
                            <>
                              <span className="text-500">{execution.name} </span>
                              <Tag color={execution.stage.color}>{execution.stage.name}</Tag>
                            </>
                          ) : execution.name === 'Заказ обновлен' ? (
                            <span className="text-green-500">Информация о заказе была обновлена</span>
                          ) : (
                            <Tag color={execution.stage.color}>{execution.stage.name}</Tag>
                          )}
                        </p>
                        <p className="text-gray-800 text-sm">
                          {formatDate(execution.executionDate)} <span className="text-gray-400">{execution.user.name}</span>
                        </p>
                        <Separator className="my-2" />
                      </div>
                    ))}
                  </ScrollArea>
                </SheetContent>
            </Sheet>
          </div>
          <div className="flex justify-between">
            <div className="md:w-[100%] px-4">
              <Card>
                <CardHeader>
                  <p className="text-2xl font-semibold text-center">
                    Информация
                  </p>
                </CardHeader>
                <CardContent>
                <div className="flex justify-between">
                  <div className="md:w-[50%] px-4">
                      <p className="text-2xl font-semibold text-left mb-4">
                        Заказ
                      </p>
                      {order ? (    
                        <>
                          <div>
                            <Label htmlFor="orderCreatedAt">Дата создания заказа: {new Date(order.createdAt).toLocaleDateString()}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="orderLeadTime">Предварительная дата выполнения заказа: {new Date(order.leadTime).toLocaleDateString()}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="orderService">Услуга: {order.service.name}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="orderService">Принял заказ: {order.user.name}</Label>
                            <Separator className="my-2" />
                          </div>
                          <div>
                            <Label htmlFor="orderComments">Комментарии к заказу:</Label>
                            <Textarea value={order.comments} className="resize-none" readOnly />
                          </div>   
                        </>
                      
                      ) : (
                        <SkeletonCard/>
                      )}
                  </div>
                  <div className="md:w-[50%] px-4">
                    <p className="text-2xl font-semibold text-left mb-4">
                        Клиент
                      </p>
                      {order ? (    
                        <>
                            {order.client.sign === false ? (
                              <>
                              
                                <div>
                                  <Label htmlFor="initials">ФИО: {order.client.initials}</Label>
                                  <Separator className="my-2" />
                                </div>
                                <div>
                                  <Label htmlFor="email">Email: {order.client.email}</Label>
                                  <Separator className="my-2" />
                                </div>
                                <div>
                                  <Label htmlFor="phone">Телефон: {order.client.phone}</Label>
                                  <Separator className="my-2" />
                                </div>
                                
                              </>
                            ) : (
                              <>
                                <div>
                                  <Label htmlFor="name">Название компании: {order.client.name}</Label>
                                  <Separator className="my-2" />
                                </div>
                                <div>
                                  <Label htmlFor="name">УНП: {order.client.unp}</Label>
                                  <Separator className="my-2" />
                                </div>
                                <div>
                                  <Label htmlFor="email">Почта: {order.client.email}</Label>
                                  <Separator className="my-2" />
                                </div>
                                <div>
                                  <Label htmlFor="phone">Телефон: {order.client.phone}</Label>
                                  <Separator className="my-2" />
                                </div>
                              </>
                            )}  
                        </>
                      ) : (
                        <SkeletonCard/>
                      )}
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      <DialogModal open={openTempate} onOpenChange={setOpenTempate} orderId={id}/>
      <DialogModalChangeStages open={open} onOpenChange={setOpen} orderId={id} onSuccess={handleAddOrUpdateSuccess}/>
    </div>
  );
}
