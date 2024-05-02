"use client";

import { SkeletonCard } from '@/components/skeleton-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getOrderById } from '@/actions/data-load';
import { Textarea } from '@/components/ui/textarea';

export default function OrderDetailPage() {
  const pathname = usePathname(); 
  const id = pathname.split('/').pop();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        const fetchedOrder = await getOrderById(id);
        setOrder(fetchedOrder);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div>
      {order ? (
        <Card className="flex flex-col md:flex-row md:w-[700px] w-[400px]">
          <div className="md:w-[50%]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Информация
              </p>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="orderCreatedAt">Дата создания заказа: {new Date(order.createdAt).toLocaleDateString()}</Label>
              </div>
              <div>
                <Label htmlFor="orderLeadTime">Время выполнения заказа: {new Date(order.leadTime).toLocaleDateString()}</Label>
              </div>
              <div>
                <Label htmlFor="orderService">Услуга: {order.service.name}</Label>
              </div>
              <div>
                <Label htmlFor="orderService">Исполнитель: {order.user.name}</Label>
              </div>
              <div>
                <Label htmlFor="orderComments">Комментарии к заказу:</Label>
                <Textarea value={order.comments} className="resize-none" readOnly />
              </div>
            </CardContent>
          </div>
          <div className="md:w-[50%]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Клиент
              </p>
            </CardHeader>
            <CardContent>
            {order.client.sign === false ? (
                <>
                  <div>
                    <Label htmlFor="initials">ФИО: {order.client.initials}</Label>
                  </div>
                  <div>
                    <Label htmlFor="email">Email: {order.client.email}</Label>
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон: {order.client.phone}</Label>
                  </div>
                  
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="name">Название компании: {order.client.name}</Label>
                  </div>
                  <div>
                    <Label htmlFor="name">УНП: {order.client.unp}</Label>
                  </div>
                  <div>
                    <Label htmlFor="email">Почта: {order.client.email}</Label>
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон: {order.client.phone}</Label>
                  </div>
                </>
              )}
            </CardContent>
          </div>
        </Card>
      ) : (
        <SkeletonCard/>
      )}
    </div>
  );
}
