import * as express from 'express';
import * as cors from 'cors';
import {personRouter} from "./routers/personRouter";
import {handleError} from "./utils/error";

const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/persons', personRouter);


app.use(handleError);

app.listen(3001, '0.0.0.0',()=>{
    console.log('listening on http://localhost:3001');
})





