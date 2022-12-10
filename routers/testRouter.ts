import { Router } from "express";





export const testRouter = Router();

testRouter
.get('/', async (req, res) => {


    return res.json({testMessage:'ok'});

    })