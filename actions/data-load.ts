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
    const services = await db.service.findMany();

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
    console.log(employees);
    return employees;
  } catch (error) {
    console.error('Error fetching employees:', error);
    return null;
    
  } finally {
    await db.$disconnect();
  }
};