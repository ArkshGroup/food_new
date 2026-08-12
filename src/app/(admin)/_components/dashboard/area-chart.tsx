"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { BanknoteIcon, ListOrdered, TrendingDown } from "lucide-react";
import { useRef, useState } from "react";
import { useSpring, useMotionValueEvent } from "motion/react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatToNPR } from "@/helper/format-npr";

const chartConfig = {
  count: {
    label: "Count",
    color: "#3B82F6", // blue-500
  },
} satisfies ChartConfig;

type TimeRange = "Today"| "1week" | "30days" | "6months" | "1year" | "all";

export function ClippedAreaChart({
  initialChartData,
}: {
  initialChartData: { date: string; count: number; revenue: number }[];
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [axis, setAxis] = useState(0);
  const [timeRange, setTimeRange] = useState<TimeRange>("30days");

const getFilterDate = (range: TimeRange) => {
  const now = new Date();

  const startOfDay = (d: Date) => {
    const copy = new Date(d);
    copy.setHours(0, 0, 0, 0);
    return copy;
  };

  switch (range) {
    case "Today":
      return startOfDay(now);

    case "1week": {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return startOfDay(oneWeekAgo);
    }

    case "30days": {
      const thirtyDaysAgo = new Date(now);
      thirtyDaysAgo.setDate(now.getDate() - 30);
      return startOfDay(thirtyDaysAgo);
    }

    case "6months": {
      const sixMonthsAgo = new Date(now);
      sixMonthsAgo.setMonth(now.getMonth() - 6);
      return startOfDay(sixMonthsAgo);
    }

    case "1year": {
      const oneYearAgo = new Date(now);
      oneYearAgo.setFullYear(now.getFullYear() - 1);
      return startOfDay(oneYearAgo);
    }

    case "all":
      return new Date(0);
  }
}
  const chartData = initialChartData.filter((data) => {
    const dataDate = new Date(data.date);
    const filterDate = getFilterDate(timeRange);
    return dataDate >= filterDate;
  });
  // motion values
  const springX = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });
  const springY = useSpring(0, {
    damping: 30,
    stiffness: 100,
  });

  useMotionValueEvent(springX, "change", (latest) => {
    setAxis(latest);
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-4">
          <Card className="flex items-center justify-center gap-4 p-4 flex-1">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <ListOrdered className="h-6 w-6" />
            </div>
            <CardContent className="p-0 flex flex-col items-center">
              <p className="text-sm text-muted-foreground font-medium">
                Total Orders in last
                <span className=" text-primary px-2">{timeRange}</span>
              </p>
              <span className="text-2xl font-bold">
                {chartData.reduce((acc, curr) => acc + curr.count, 0)}
              </span>
            </CardContent>
          </Card>
          <Card className="flex items-center gap-4 p-4 flex-1">
            <div className="bg-primary/10 text-primary p-2 rounded-lg">
              <BanknoteIcon className="h-6 w-6" />
            </div>
            <CardContent className="p-0 flex flex-col items-center">
              <p className="text-sm text-muted-foreground font-medium">
                Total Revenue in last
                <span className=" text-primary px-2">{timeRange}</span>
              </p>
              <span className="text-2xl font-bold">
                {formatToNPR(
                  chartData.reduce((acc, curr) => acc + curr.revenue, 0)
                )}
              </span>
            </CardContent>
          </Card>
        </div>
        <CardDescription className=" pt-12 capitalize">
          {timeRange === "Today"
            ? "today"
            : timeRange === "1week"
              ? "last week"
              : timeRange === "30days"
                ? "last 30 days"
                : timeRange === "6months"
                  ? "last 6 months"
                : timeRange === "1year"
                  ? "last year"
                  : "all time"}
        </CardDescription>
        <div>
          <Select
            value={timeRange}
            onValueChange={(value: TimeRange) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Time Range</SelectLabel>
                <SelectItem value="Today">Today</SelectItem>
                <SelectItem value="1week">Last 1 Week</SelectItem>
                <SelectItem value="30days">Last 30 Days</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last 1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer
          ref={chartRef}
          className="h-96 w-full"
          config={chartConfig}
        >
          <AreaChart
            className="overflow-visible"
            accessibilityLayer
            data={chartData}
            onMouseMove={(state) => {
              const x = state.activeCoordinate?.x;
              const dataValue = state.activePayload?.[0]?.value;
              if (x && dataValue !== undefined) {
                springX.set(x);
                springY.set(dataValue);
              }
            }}
            onMouseLeave={() => {
              springX.set(chartRef.current?.getBoundingClientRect().width || 0);
              if (chartData.length > 0) {
                springY.jump(chartData[chartData.length - 1].count);
              }
            }}
            margin={{
              right: 0,
              left: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              horizontalCoordinatesGenerator={(props) => {
                const { height } = props;
                return [0, height - 30];
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              tick={{ fontSize: 10, dx: -4 }}
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${value / 1000}k`;
                }
                return value;
              }}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              height={60}
              tickMargin={8}
              accentHeight={30}
              tick={{ fontSize: 10, dy: 10 }}
              angle={-45}
              interval={0} // <- force show all labels
              tickFormatter={(value) => {
                const date = new Date(value);
                // Format as "yy/M/d"
                const yy = String(date.getFullYear()).slice(2);
                const m = date.getMonth() + 1;
                const d = date.getDate();
                return `${yy}/${m}/${d}`;
              }}
            />
            <Area
              dataKey="count"
              type="monotone"
              fill="url(#gradient-cliped-area-count)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
              clipPath={`inset(0 ${
                Number(chartRef.current?.getBoundingClientRect().width) - axis
              } 0 0)`}
            />
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              formatter={(value, name, props) => {
                const payload = props?.payload;
                if (!payload) return [`${value} orders`, ""];
                return [
                  `${payload.count} orders, ${formatToNPR(payload.revenue)}`,
                  "Stats",
                ];
              }}
              labelFormatter={(label) => {
                const date = new Date(label);
                return date.toDateString();
              }}
            />
            <defs>
              <linearGradient
                id="gradient-cliped-area-count"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0}
                />
                <mask id="mask-cliped-area-chart">
                  <rect
                    x={0}
                    y={0}
                    width={"50%"}
                    height={"100%"}
                    fill="white"
                  />
                </mask>
              </linearGradient>
            </defs>
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
