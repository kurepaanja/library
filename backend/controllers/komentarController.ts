import express from 'express';
import KomentarModel from '../model/komentar'

export class KomentarController{

    sviKomentariZaKnjigu=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga;

        KomentarModel.find({'idKnjiga':idKnjiga}).sort({datum_vreme:-1}).exec((err,kom)=>{
            if(err) console.log(err);
            else res.json(kom)
        })
    }

    dodajKomentar=(req:express.Request,res:express.Response)=>{
        let kom=new KomentarModel({
            idKnjiga:req.body.idKnjiga,
            korisnickoIme:req.body.korisnickoIme,
            tekstKomentara:req.body.tekstKomentara,
            ocena:req.body.ocena,
            datum_vreme:req.body.datum_vreme,
            edited:'0'
        })

        kom.save((err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })

    }

    promeniKomentar=(req:express.Request,res:express.Response)=>{
        let tekstKomentara=req.body.tekstKomentara;
        let korisnickoIme=req.body.korisnickoIme;
        let idKnjiga=req.body.idKnjiga

        KomentarModel.updateOne({'korisnickoIme':korisnickoIme,'idKnjiga':idKnjiga},{$set:{'tekstKomentara':tekstKomentara,'edited':'1'}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
        
    }
}