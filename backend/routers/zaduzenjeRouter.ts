import express from 'express';
import { ZaduzenjeController } from '../controllers/zaduzenjeController';

const zaduzenjeRouter=express.Router();

zaduzenjeRouter.route('/nadjiZaduzenje').post(
    (req,res)=>new ZaduzenjeController().nadjiZaduzenje(req,res)
)

zaduzenjeRouter.route('/nadjiZaduzenjeKnjiga').post(
    (req,res)=>new ZaduzenjeController().nadjiZaduzenjeKnjiga(req,res)
)


zaduzenjeRouter.route('/novoZaduzenje').post(
    (req,res)=>new ZaduzenjeController().novoZaduzenje(req,res)
)

zaduzenjeRouter.route('/zavrsiZaduzenje').post(
    (req,res)=>new ZaduzenjeController().zavrsiZaduzenje(req,res)
)

zaduzenjeRouter.route('/sortDatumVracanjaDS').post(
    (req,res)=>new ZaduzenjeController().sortDatumVracanjaDS(req,res)
)

zaduzenjeRouter.route('/sortDatumVracanjaAS').post(
    (req,res)=>new ZaduzenjeController().sortDatumVracanjaAS(req,res)
)

zaduzenjeRouter.route('/sortDatumZaduzenjaDS').post(
    (req,res)=>new ZaduzenjeController().sortDatumZaduzenjaDS(req,res)  
)

zaduzenjeRouter.route('/sortDatumZaduzenjaAS').post(
    (req,res)=>new ZaduzenjeController().sortdatumZaduzenjaAS(req,res)
)

zaduzenjeRouter.route('/produzi').post(
    (req,res)=>new ZaduzenjeController().produzi(req,res)
)

zaduzenjeRouter.route('/nadjiTrenutnaZaduzenja').post(
    (req,res)=>new ZaduzenjeController().nadjiTrenutnaZaduzenja(req,res)
)

zaduzenjeRouter.route('/changeProduzenje').post(
    (req,res)=>new ZaduzenjeController().changeProduzenje(req,res)
)

export default zaduzenjeRouter;