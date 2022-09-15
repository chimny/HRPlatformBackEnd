import * as express from 'express';
import * as cors from 'cors';
import {personRouter} from "./routers/personRouter";
import {PersonPositionRecord} from "./records/personPosition.record";
import {handleError} from "./utils/error";
import {personPositionRouter} from "./routers/personPositionRouter";

const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/persons', personRouter);
app.use('/personsUpdate',personPositionRouter)


app.use(handleError);

app.listen(3001, '0.0.0.0',()=>{
    console.log('listening on http://localhost:3001');
})





