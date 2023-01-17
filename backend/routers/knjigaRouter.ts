import express from 'express';
import { KnjigaController } from '../controllers/knjigaController';

const knjigaRouter=express.Router();

knjigaRouter.route('/sveKnjige').get(
    (req,res)=>new KnjigaController().sveKnjige(req,res)
)

knjigaRouter.route('/nadjiKnjigu').post(
    (req,res)=>new KnjigaController().nadjiKnjigu(req,res)
)

knjigaRouter.route('/decBrojKnjiga').post(
    (req,res)=>new KnjigaController().decBrojKnjiga(req,res)
)

knjigaRouter.route('/incBrojKnjiga').post(
    (req,res)=>new KnjigaController().incBrojKnjiga(req,res)
)

knjigaRouter.route('/uzmiKnjigu').post(
    (req,res)=>new KnjigaController().uzmiKnjigu(req,res)
)

knjigaRouter.route('/dodajKnjigu').post(
    (req,res)=>new KnjigaController().dodajKnjigu(req,res)
)

knjigaRouter.route('/promeniNaziv').post(
    (req,res)=>new KnjigaController().promeniNaziv(req,res)
)

knjigaRouter.route('/promeniAutor').post(
    (req,res)=>new KnjigaController().promeniAutor(req,res)
)

knjigaRouter.route('/promeniZanr').post(
    (req,res)=>new KnjigaController().promeniZanr(req,res)
)

knjigaRouter.route('/promeniIzdavac').post(
    (req,res)=>new KnjigaController().promeniIzdavac(req,res)
)

knjigaRouter.route('/promeniGodina').post(
    (req,res)=>new KnjigaController().promeniGodina(req,res)
)

knjigaRouter.route('/promeniJezik').post(
    (req,res)=>new KnjigaController().promeniJezik(req,res)
)

knjigaRouter.route('/promeniBrojKnjiga').post(
    (req,res)=>new KnjigaController().promeniBrojKnjiga(req,res)
)

knjigaRouter.route('/promeniSliku').post(
    (req,res)=>new KnjigaController().promeniSliku(req,res)
)

knjigaRouter.route('/izbrisiKnjigu').post(
    (req,res)=>new KnjigaController().izbrisiKnjigu(req,res)
)

export default knjigaRouter;