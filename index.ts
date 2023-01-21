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
    origin: [localDomain,hostedDomain,'https://hr-platform-back-end-hcnj.vercel.app/','http://hr-platform-back-end-hcnj-git-main-chimny.vercel.app/','http://hr-platform-back-end-hcnj.vercel.app/'],
}));



app.use(express.json());

app.use('/addPerson', addPersonRouter);
app.use('/personList', personListRouter);
app.use('/positions', positionRouter)


app.use(handleError);


app.listen(process.env.PORT || 3001, () => {
    console.log('listening on http://0.0.0.0:3001');
})




