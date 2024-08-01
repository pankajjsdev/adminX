"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", desktop: 186, mobile: 120 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 150 },
  { month: "April", desktop: 73, mobile: 90 },
  { month: "May", desktop: 209, mobile: 160 },
  { month: "June", desktop: 214, mobile: 180 },
  { month: "July", desktop: 230, mobile: 190 },
  { month: "August", desktop: 245, mobile: 200 },
  { month: "September", desktop: 260, mobile: 210 },
  { month: "October", desktop: 275, mobile: 220 },
  { month: "November", desktop: 290, mobile: 230 },
  { month: "December", desktop: 300, mobile: 240 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend verticalAlign="top" height={36}/>
            <Line
              name="Desktop"
              dataKey="desktop"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              name="Mobile"
              dataKey="mobile"
              type="natural"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {chartData[chartData.length - 1].desktop > chartData[chartData.length - 2].desktop ? (
            <span>Trending up by {((chartData[chartData.length - 1].desktop - chartData[chartData.length - 2].desktop) / chartData[chartData.length - 2].desktop * 100).toFixed(1)}% this month <TrendingUp className="h-4 w-4" /></span>
          ) : (
            <span>Trending down by {((chartData[chartData.length - 2].desktop - chartData[chartData.length - 1].desktop) / chartData[chartData.length - 2].desktop * 100).toFixed(1)}% this month <TrendingDown className="h-4 w-4" /></span>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 12 months
        </div>
      </CardFooter>
    </Card>
  )
}
