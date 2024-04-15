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
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
