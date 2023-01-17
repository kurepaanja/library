import express from 'express';
import { RezervacijaController } from '../controllers/RezervacijaController';

const rezervacijaRouter=express.Router();

rezervacijaRouter.route('/dodajRezervaciju').post(
    (req,res)=>new RezervacijaController().dodajRezervaciju(req,res)
)

rezervacijaRouter.route('/dohvatiRezervaciju').post(
    (req,res)=>new RezervacijaController().dohvatiRezervaciju(req,res)
)

rezervacijaRouter.route('/izbrisiKorisnika').post(
    (req,res)=>new RezervacijaController().izbrisiKorisnika(req,res)
)


rezervacijaRouter.route('/napraviRezervaciju').post(
    (req,res)=>new RezervacijaController().napraviRezervaciju(req,res)
)

export default rezervacijaRouter;