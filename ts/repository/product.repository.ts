import fs from "fs";

export class ProductoRepository {
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
    nombre: string, 
    descripcion: string, 
    codigo: string, 
    foto: string, 
    precio: number, 
    stock: number){
    try{
      const data = fs.readFileSync('./Productos.txt', 'utf-8');
      let dataFromProducto = JSON.parse(data);
      dataFromProducto.push({
        id: (dataFromProducto.length + 1),
        timestampp: timestampp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      })
      return dataFromProducto
    }catch {
      return [{
        id: 1,
        timestampp: timestampp,
        nombre: nombre,
        descripcion: descripcion,
        codigo: codigo,
        foto: foto,
        precio: precio,
        stock: stock,
      }]
    }
  }

  async guardar(id: number, 
    timestampp: Date, 
    nombre: string, 
    descripcion: string, 
    codigo: string, 
    foto: string, 
    precio: number, 
    stock: number) {

    try{
      fs.writeFileSync('./Productos.txt', JSON.stringify(this.jsonToSave(id, 
        timestampp, 
        nombre, 
        descripcion, 
        codigo, 
        foto, 
        precio, 
        stock)))
      console.log(`Archivo guardado`)
    } catch(err) {
      console.log(err)
    }
  }

  leer() {
    try {
      const data = fs.readFileSync('./Productos.txt', 'utf-8')
      return data;
    } catch (error) {
      console.log([]);
      return [];
    }
    
  }
}

