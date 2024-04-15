"use client";
import React from "react";
import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Legend
} from "recharts";

type DataItem = {
  [key: string]: string | number;
};

type Props = {
  data: DataItem[];
  dataKey: string;
};

export default function PieChartComponent({ data, dataKey }: Props) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          outerRadius={80}
          fill="#8884d8"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
