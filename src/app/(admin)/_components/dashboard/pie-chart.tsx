"use client";

import { LabelList, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";
import { TrendingUp } from "lucide-react";

// Helper to get status color
function getStatusColor(status: string) {
  switch (status) {
    case "DISPATCHED":
      return "hsl(207, 90%, 54%,90)"; // Blue
    case "PENDING":
      return "hsl(48, 100%, 50%,0.90)"; // Yellow
    case "CANCELLED":
      return "hsla(17, 90%, 54%,0.90)"; // Red with very low opacity
    default:
      return "hsl(210, 40%, 80%)"; // Pale Blue
  }
}

interface IPieChartProps {
  status: string;
  count: number;
}

// Legend Component
function Legend({ data }: { data: IPieChartProps[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
      {data.map((item) => (
        <div key={item.status} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: getStatusColor(item.status) }}
          />
          <span className="text-sm text-muted-foreground">
            {item.status.charAt(0).toUpperCase() +
              item.status.slice(1).toLowerCase()}
            ({item.count})
          </span>
        </div>
      ))}
    </div>
  );
}

export function RoundedPieChart({ data }: { data: IPieChartProps[] }) {
  const chartData = data.map((item) => ({
    ...item,
    fill: getStatusColor(item.status),
  }));
  return (
    <Card className="flex flex-col ">
      <CardHeader className="items-center pb-0">
        <CardTitle>Order Status Distribution</CardTitle>
        <CardDescription>Current Order Status Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 relative pb-0 ">
        <ChartContainer
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
          config={{
            count: {
              label: "Order Count",
            },
          }}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="status" hideLabel />}
            />
            <Pie
              data={chartData}
              innerRadius={30}
              dataKey="count"
              nameKey="status"
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
              isAnimationActive={false}
            >
              <LabelList
                dataKey="count"
                stroke="none"
                fontSize={12}
                fontWeight={500}
                fill="currentColor"
                formatter={(value: number) => value.toString()}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className=" font-bold text-sm text-primary -translate-y-4">
            {data.reduce((acc, item) => acc + item.count, 0)}
          </p>
        </div>
        <Legend data={data} />
      </CardContent>
    </Card>
  );
}
