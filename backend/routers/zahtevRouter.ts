import express from 'express';
import { ZahtevController } from '../controllers/zahtevController';

const zahtevRouter=express.Router();

zahtevRouter.route('/sviZahtevi').get(
    (req,res)=>new ZahtevController().sviZahtevi(req,res)
)

zahtevRouter.route('/prihvatiZahtev').post(
    (req,res)=>new ZahtevController().prihvatiZahtev(req,res)
)

zahtevRouter.route('/dodajZahtev').post(
    (req,res)=>new ZahtevController().dodajZahtev(req,res)
)

zahtevRouter.route('/mojiZahtevi').post(
    (req,res)=>new ZahtevController().mojiZahtevi(req,res)
)

zahtevRouter.route('/deleteZahtev').post(
    (req,res)=>new ZahtevController().deleteZahtev(req,res)
)

export default zahtevRouter;