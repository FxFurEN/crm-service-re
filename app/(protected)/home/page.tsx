"use client";

import { useEffect, useState } from 'react';
import BarChart from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdersByEmployee, getOrdersByStatus, getOrdersLast7Days, getOverdueOrdersCount } from '@/actions/data-load';
import { Skeleton } from '@/components/ui/skeleton';

const HomePage = () => {
  const [ordersLast7Days, setOrdersLast7Days] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const [ordersByEmployee, setOrdersByEmployee] = useState([]);
  const [overdueOrdersCount, setOverdueOrdersCount] = useState(null);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const last7DaysData = await getOrdersLast7Days();
      const byStatusData = await getOrdersByStatus();
      const byEmployeeData = await getOrdersByEmployee();
      const overdueCount = await getOverdueOrdersCount();

      setOrdersByStatus(byStatusData);
      setOrdersLast7Days(last7DaysData);
      setOrdersByEmployee(byEmployeeData);
      setOverdueOrdersCount(overdueCount);
    };

    fetchOrdersData();
  }, []);

  const transformDataForPieChart = (data) => {
    const uniqueNames = {};
  
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
          <BarChart data={ordersLast7Days} xKey="x" yKey="y" />
        </CardContent>
      </Card>
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle className="text-sm  text-muted-foreground">Заказы по статусам</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart
            data={transformDataForPieChart(ordersByStatus)}
            dataKey="value"
            colors={transformDataForPieChart(ordersByStatus).map(status => status.color)}
          />
        </CardContent>
      </Card>
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle className="text-sm  text-muted-foreground">Заказы по сотрудникам</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={ordersByEmployee.map(item => ({ x: item.name, y: item.orders.length }))} xKey="x" yKey="y" />
        </CardContent>
      </Card>
      <div className="flex m-2">
        <Card className="flex-1 mr-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Просроченные заказы</CardTitle>
          </CardHeader>
          <CardContent>
          {overdueOrdersCount === null ? ( 
              <Skeleton className="h-10 w-full" /> 
            ) : (
              <CardTitle className="text-4xl">{overdueOrdersCount}</CardTitle>
            )}
          </CardContent>
        </Card>
        <Card className="flex-1 ml-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Просроченные заказы</CardTitle>
          </CardHeader>
          <CardContent>
          {overdueOrdersCount === null ? ( 
              <Skeleton className="h-10 w-full" /> 
            ) : (
              <CardTitle className="text-4xl">{overdueOrdersCount}</CardTitle>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
