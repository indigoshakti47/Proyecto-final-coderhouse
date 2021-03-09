"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrito = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Carrito_1 = __importDefault(require("../service/Carrito"));
const productRoutes_1 = require("./productRoutes");
const carrito_repository_1 = require("../repository/carrito.repository");
const router = express_1.default.Router();
exports.router = router;
let carritos = new carrito_repository_1.CarritoRepository().leer();
let carrito = new Carrito_1.default(typeof (carritos) === 'string' ? JSON.parse(carritos) : []);
exports.carrito = carrito;
router.get('/listar/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id)
            res.send(carrito.recuperarUno(id));
        if (!id)
            res.send(carrito.recuperarTodo());
    }
    catch (err) {
        console.log(err);
    }
}));
router.patch('/agregar/:id_producto', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_producto = parseInt(req.params.id_producto);
        const productoSelected = productRoutes_1.producto.recuperarUnoo(id_producto);
        res.send(carrito.guardar(1, productoSelected));
    }
    catch (err) {
        console.log(err);
    }
}));
router.patch('/borrar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedProduct = carrito.eliminarUno(id);
        res.send(deletedProduct);
    }
    catch (error) {
        console.log(error);
    }
}));
