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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const notFound_1 = __importDefault(require("./app/modules/middlewares/notFound"));
const globalErrorHandler_1 = __importDefault(require("./app/modules/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use(cors({origin : ['http://localhost:3000' , 'https://meal-shop-client.vercel.app/'] , credentials : true})) ;
const allowedOrigins = [
    "http://localhost:3000",
    "https://meal-shop-client.vercel.app"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
// app.options("*", cors());
app.use('/api/v1', routes_1.default);
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "The meal box server are running !", success: true });
}));
app.use(notFound_1.default);
app.use(globalErrorHandler_1.default);
exports.default = app;
