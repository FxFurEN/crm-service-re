"use server";

import { db } from "@/lib/db";

export const getAllClients = async () => {
    try {
      const clients = await db.clients.findMany();
  
      return clients;
    } catch (error) {
      console.error('Error fetching clients:', error);
      return null;
      
    } finally {
      await db.$disconnect();
    }
};

export const getClientById = async (clientId: string) => {
    try {
        const client = await db.clients.findUnique({
            where: {
                id: clientId,
            },
        });

        return client;
    } catch (error) {
        console.error('Error fetching client:', error);
        return null;
    }
};


export const getAllServices = async () => {
  try {
    const services = await db.service.findMany(
      {
        include: {
          category: {
            select: {
              name: true
            }
          }
        }
      }
    );

    return services;
  } catch (error) {
    console.error('Error fetching services:', error);
    return null;
    
  } finally {
    await db.$disconnect();
  }
};


export const getAllCategories = async () => {
  try {
    const services = await db.category.findMany();

    return services;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
    
  } finally {
    await db.$disconnect();
  }
};



export const getAllEmployees = async () => {
  try {
    const employees = await db.user.findMany();
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return null;
    
  } finally {
    await db.$disconnect();
  }
};


export const getAllOrders = async () => {
  try {
    const orders = await db.orders.findMany({
      include: {
        service: { select: { name: true } },
        user: { select: { name: true } },
        client: { select: { name: true, initials: true } },
        execution: {
          select: {
            stage: { select: {id: true, name: true, color: true } }
          }
        }
      }
    });

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  } finally {
    await db.$disconnect();
  }
};



export const getOrderById = async (orderId: string) => {
  try {
    const order = await db.orders.findUnique({
      where: {
        id: orderId,
      },
      include: {
        service: {
          select: {
            name: true
          }
        },
        user: {
          select: {
            name: true
          }
        },
        client: {
          select: {
            name: true,
            initials: true,
            phone: true,
            email: true,
            sign: true,
            unp: true
          }
        }
      }
    });

    return order;
  } catch (error) {
    console.error('Error fetching order:', error);
    return null;
  }
};


export const getOrderExecutionHistory = async (orderId: string) => {
  try {
    const executionHistory = await db.execution.findMany({
      where: {
        orderId: orderId
      },
      orderBy: {
        executionDate: "asc"
      },
      include: {
        user: {
          select: {
            name: true
          }
        },
        stage: true
      }
    });

    return executionHistory;
  } catch (error) {
    console.error('Error fetching order execution history:', error);
    return null;
  }
};
