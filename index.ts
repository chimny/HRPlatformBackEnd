import express from 'express';
import cors from 'cors';
import handleError from "./utils/error";
import addPersonRouter from "./routers/addPersonRouter";
import personListRouter from "./routers/personListRouter";
import positionRouter from "./routers/positionRouter";


const app = express();


const hostedDomain = 'https://chimny.github.io';
const localDomain = `http://localhost:3000`;

app.use(cors({
    origin: [localDomain, hostedDomain],
}));


app.use(express.json());



app.use('/addPerson', addPersonRouter);
app.use('/personList', personListRouter);
app.use('/positions', positionRouter)


app.use(handleError);


const port = process.env.PORT || 3001

//before it was 3000, old version
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})




