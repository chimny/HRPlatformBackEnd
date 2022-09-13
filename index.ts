import * as express from 'express';
import * as cors from 'cors';
import {personRouter} from "./routers/personRouter";
import {PersonPosition} from "./records/personPosition.record";
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





//test function for methods testing below

/*

(async () => {
    const testRecord = new PersonPosition({
        id: "",
        personId: "b5eece52-6639-481e-a29b-89d7ad0cfb02",
        position: 'Manager',
        salary: 2500
    })
    await testRecord.insert()
})()
*/
