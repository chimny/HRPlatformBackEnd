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
    origin: [localDomain, hostedDomain, 'https://hr-platform-back-end-hcnj.vercel.app/', 'http://hr-platform-back-end-hcnj-git-main-chimny.vercel.app/', 'http://hr-platform-back-end-hcnj.vercel.app/'],
}));
app.use(express_1.default.json());
app.use('/addPerson', addPersonRouter_1.default);
app.use('/personList', personListRouter_1.default);
app.use('/positions', positionRouter_1.default);
app.use(error_1.default);
app.listen(process.env.PORT || 3001, () => {
    console.log('listening on http://0.0.0.0:3001');
});
//# sourceMappingURL=index.js.map