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
  colors: string[]; // Добавлен новый тип для цветов
};

export default function PieChartComponent({ data, dataKey, colors }: Props) {
  return (
    <ResponsiveContainer width={"100%"} height={350}>
      <PieChart>
        <Pie
          data={data}
          dataKey={dataKey}
          outerRadius={120}
          fill="black"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
