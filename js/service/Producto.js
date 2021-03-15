"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_repository_1 = require("../repository/product.repository");
const productoRepository = new product_repository_1.ProductoRepository();
class Productos {
    constructor(array) {
        this.array = array;
    }
    guardar(id, nombre, descripcion, codigo, foto, precio, stock) {
        const timestampp = new Date();
        const newProduct = { id, timestampp, nombre, descripcion, codigo, foto, precio, stock };
        this.array = [...this.array, newProduct];
        productoRepository.guardar(id, timestampp, nombre, descripcion, codigo, foto, precio, stock);
        return newProduct;
    }
    recuperarTodo() {
        return this.array.length === 0 ? { error: 'No hay productos cargados' } : this.array;
    }
    actualizarUno(id, nombre, descripcion, codigo, foto, precio, stock) {
        this.array.forEach(product => {
            if (product.id === id) {
                product.nombre = nombre;
                product.descripcion = descripcion;
                product.codigo = codigo;
                product.foto = foto;
                product.precio = precio;
                product.stock = stock;
            }
        });
        productoRepository.actualizar(this.array);
    }
    eliminarUno(id) {
        let deletedProduct = this.array.filter(product => product.id === id);
        this.array = this.array.filter(product => product.id !== id);
        productoRepository.actualizar(this.array);
        return deletedProduct;
    }
    recuperarUno(id) {
        let exists;
        exists = this.array.find(product => product.id === id);
        return exists ? exists : { error: 'Producto no encontrado' };
    }
    recuperarUnoo(id) {
        let exists;
        exists = this.array.find(product => product.id === id);
        return exists;
    }
    recuperarCantidad() {
        return this.array.length;
    }
}
exports.default = Productos;
