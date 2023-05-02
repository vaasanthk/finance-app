import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"
import { useMemo } from "react"
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts"

const Row3 = () => {
  const { data: kpiData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()
  const { data: transactionData } = useGetTransactionsQuery()

  const { palette } = useTheme()
  const pieColors = [palette.primary[800], palette.primary[500]]

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            { name: key, value: value },
            { name: `${key} of Total`, value: totalExpenses - value },
          ]
        }
      )
    }
  }, [kpiData])

  const productColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 0.8,
    },

    {
      field: "expense",
      headerName: "Expense",
      flex: 0.6,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },

    {
      field: "price",
      headerName: "Price",
      flex: 0.8,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]

  const transactionColumns = [
    {
      field: "_id",
      headerName: "id",
      flex: 0.8,
    },

    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.6,
    },

    {
      field: "amount",
      headerName: "Amount",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },

    {
      field: "productIds",
      headerName: "Count",
      flex: 0.2,
      renderCell: (params: GridCellParams) =>
        (params.value as Array<string>).length,
    },
  ]

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />

        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },

            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },

            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },

            "&.MuiDataGrid-sortIcon": {
              color: palette.grey[300],
            },

            "& .MuiDataGrid-sortIcon": {
              opacity: 1,
              color: "white",
            },

            "& .MuiDataGrid-menuIconButton": {
              opacity: 1,
              color: "white",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={35}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} products`}
        />

        <Box
          mt="1rem"
          p="0 0.5rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },

            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },

            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },

            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },

            "& .MuiDataGrid-sortIcon": {
              opacity: 1,
              color: "white",
            },

            "& .MuiDataGrid-menuIconButton": {
              opacity: 1,
              color: "white",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={35}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      <DashboardBox gridArea="i">
        <Box marginTop={-0.8}>
          <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        </Box>
        <FlexBetween mt="-0.4rem" gap="0" p="0 1rem" textAlign={"center"}>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          margin={"1.25rem 1rem 0.4rem 1rem"}
          height="15px"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height={15}
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          necessitatibus neque minima error perferendis tempore officiis nihil
          totam omnis illo dolores porro eligendi nam consectetur, incidunt
          assumenda rem earum inventore!
        </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3
