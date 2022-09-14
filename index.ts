import * as express from 'express';
import * as cors from 'cors';
import {personRouter} from "./routers/personRouter";
import {PersonPositionRecord} from "./records/personPosition.record";
import {handleError} from "./utils/error";
/*

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



*/


//test function for methods testing below


(async () => {
  // console.log(await PersonPositionRecord.listAll())
    console.log(await PersonPositionRecord.getOne('6e52cb18-3203-11ed-826c-382c4a1f0865'))
})()
