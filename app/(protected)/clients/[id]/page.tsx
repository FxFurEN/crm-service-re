"use client"

import { useSearchParams } from 'next/navigation'; 
import { Client } from '@/types/client'; 

export default function ClientDetailPage() {
  const searchParams = useSearchParams(); 
  const id = searchParams.get('id'); 

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

  const client = clientData.find((client) => client.id === id);

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
        <p>Client not found</p>
      )}
    </div>
  );
}