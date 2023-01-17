import express from 'express';
import ZaduzenjeModel from '../model/zaduzenje'

export class ZaduzenjeController {

    nadjiZaduzenje = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;

        ZaduzenjeModel.find({ "korisnickoIme": korisnickoIme }, (err, data) => {
            if (err) console.log(err);
            else res.json(data);
        })

    }

    nadjiZaduzenjeKnjiga=(req:express.Request, res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga

        ZaduzenjeModel.find({'idKnjiga':idKnjiga},(err,data)=>{
            if(err) console.log(err);
            else res.json(data);
        })
    }



    novoZaduzenje = (req: express.Request, res: express.Response) => {
        let zad = new ZaduzenjeModel({
            idKnjiga: req.body.idKnjiga,
            korisnickoIme: req.body.korisnickoIme,
            datumZaduzenja: req.body.datumZaduzenja,
            datumVracanja: "",
            produzenje:0,
            rezervacija:req.body.rezervacija
            
        })

        zad.save((err, resp) => {
            if (err) {
                console.log(err)
            }
            else res.json({ 'message': 'ok' })
        })

    }

    zavrsiZaduzenje = (req: express.Request, res: express.Response) => {
        let idKnjiga = req.body.idKnjiga;
        let korisnickoIme = req.body.korisnickoIme;
        let datumVracanja = req.body.datumVracanja;
        //console.log(idKnjiga)
       // console.log(korisnickoIme)
        //console.log(datumVracanja)
        
        //console.log('here');
        ZaduzenjeModel.updateOne({ 'idKnjiga': idKnjiga, 'korisnickoIme': korisnickoIme, 'datumVracanja':'' }, { $set: { 'datumVracanja': datumVracanja } }, (err, resp) => {
            //console.log("A")
            if (err) console.log(err)
            else res.json({ 'message': 'ok' })
        })


    }

    sortDatumVracanjaDS=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        ZaduzenjeModel.find({'korisnickoIme':korisnickoIme,"datumVracanja":{$ne:""}}).sort({datumVracanja:-1}).exec((err,data)=>{
            if(err) console.log(err);
            else res.json(data)
        })
    }

    sortDatumVracanjaAS=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        ZaduzenjeModel.find({'korisnickoIme':korisnickoIme,"datumVracanja":{$ne:""}}).sort({datumVracanja:1}).exec((err,data)=>{
            if(err) console.log(err);
            else res.json(data)
        })
    }

    sortDatumZaduzenjaDS=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        ZaduzenjeModel.find({'korisnickoIme':korisnickoIme,"datumVracanja":{$ne:""}}).sort({datumZaduzenja:-1}).exec((err,data)=>{
            if(err) console.log(err);
            else res.json(data)
        })
    }

    sortdatumZaduzenjaAS=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        ZaduzenjeModel.find({'korisnickoIme':korisnickoIme,"datumVracanja":{$ne:""}}).sort({datumZaduzenja:1}).exec((err,data)=>{
            if(err) console.log(err);
            else res.json(data)
        })
    }


    produzi=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        let idKnjiga=req.body.idKnjiga;
        let produzenje=req.body.produzenje;

        ZaduzenjeModel.updateOne({'korisnickoIme':korisnickoIme,'idKnjiga':idKnjiga,'datumVracanja':''},{$set:{'produzenje':produzenje}},(err,resp)=>{
            if (err) console.log(err)
            else res.json({ 'message': 'ok' })
        })

    }
    
    nadjiTrenutnaZaduzenja=(req:express.Request,res:express.Response)=>{
        let korisnickoIme = req.body.korisnickoIme;

        ZaduzenjeModel.find({ "korisnickoIme": korisnickoIme,'datumVracanja':""}, (err, data) => {
            if (err) console.log(err);
            else res.json(data);
        })
    }

    changeProduzenje=(req:express.Request,res:express.Response)=>{
        let produzenje=req.body.produzenje

        ZaduzenjeModel.updateMany({'produzenje':{$ne:0}},{$set:{'produzenje':produzenje}},(err,resp)=>{
            if (err) console.log(err)
            else res.json({ 'message': 'ok' })
        })
    }


}