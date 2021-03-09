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
exports.producto = exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Producto_1 = __importDefault(require("../service/Producto"));
const product_repository_1 = require("../repository/product.repository");
const router = express_1.default.Router();
exports.router = router;
let productos = new product_repository_1.ProductoRepository().leer();
let producto = new Producto_1.default(typeof (productos) === 'string' ? JSON.parse(productos) : []);
exports.producto = producto;
router.get('/listar/:id?', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id)
            res.send(producto.recuperarUno(id));
        if (!id)
            res.send(producto.recuperarTodo());
    }
    catch (err) {
        console.log(err);
    }
}));
router.post('/agregar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        res.send(producto.guardar(producto.recuperarCantidad(), nombre, descripcion, codigo, foto, precio, stock));
    }
    catch (err) {
        console.log(err);
    }
}));
router.put('/actualizar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        producto.actualizarUno(id, nombre, descripcion, codigo, foto, precio, stock);
        res.send({ nombre, descripcion, codigo, foto, precio, stock });
    }
    catch (err) {
        console.log(err);
    }
}));
router.delete('/borrar/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const deletedProduct = producto.eliminarUno(id);
        res.send(deletedProduct);
    }
    catch (error) {
        console.log(error);
    }
}));
