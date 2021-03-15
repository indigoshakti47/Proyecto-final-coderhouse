"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const productRoutes_1 = require("./routes/productRoutes");
const carritoRoutes_1 = require("./routes/carritoRoutes");
const app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use('/api/productos', productRoutes_1.router);
app.use('/api/carrito', carritoRoutes_1.router);
app.use(express_1.default.static(path_1.default.join(__dirname, './../public/build')));
const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
    console.log(`El servidor está corriendo en el puerto ${port}`);
});
