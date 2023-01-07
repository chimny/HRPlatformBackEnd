"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = require("./utils/error");
const addPersonRouter_1 = require("./routers/addPersonRouter");
const personListRouter_1 = require("./routers/personListRouter");
const positionRouter_1 = require("./routers/positionRouter");
const app = (0, express_1.default)();
const hostedDomain = 'https://chimny.github.io';
const localDomain = `http://localhost:3000`;
app.use((0, cors_1.default)({
    origin: [localDomain, hostedDomain],
}));
app.use(express_1.default.json());
app.use('/addPerson', addPersonRouter_1.addPersonRouter);
app.use('/personList', personListRouter_1.personListRouter);
app.use('/positions', positionRouter_1.positionRouter);
app.use(error_1.handleError);
app.listen(3001, '0.0.0.0', () => {
    console.log('listening on http://0.0.0.0:3001');
});
//# sourceMappingURL=index.js.map