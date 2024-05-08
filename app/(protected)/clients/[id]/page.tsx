"use client";
import { SkeletonCard } from '@/components/skeleton-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { getClientById, getClientOrders  } from '@/actions/data-load';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';

export default function ClientDetailPage() {
  const pathname = usePathname(); 
  const id = pathname.split('/').pop();
  const [client, setClient] = useState(null);
  const [clientOrders, setClientOrders] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (id) {
        const fetchedClient = await getClientById(id);
        setClient(fetchedClient);

        const orders = await getClientOrders(id);
        setClientOrders(orders);
      }
    };

    fetchClient();
  }, [id]);

  return (
    <div className='flex justify-center'>
        <Card className="flex flex-col md:flex-row md:w-[700px] w-[400px]">
          <div className="md:w-[50%]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Информация о клиенте
              </p>
            </CardHeader>
            <CardContent className='mt-5'>
            {client ? (
              <>
                {client.sign == false ? (
                    <>
                      <div>
                        <Label htmlFor="email"><strong>Email:</strong> {client.email}</Label>
                      </div>
                      <div>
                        <Label htmlFor="phone"><strong>Телефон:</strong> {client.phone}</Label>
                      </div>
                      <div>
                        <Label htmlFor="initials"><strong>ФИО:</strong> {client.initials}</Label>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="name"><strong>Название компании:</strong> {client.name}</Label>
                      </div>
                      <div>
                        <Label htmlFor="unp"><strong>УНП: </strong>{client.unp}</Label>
                      </div>
                      <div>
                        <Label htmlFor="email"><strong>Почта:</strong> {client.email}</Label>
                      </div>
                      <div>
                        <Label htmlFor="phone"><strong>Телефон:</strong>Телефон: {client.phone}</Label>
                      </div>
                    </>
                  )}
              </>
              ) : (
                <SkeletonCard/>
              )}
            </CardContent>
          </div>
          <div className="md:w-[50%]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Заказы клиента
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Услуга</TableHead>
                    <TableHead>Дата заказа</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {clientOrders ? ( 
                  <>
                     {clientOrders.map(order => (
                        <TableRow key={order.id}>
                          <TableCell>{order.service.name}</TableCell>
                          <TableCell>{format(order.createdAt, 'dd.MM.yyyy')}</TableCell>
                        </TableRow>
                      ))}
                  </>
                ) : (
                  <>
                    <TableRow>
                        <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                        <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                        <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                        <TableCell><Skeleton className="h-4 w-full"/></TableCell>
                    </TableRow>
                  </>
                 
                 
                )}
                
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
    </div>
  );
}
