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

export default function OrderDetailPage() {
  const pathname = usePathname(); 
  const id = pathname.split('/').pop();
  const [order, setOrder] = useState(null);
  const [executionHistory, setExecutionHistory] = useState([]);


  useEffect(() => {
    fetchExecutionHistory();
    fetchOrder();
  }, [id]);


  const fetchOrder = async () => {
    if (id) {
      const fetchedOrder = await getOrderById(id);
      setOrder(fetchedOrder);
    }
  };

  const fetchExecutionHistory = async () => {
    if (id) {
      const history = await getOrderExecutionHistory(id);
      setExecutionHistory(history);
    }
  };

  return (
    <div className='ml-20'>
      {order ? (
        <>
          <div className='ml-5'>
            <Button className="mb-4">Изменить статус заказа</Button>
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
                      <div>
                        <Label htmlFor="orderCreatedAt">Дата создания заказа: {new Date(order.createdAt).toLocaleDateString()}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderLeadTime">Время выполнения заказа: {new Date(order.leadTime).toLocaleDateString()}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderService">Услуга: {order.service.name}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderService">Исполнитель: {order.user.name}</Label>
                        <Separator className="my-2" />
                      </div>
                      <div>
                        <Label htmlFor="orderComments">Комментарии к заказу:</Label>
                        <Textarea value={order.comments} className="resize-none" readOnly />
                      </div>
                  </div>
                  <div className="md:w-[50%] px-4">
                    <p className="text-2xl font-semibold text-left mb-4">
                        Клиент
                      </p>
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
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>
            <div className="flex-grow md:w-1/4">
              <Card>
                <CardHeader>
                  <p className="text-2xl font-semibold flex items-center text-left">
                    История <History className="ml-2" />
                  </p>
                </CardHeader>
                <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md">
                    {executionHistory.map((execution) => (
                      <div key={execution.id}>
                        <p>{execution.user.name}: {execution.stage.name}</p>
                        <p>Дата создания: {new Date(execution.executionDate).toLocaleString()}</p>
                      </div>
                    ))}
                </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <SkeletonCard/>
      )}
    </div>
  );
}
