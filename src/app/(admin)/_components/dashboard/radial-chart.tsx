"use client";

import { RadialBar, RadialBarChart, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CircleGauge, LayoutDashboard } from "lucide-react"; // Import a relevant icon

// Generate a random variation of blue in HSL
function getRandomColor() {
  const hue = 200 + Math.floor(Math.random() * 50);
  const saturation = 60 + Math.floor(Math.random() * 30);
  const lightness = 40 + Math.floor(Math.random() * 30);
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

interface IRadialChartProps {
  title: string;
  description: string;
  stats: {
    id: number;
    name: string;
    productCount: number;
  }[];
}

export function RadialChart({ data }: { data: IRadialChartProps }) {
  const chartData = data.stats
    .sort((a, b) => a.productCount - b.productCount)
    .map((item) => ({
      ...item,
      fill: getRandomColor(),
    }));
  const chartConfig = chartData.reduce(
    (acc, item) => ({
      ...acc,
      [item.name]: {
        label: item.name,
        color: item.fill,
      },
    }),
    {
      productCount: { label: "Product Count" },
    }
  ) satisfies ChartConfig;

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        {/* Updated CardTitle with an icon and more detailed text */}
        <div className="flex items-center gap-2">
          <CircleGauge className="h-6 w-6 text-primary" /> {/* Added an icon */}
          <CardTitle>{data.title}</CardTitle>
        </div>
        {/* Updated CardDescription with more context */}
        <CardDescription>
          A radial chart showing the product count for each category.
          <br />
          Hover over the chart to see details.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex pb-0 ">
        <ChartContainer
          config={chartConfig}
          className="mx-auto  overflow-visible lg:w-full"
        >
          <RadialBarChart
            data={chartData}
            innerRadius={50}
            outerRadius={160}
            dataKey="productCount"
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="name" />}
            />
            <RadialBar
              cornerRadius={20}
              dataKey="productCount"
              background
              className="drop-shadow-lg"
            />
          </RadialBarChart>
        </ChartContainer>
        <div className="mt-6 w-lg">
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Product Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {chartData.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div
                        className="w-4 h-4 rounded-full border border-border/50"
                        style={{ backgroundColor: item.fill }}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground text-right">
                      {item.productCount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
