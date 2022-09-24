import * as express from 'express';
import * as cors from 'cors';
import {handleError} from "./utils/error";
import {addPersonRouter} from "./routers/addPersonRouter";
import {personListRouter} from "./routers/personListRouter";


const app = express();


app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.use('/addPerson', addPersonRouter);
app.use('/personList',personListRouter)


app.use(handleError);

app.listen(3001, '0.0.0.0',()=>{
    console.log('listening on http://localhost:3001');
})





