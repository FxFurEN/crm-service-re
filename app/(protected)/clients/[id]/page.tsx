"use client";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Client } from '@/types/client'; 
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ClientDetailPage() {
  const id = getIdFromUrl(); // Получаем id из URL

  const [client, setClient] = useState<Client | null>(null);

  function getIdFromUrl() {
    const urlSegments = window.location.pathname.split('/');
    return urlSegments[urlSegments.length - 1]; 
  }


  useEffect(() => {
    const fetchData = async () => {
      const clientData: Client[] = [
        {
          id: "1",
          fullName: "John Doe",
          clientType: "individual",
          email: "john.doe@example.com",
          phone: "+1234567890",
        },
        {
          id: "2",
          fullName: "ABC Inc.",
          clientType: "corporate",
          email: "info@abcinc.com",
          phone: "+9876543210",
        },
        {
          id: "3",
          fullName: "Jane Smith",
          clientType: "individual",
          email: "jane.smith@example.com",
          phone: "+1987654321",
        },
        {
          id: "4",
          fullName: "Jane Smith",
          clientType: "individual",
          email: "jane.smith@example.com",
          phone: "+1987654321",
        },
      ];

      const foundClient: Client = clientData.find((client) => client.id === id);
      setClient(foundClient);
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {client ? (
        <Card className="flex flex-col md:flex-row md:w-[700px] w-[400px]">
          <div className="md:w-[50%]">
            <CardHeader>
              <p className="text-2xl font-semibold text-center">
                Информация  о клиенте
              </p>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="fullName">Полное имя: {client.fullName}</Label>
              </div>
              <div>
                <Label htmlFor="clientType">Тип клиента: {client.clientType}</Label>
              </div>
              <div>
                <Label htmlFor="email">Email: {client.email}</Label>
              </div>
              <div>
                <Label htmlFor="phone">Телефон: {client.phone}</Label>
              </div>
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
                  </TableBody>
              </Table>
            </CardContent>
          </div>
        </Card>
      ) : (
        <p><Loader2 className="mr-2 h-4 w-4 animate-spin" /></p>
      )}
    </div>
  );
}