import fs from "fs";
import { Producto } from "../service/Producto";

export class CarritoRepository {
  constructor( ) {

  }

  /**
   * Función para declarar un nuevo objeto tipo producto para ser usado en la creación del
   * archivo, si ya hay un archivo con productos se añade uno nuevo aumentando el id, si no hay
   * un archivo, retorna un objeto con el producto y el id establecido en 1
   * 
   * @returns {Object}
   */
  
  jsonToSave(id: number, 
    timestampp: Date, 
    products: Producto[]){
    
      return [{
        id: id,
        timestampp: timestampp,
        products
      }]
    }
  


  async guardar(id: number, 
    timestampp: Date, 
    products: Producto[]) {

    try{
      //await fs.unlinkSync('./Carrito.txt')
      fs.writeFileSync('./Carrito.txt', JSON.stringify(this.jsonToSave(id, 
        timestampp, 
        products)))
      console.log(`Archivo guardado`)
    } catch(err) {
      console.log(err)
    }
  }

  leer() {
    try {
      const data = fs.readFileSync('./Carrito.txt', 'utf-8')
      console.log(data);
      return data;
    } catch (error) {
      console.log([]);
      return [];
    }
    
  }
}

