import express from 'express';
import cors from 'cors';
import {handleError} from "./utils/error";
import {addPersonRouter} from "./routers/addPersonRouter";
import {personListRouter} from "./routers/personListRouter";
import {positionRouter} from "./routers/positionRouter";
import {testRouter} from "./routers/testRouter";
const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors({
    origin: ` http://localhost:${PORT}`

}));
app.use(express.json());

app.use('/addPerson', addPersonRouter);
app.use('/personList', personListRouter);
app.use('/positions', positionRouter)
app.use('/testRouter', testRouter)


app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('listening on http://0.0.0.0:3001');
})





