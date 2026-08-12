"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Define the data type for the chart
interface ProductOrderData {
  date: string;
  count: number;
}

// Define the props for the component
interface ProductOrderChartProps {
  data: ProductOrderData[];
}

const chartConfig = {
  count: {
    label: "Order Count",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ProductOrderChart({ data }: ProductOrderChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Order Timeline</CardTitle>
        <CardDescription>
          Count of orders for a specific product over time.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={data}
            margin={{
              right: 12,
              top: 140, // Increased top margin
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => {
                    return `Order Count: ${value}`;
                  }}
                  labelFormatter={(label) => {
                    return `Date: ${label}`;
                  }}
                />
              }
            />
            <Line
              dataKey="count"
              type="natural"
              stroke="var(--color-count)"
              strokeWidth={2}
              dot={true}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
    </Card>
  );
}

export default ProductOrderChart;
