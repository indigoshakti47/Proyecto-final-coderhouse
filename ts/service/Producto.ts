import {ProductoRepository} from "../repository/product.repository";

export interface Producto {
  id: number, 
  timestampp: Date, 
  nombre: string, 
  descripcion: string, 
  codigo: string, 
  foto: string, 
  precio: number, 
  stock: number
}

const productoRepository: ProductoRepository = new ProductoRepository()
export default class Productos {

  array: Array<Producto>

  constructor(array: Array<Producto>) {
    this.array = array;
  }

  
  guardar(id: number, nombre: string, descripcion: string, codigo: string, foto: string, precio: number, stock: number) {

    const timestampp: Date = new Date()
    const newProduct: Producto = {id, timestampp, nombre, descripcion, codigo, foto, precio, stock}
    this.array = [...this.array, newProduct]
    productoRepository.guardar(id, timestampp, nombre, descripcion, codigo, foto, precio, stock)
    return newProduct;

  }

  recuperarTodo(){
    return this.array.length === 0 ? {error: 'No hay productos cargados'} : this.array
  }

  actualizarUno(id: number, nombre: string, descripcion: string, codigo: string, foto: string, precio: number, stock: number) {

    this.array.forEach(product => {
      if(product.id === id){
        product.nombre = nombre
        product.descripcion = descripcion
        product.codigo = codigo
        product.foto = foto
        product.precio = precio
        product.stock = stock
      }
    })
  }

  eliminarUno(id: number) {

    let deletedProduct = this.array.filter(product => product.id === id)
    this.array = this.array.filter(product => product.id !== id)
    return deletedProduct
  }

  recuperarUno(id: number){
    let exists: Producto;

    exists = this.array.find(product => product.id === id )!!
    return exists ? exists : {error: 'Producto no encontrado'}
  }

  recuperarUnoo(id: number){
    let exists: Producto;

    exists = this.array.find(product => product.id === id )!!
    return exists
  }

  recuperarCantidad(){
    return this.array.length
  }

}