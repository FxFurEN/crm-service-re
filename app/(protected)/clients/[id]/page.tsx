"use client";
import { Client } from '@/types/client'; 
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
        <div>
          <h1>{client.fullName}</h1>
          <p>{client.clientType}</p>
          <p>{client.email}</p>
          <p>{client.phone}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}