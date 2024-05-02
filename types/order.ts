export type Order = {
    id: string;
    createdAt: Date;
    comments: string | null;
    leadTime: Date;
    userId: string;
    clientId: string;
    serviceId: string;
  };