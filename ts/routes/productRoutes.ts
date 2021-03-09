import express, { Request, Response } from "express";

import Productos from "../service/Producto";
import { ProductoRepository } from "../repository/product.repository";

const router = express.Router()

let productos = new ProductoRepository().leer()
let producto = new Productos(typeof(productos) === 'string' ? JSON.parse(productos): [])

interface Producto {
  nombre: string, 
  descripcion: string, 
  codigo: string, 
  foto: string, 
  precio: number, 
  stock: number
}


router.get('/listar/:id?', async (req: Request, res: Response) => {

  try {

    const id: number = parseInt(req.params.id);

    if(id) res.send(producto.recuperarUno(id));
    if(!id) res.send(producto.recuperarTodo())

  } catch(err) {
    console.log(err)
  }
  
})

router.post('/agregar', async (req: Request, res: Response) => {

  try {

    const {nombre, descripcion, codigo, foto, precio, stock}: Producto = req.body 
    res.send(producto.guardar(producto.recuperarCantidad(), nombre, descripcion, codigo, foto, precio, stock))

  } catch(err) {
    console.log(err)
  }
})

router.put('/actualizar/:id', async(req: Request, res: Response) => {
  try {

    const id: number = parseInt(req.params.id)
    const {nombre, descripcion, codigo, foto, precio, stock} : Producto = req.body 

    producto.actualizarUno(id, nombre, descripcion, codigo, foto, precio, stock)

    res.send({nombre, descripcion, codigo, foto, precio, stock})
  } catch(err) {
    console.log(err)
  }
})

router.delete('/borrar/:id', async(req: Request, res: Response) => {
  try {
    const id : number = parseInt(req.params.id)

    const deletedProduct = producto.eliminarUno(id)

    res.send(deletedProduct)
    
  } catch (error) {
    console.log(error)
  }
})

export {router, producto}