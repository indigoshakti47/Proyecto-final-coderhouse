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
exports.CarritoRepository = void 0;
const fs_1 = __importDefault(require("fs"));
class CarritoRepository {
    constructor() {
    }
    /**
     * Función para declarar un nuevo objeto tipo producto para ser usado en la creación del
     * archivo, si ya hay un archivo con productos se añade uno nuevo aumentando el id, si no hay
     * un archivo, retorna un objeto con el producto y el id establecido en 1
     *
     * @returns {Object}
     */
    jsonToSave(id, timestampp, products) {
        return [{
                id: id,
                timestampp: timestampp,
                products
            }];
    }
    guardar(id, timestampp, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //await fs.unlinkSync('./Carrito.txt')
                fs_1.default.writeFileSync('./Carrito.txt', JSON.stringify(this.jsonToSave(id, timestampp, products)));
                console.log(`Archivo guardado`);
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    leer() {
        try {
            const data = fs_1.default.readFileSync('./Carrito.txt', 'utf-8');
            console.log(data);
            return data;
        }
        catch (error) {
            console.log([]);
            return [];
        }
    }
}
exports.CarritoRepository = CarritoRepository;
