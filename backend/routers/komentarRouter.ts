import express from 'express'
import { KomentarController } from '../controllers/komentarController';

const komentarRouter=express.Router();

komentarRouter.route('/sviKomentariZaKnjigu').post(
    (req,res)=>new KomentarController().sviKomentariZaKnjigu(req,res)
)

komentarRouter.route('/dodajKomentar').post(
    (req,res)=>new KomentarController().dodajKomentar(req,res)
)

komentarRouter.route('/promeniKomentar').post(
    (req,res)=>new KomentarController().promeniKomentar(req,res)
)

export default komentarRouter