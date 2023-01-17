import express from 'express';
import { GlobalController } from '../controllers/globalController';

const globalRouter=express.Router();

globalRouter.route('/getDaysReturn').get(
    (req,res)=>new GlobalController().getDaysReturn(req,res)
)

globalRouter.route('/promeniRok').post(
    (req,res)=>new GlobalController().promeniRok(req,res)
)

globalRouter.route('/promeniProduzenje').post(
    (req,res)=>new GlobalController().promeniProduzenje(req,res)
)

globalRouter.route('/promeniIdKnjiga').post(
    (req,res)=>new GlobalController().promeniIdKnjiga(req,res)
)
export default globalRouter;