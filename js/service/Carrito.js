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
            const newProduct = { id, timestampp, products: array };
            this.array = [...this.array, newProduct];
            new carrito_repository_1.CarritoRepository().guardar(1, new Date(), newProduct.products);
        }
        if (this.array.some(e => e.id === id)) {
            const carrito = this.array.findIndex(car => car.id === id);
            this.array[carrito].products.push(producto);
            new carrito_repository_1.CarritoRepository().guardar(1, new Date(), this.array[carrito].products);
        }
        return producto;
    }
    recuperarTodo() {
        return this.array.length === 0 ? { error: 'No hay carrito cargados' } : this.array;
    }
    eliminarUno(id) {
        const carrito = this.array[0].products.findIndex(car => car.id === id);
        let deletedProduct = this.array[0].products[carrito];
        this.array[0].products = this.array[0].products.filter(product => product.id !== id);
        new carrito_repository_1.CarritoRepository().actualizar(this.array);
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
