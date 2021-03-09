import { Producto } from "./Producto";
import {CarritoRepository} from "../repository/carrito.repository"

interface Carrito {
  id: number, 
  timestampp: Date, 
  productos: Producto[]
}

export default class Productos {

  array: Array<Carrito>

  constructor(array: Array<Carrito>) {
    this.array = array;
  }

  
  guardar(id: number, producto: Producto) {

    const timestampp: Date = new Date()
    if(!this.array.some(e => e.id === id)){
      const array = [producto]
      const newProduct: Carrito = {id, timestampp, productos:array}
      this.array = [...this.array, newProduct]
      new CarritoRepository().guardar(1, new Date(), newProduct.productos)
    }
    if(this.array.some(e => e.id === id)){
      const carrito = this.array.findIndex(car => car.id === id )
      this.array[carrito].productos.push(producto)
      new CarritoRepository().guardar(1, new Date(), this.array[carrito].productos)
    }


    return producto;

  }

  recuperarTodo(){
    return this.array.length === 0 ? {error: 'No hay carrito cargados'} : this.array
  }


  eliminarUno(id: number) {

    const carrito = this.array.findIndex(car => car.id === id )

    let deletedProduct = this.array[carrito]
    this.array[carrito].productos = this.array[carrito].productos.filter(product => product.id !== id)
    return deletedProduct
  }

  recuperarUno(id: number){
    let exists: Carrito;

    exists = this.array.find(car => car.id === id )!!
    return exists ? exists : {error: 'Producto no encontrado'}
  }

  recuperarCantidad(){
    return this.array.length
  }

}