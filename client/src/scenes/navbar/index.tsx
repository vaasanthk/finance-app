import FlexBetween from "@/components/FlexBetween"
import DeblurIcon from "@mui/icons-material/Deblur"
import { Box, Typography, useTheme } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import usePageTitle from "./pageTitle"
type Props = {}

const Navbar = (props: Props) => {
  usePageTitle()
  const { palette } = useTheme()
  const [selected, setSelected] = useState("dashboard")

  return (
    <FlexBetween mb="0.25rem" p="0.5rem 0rem" color="wheat">
      {/* LEFT SIDE */}
      <FlexBetween gap=".75rem">
        <DeblurIcon sx={{ fontSize: "30px" }} />
        <Typography variant="h4" fontSize="18px" color="wheat">
          Finantics
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap="2rem">
        <Box sx={{ "&:hover": { cursor: palette.primary[100] } }}>
          <Link
            to="/"
            onClick={() => setSelected("dashboard")}
            style={{
              fontSize: "16px",
              color: selected === "dashboard" ? "wheat" : "#696358",
              textDecoration: "inherit",
            }}
          >
            dashboard
          </Link>
        </Box>

        <Box sx={{ "&:hover": { cursor: palette.primary[100] } }}>
          <Link
            to="/predictions"
            onClick={() => setSelected("predictions")}
            style={{
              fontSize: "16px",
              color: selected === "predictions" ? "wheat" : "#696358",
              textDecoration: "inherit",
            }}
          >
            predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  )
}

export default Navbar
