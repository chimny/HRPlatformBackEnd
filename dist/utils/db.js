"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: 'sql7.freesqldatabase.com',
    user: 'sql7584738',
    database: 'sql7584738',
    password: 'ScS8nHbVJv',
    namedPlaceholders: true,
    decimalNumbers: true,
});
/*
* below pool for localhost connection
*
*
*
* export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'hr_platform',
    namedPlaceholders: true,
    decimalNumbers: true,
});
*
* */
//# sourceMappingURL=db.js.map