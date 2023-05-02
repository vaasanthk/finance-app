import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api"
import { useTheme } from "@mui/material"
// import { Tooltip } from "@mui/material"

import { useMemo } from "react"
import {
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  Legend,
  LineChart,
  CartesianGrid,
  Line,
  Bar,
  BarChart,
} from "recharts"

const Row1 = () => {
  const { data } = useGetKpisQuery()
  const { palette } = useTheme()

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        }
      })
    )
  }, [data])

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, [data])

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        }
      })
    )
  }, [data])

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue & Expenses"
          subtitle="Avg annual gross profit $51294 and avg monthly $4274"
          sideText="Avg Yr Gr profit 23%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />

                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0.5}
                />

                <stop
                  offset="100%"
                  stopColor={palette.tertiary[500]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              style={{ textTransform: "capitalize", fontSize: "12px" }}
              dataKey="name"
              // tick={{ fill: "#988e77" }}
              tickLine={false}
            />
            <YAxis
              style={{ fontSize: "12px" }}
              // tick={{ fill: "#988e77" }}
              tickLine={false}
              axisLine={false}
              domain={[8000, 23000]}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "black", opacity: 0.8 }}
              labelFormatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
              itemStyle={{ borderColor: "black" }}
            />
            {/* <Legend /> */}
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              dot={true}
            />

            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.tertiary[400]}
              fillOpacity={1}
              fill="url(#colorExpenses)"
              dot={true}
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit & Revenue"
          subtitle="Avg monthly profits for the year 2023"
          sideText="Approx 1.92% monthly"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              style={{ textTransform: "capitalize", fontSize: "12px" }}
              dataKey="name"
              // tick={{ fill: "#988e77" }}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              style={{ fontSize: "12px" }}
              // tick={{ fill: "#988e77" }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              yAxisId="right"
              orientation="right"
              style={{ fontSize: "12px" }}
              // tick={{ fill: "#988e77" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "black", opacity: 0.8 }}
              labelFormatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />

            <Legend
              height={20}
              wrapperStyle={{
                margin: "0 0 10px 0",
              }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="graph representing the revenue month by month"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 58,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                />

                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: "black", opacity: 0.8 }}
              labelFormatter={(value) =>
                value.charAt(0).toUpperCase() + value.slice(1)
              }
            />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row1
