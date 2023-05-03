import bodyParser from "body-parser"
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import kpiRoutes from "./routes/kpi.js"
import KPI from "./models/KPI.js"
import { kpis, products, transactions } from "./data/data.js"
import productRoutes from "./routes/product.js"
import Product from "./models/Product.js"
import transactionRoutes from "./routes/transaction.js"
import Transaction from "./models/Transaction.js"

/* CONFIGURATION */
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

/* ROUTES */
app.use("/kpis", kpiRoutes)
app.use("/product", productRoutes)
app.use("/transaction", transactionRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000

console.log("Contecting.....")

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server port ${PORT}`)
    })

    /* Add data one time only or as needed */
//     await mongoose.connection.db.dropDatabase()
//     KPI.insertMany(kpis)
//     Product.insertMany(products)
//     Transaction.insertMany(transactions)
  })
  .catch((err) => console.log(err, "did not connect"))
