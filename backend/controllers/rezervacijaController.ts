import RezervacijaModel from '../model/rezervacija'
import express from 'express';

export class RezervacijaController{
    
    dodajRezervaciju=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga
        let korisnickoIme=req.body.korisnickoIme

        RezervacijaModel.updateOne({"idKnjiga":idKnjiga},{$push:{'korisnici':korisnickoIme}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    dohvatiRezervaciju=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga
        
        
        RezervacijaModel.findOne({"idKnjiga":idKnjiga},(err,data)=>{
            if(err) console.log(err)
            else res.json(data);
        })
    }

    izbrisiKorisnika=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga;
        let korisnickoIme=req.body.korisnickoIme

        RezervacijaModel.updateOne({'idKnjiga':idKnjiga},{$pull:{'korisnici':korisnickoIme}},(err,resp)=>{
            if(err) console.log(err);
            else res.json({'message': 'ok'})
        })
    }

    napraviRezervaciju=(req:express.Request,res:express.Response)=>{
        let rez=new RezervacijaModel({
            idKnjiga:req.body.idKnjiga,
            korisnici:[],
            turn:0

        })
        rez.save((err,resp)=>{
            if(err) console.log(err);
            else res.json({'message':'ok'})
        })
    }
}