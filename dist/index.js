"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const error_1 = __importDefault(require("./utils/error"));
const addPersonRouter_1 = __importDefault(require("./routers/addPersonRouter"));
const personListRouter_1 = __importDefault(require("./routers/personListRouter"));
const positionRouter_1 = __importDefault(require("./routers/positionRouter"));
const app = (0, express_1.default)();
const hostedDomain = 'https://chimny.github.io';
const localDomain = `http://localhost:3000`;
app.use((0, cors_1.default)({
    origin: [localDomain, hostedDomain],
}));
app.use(express_1.default.json());
app.use('/addPerson', addPersonRouter_1.default);
app.use('/personList', personListRouter_1.default);
app.use('/positions', positionRouter_1.default);
app.use(error_1.default);
const port = process.env.PORT || 3001;
//before it was 3000, old version
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
// app.listen(3306, 'localhost', () => {
//     console.log('listening on http://localhost:3306');
// });
//# sourceMappingURL=index.js.map