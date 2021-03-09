import express, { Application } from "express";
import path from "path";

import {router as productRoutes} from "./routes/productRoutes"
import {router as carritoRoutes} from "./routes/carritoRoutes"

const app: Application = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/productos', productRoutes)
app.use('/api/carrito', carritoRoutes)

app.use(express.static(path.join(__dirname, './../public')))

const port: number = parseInt(process.env.PORT!) || 8080

app.listen(port, () => {
  console.log(`El servidor está corriendo en el puerto ${port}`)
})
