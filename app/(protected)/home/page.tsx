"use client";
import BarChart from "@/components/charts/bar-chart";
import PieChart from "@/components/charts/pie-chart"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000
  }
];

const HomePage = () => {
  return (
    <div className="flex flex-wrap justify-center items-start" >
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle>Test chart</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={data} xKey="month" yKey="total" />
        </CardContent>
      </Card>
      <Card className="w-[450px] m-2">
        <CardHeader>
          <CardTitle>Test chart</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart data={data} dataKey="total" />
        </CardContent>
      </Card>
    </div>
    
   );
}
 
export default HomePage;