"use client";

import { useEffect, useState } from 'react';
import BarChart from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOrdersByEmployee, getOrdersByStatus, getOrdersLast7Days } from '@/actions/data-load';

const HomePage = () => {
  const [ordersLast7Days, setOrdersLast7Days] = useState([]);
  const [ordersByStatus, setOrdersByStatus] = useState([]);
  const [ordersByEmployee, setOrdersByEmployee] = useState([]);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const last7DaysData = await getOrdersLast7Days();
      const byStatusData = await getOrdersByStatus();
      const byEmployeeData = await getOrdersByEmployee();
      setOrdersByStatus(byStatusData);
      setOrdersLast7Days(last7DaysData);
      setOrdersByEmployee(byEmployeeData);
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
          <CardTitle>Orders for the last 7 days</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={ordersLast7Days.map(item => ({ x: item.createdAt, y: item.total }))} xKey="x" yKey="y" />
        </CardContent>
      </Card>
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle>Orders by status</CardTitle>
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
          <CardTitle>Orders by employee</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={ordersByEmployee.map(item => ({ x: item.name, y: item.orders.length }))} xKey="x" yKey="y" />
        </CardContent>
      </Card>
    </div>
  );
}

export default HomePage;