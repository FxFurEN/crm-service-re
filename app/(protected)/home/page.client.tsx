"use client";

import { useState, useEffect } from 'react';
import BarChart from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from '@/components/ui/skeleton';

const ClientComponent = ({ initialData }) => {
  const [ordersLast7Days, setOrdersLast7Days] = useState(initialData.last7DaysData);
  const [ordersByStatus, setOrdersByStatus] = useState(initialData.byStatusData);
  const [ordersByEmployee, setOrdersByEmployee] = useState(initialData.byEmployeeData);
  const [overdueOrdersCount, setOverdueOrdersCount] = useState(initialData.overdueCount);
  const [loading, setLoading] = useState(false);

  type Order = {
    execution: {
      stage: {
        name: string;
        color: string;
      };
    }[];
  };
  
  type UniqueNames = {
    [key: string]: {
      name: string;
      value: number;
      color: string;
    };
  };
  
  const transformDataForPieChart = (data: Order[]): { name: string; value: number; color: string }[] => {
    const uniqueNames: UniqueNames = {};
  
    data.forEach(order => {
      const lastStage = order.execution[order.execution.length - 1].stage;
      const name = lastStage.name;
      const value = 1;
  
      if (uniqueNames[name]) {
        uniqueNames[name].value += value;
      } else {
        uniqueNames[name] = { name, value, color: lastStage.color };
      }
    });
  
    return Object.values(uniqueNames);
  };
  
  return (
    <div className="flex flex-wrap justify-center items-start">
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Заказы за последние 7 дней</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-96" /> : <BarChart data={ordersLast7Days} xKey="x" yKey="y" />}
        </CardContent>
      </Card>
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle className="text-sm  text-muted-foreground">Заказы по статусам</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-96" /> : <PieChart
            data={transformDataForPieChart(ordersByStatus)}
            dataKey="value"
            colors={transformDataForPieChart(ordersByStatus).map(status => status.color)}
          />}
        </CardContent>
      </Card>
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle className="text-sm  text-muted-foreground">Заказы по сотрудникам</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? <Skeleton className="h-96" /> : <BarChart data={ordersByEmployee.map((item: { name: string, orders: any[] }) => ({ x: item.name, Сотрудники: item.orders.length }))} xKey="x" yKey="Сотрудники" />}
        </CardContent>
      </Card>
      <div className="flex m-2">
        <Card className="flex-1 mr-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Просроченные заказы</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-10 w-full" /> : <CardTitle className="text-4xl">{overdueOrdersCount}</CardTitle>}
          </CardContent>
        </Card>
        <Card className="flex-1 ml-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Просроченные заказы</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Skeleton className="h-10 w-full" /> : <CardTitle className="text-4xl">{overdueOrdersCount}</CardTitle>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ClientComponent;
