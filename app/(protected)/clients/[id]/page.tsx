"use client";
import { SkeletonCard } from '@/components/skeleton-card';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import { getClientById } from '@/data/data-load';

export default function ClientDetailPage() {
  const pathname = usePathname(); 
  const id = pathname.split('/').pop();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (id) {
        const fetchedClient = await getClientById(id);
        setClient(fetchedClient);
      }
    };

    fetchClient();
  }, [id]);

  return (
    <div>
      {client ? (
        <Card className="flex flex-col md:flex-row md:w-[700px] w-[400px]">
          <div className="md:w-[50%]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Информация о клиенте
              </p>
            </CardHeader>
            <CardContent>
              {client.sign == false ? (
                <>
                  <div>
                    <Label htmlFor="email">Email: {client.email}</Label>
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон: {client.phone}</Label>
                  </div>
                  <div>
                    <Label htmlFor="initials">ФИО: {client.initials}</Label>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label htmlFor="name">Название компании: {client.name}</Label>
                  </div>
                  <div>
                    <Label htmlFor="unp">УНП: {client.unp}</Label>
                  </div>
                  <div>
                    <Label htmlFor="email">Почта: {client.email}</Label>
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон: {client.phone}</Label>
                  </div>
                </>
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
                <TableCaption>Нет данных.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Номер заказа</TableHead>
                    <TableHead>Дата заказа</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Your table body content */}
                </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      ) : (
        <SkeletonCard/>
      )}
    </div>
  );
}
