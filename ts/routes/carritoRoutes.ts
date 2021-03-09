import express, { Request, Response } from "express";

import Carrito from "../service/Carrito";
import {producto} from './productRoutes';
import {Producto} from "../service/Producto";
import {CarritoRepository} from "../repository/carrito.repository"

const router = express.Router()

let carritos = new CarritoRepository().leer()
let carrito = new Carrito(typeof(carritos) === 'string' ? JSON.parse(carritos): [])

interface carrito {
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

    if(id) res.send(carrito.recuperarUno(id));
    if(!id) res.send(carrito.recuperarTodo())

  } catch(err) {
    console.log(err)
  }
  
})

router.patch('/agregar/:id_producto', async (req: Request, res: Response) => {

  try {

    const id_producto: number = parseInt(req.params.id_producto);
    const productoSelected: Producto = producto.recuperarUnoo(id_producto)

    res.send(carrito.guardar(1, productoSelected))

  } catch(err) {
    console.log(err)
  }
})

router.patch('/borrar/:id', async(req: Request, res: Response) => {
  try {
    const id : number = parseInt(req.params.id)

    const deletedProduct = carrito.eliminarUno(id)

    res.send(deletedProduct)
    
  } catch (error) {
    console.log(error)
  }
})

export {router, carrito}