"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const carrito_repository_1 = require("../repository/carrito.repository");
class Productos {
    constructor(array) {
        this.array = array;
    }
    guardar(id, producto) {
        const timestampp = new Date();
        if (!this.array.some(e => e.id === id)) {
            const array = [producto];
            const newProduct = { id, timestampp, productos: array };
            this.array = [...this.array, newProduct];
            new carrito_repository_1.CarritoRepository().guardar(1, new Date(), newProduct.productos);
        }
        if (this.array.some(e => e.id === id)) {
            const carrito = this.array.findIndex(car => car.id === id);
            this.array[carrito].productos.push(producto);
            new carrito_repository_1.CarritoRepository().guardar(1, new Date(), this.array[carrito].productos);
        }
        return producto;
    }
    recuperarTodo() {
        return this.array.length === 0 ? { error: 'No hay carrito cargados' } : this.array;
    }
    eliminarUno(id) {
        const carrito = this.array.findIndex(car => car.id === id);
        let deletedProduct = this.array[carrito];
        this.array[carrito].productos = this.array[carrito].productos.filter(product => product.id !== id);
        return deletedProduct;
    }
    recuperarUno(id) {
        let exists;
        exists = this.array.find(car => car.id === id);
        return exists ? exists : { error: 'Producto no encontrado' };
    }
    recuperarCantidad() {
        return this.array.length;
    }
}
exports.default = Productos;
