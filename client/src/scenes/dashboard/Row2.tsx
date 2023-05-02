import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material"
import { useMemo } from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  ZAxis,
} from "recharts"
import CustomPie from "./CustomPie"

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
]

const Row2 = () => {
  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[300]]
  const { data: operationalData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()

  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          }
        }
      )
    )
  }, [operationalData])

  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        }
      })
    )
  }, [productData])

  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-operational Expenses"
          subtitle="Avg monthly profits for the year 2023"
          sideText="Approx 1.92% monthly"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
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

            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />

            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

      <DashboardBox gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="20%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="f">
        <BoxHeader title="Product Prices Vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
              tickFormatter={(v) => `$${v}`}
            />

            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "12px" }}
            />

            <ZAxis type="number" range={[20]} />

            <Tooltip
              formatter={(v) => `$${v}`}
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{ backgroundColor: "black", opacity: 0.8 }}
              itemStyle={{ color: "#71f5de" }}
            />
            <Scatter
              name="Product Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[400]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2
