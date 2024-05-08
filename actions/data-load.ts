"use server";

import { db } from "@/lib/db";

interface OrdersCount {
  [key: string]: number;
}

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
            name: true,
            price: true,
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



export const getAllStages = async () => {
  try {
    const stages = await db.stage.findMany();

    return stages;
  } catch (error) {
    console.error('Error fetching stages:', error);
    return null;
    
  } finally {
    await db.$disconnect();
  }
};


export const getOrdersLast7Days = async () => {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6); 

    const ordersCountByDay: OrdersCount = {};
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i); 
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}`; 
      ordersCountByDay[formattedDate] = 0; 
    }
    const orders = await db.orders.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    orders.forEach(order => {
      const orderDate = new Date(order.createdAt);
      const formattedOrderDate = `${String(orderDate.getDate()).padStart(2, '0')}.${String(orderDate.getMonth() + 1).padStart(2, '0')}`; // Форматируем дату
      ordersCountByDay[formattedOrderDate]++;
    });

    const ordersData = Object.keys(ordersCountByDay).map(date => ({
      x: date, // Дата
      y: ordersCountByDay[date],
    }));

    return ordersData;
  } catch (error) {
    console.error('Error fetching orders for the last 7 days:', error);
    return null;
  } finally {
    await db.$disconnect();
  }
};






export const getOrdersByStatus = async () => {
  try {
    const ordersByStatus = await db.orders.findMany({
      include: {
        execution: {
          select: {
            stage: { select: { name: true, color: true } }
          }
        }
      }
    });
    return ordersByStatus;
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    return null;
  } finally {
    await db.$disconnect();
  }
};



export const getOrdersByEmployee = async () => {
  try {
    const ordersByEmployee = await db.user.findMany({
      include: {
        orders: true,
      },
    });
    return ordersByEmployee;
  } catch (error) {
    console.error('Error fetching orders by employee:', error);
    return null;
  } finally {
    await db.$disconnect();
  }
};



export const getOverdueOrdersCount = async () => {
  try {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);

    const overdueOrders = await db.orders.findMany({
      where: {
        NOT: {
          execution: {
            some: {
              stage: {
                OR: [
                  { name: "Закрыт" }, 
                  { name: "Готов" }  
                ]
              }
            }
          }
        },
        execution: {
          some: {
            stage: {
              NOT: {
                name: "Закрыт"
              }
            }
          }
        },
        leadTime: {
          lt: yesterday
        }
      }
    });

    return overdueOrders.length;
  } catch (error) {
    console.error('Error fetching overdue orders:', error);
    return null;
  } finally {
    await db.$disconnect();
  }
};

