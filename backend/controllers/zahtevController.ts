import express from 'express';
import ZahtevModel from '../model/zahtev'

export class ZahtevController{

    
    sviZahtevi=(req:express.Request,res:express.Response)=>{
        ZahtevModel.find({'prihvacen':'0'},(err,data)=>{
            //console.log(data)
            if(err) console.log(err);
            else res.json(data);
        })
    }

    prihvatiZahtev=(req:express.Request, res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        let naziv=req.body.naziv;
      

        ZahtevModel.updateOne({'korisnickoIme':korisnickoIme,"naziv":naziv},{$set:{'prihvacen':'1'}},(err,resp)=>{
            if(err) console.log(err)
            else {           
                res.json({'message': 'ok'})
            }
        })

        
    }

    mojiZahtevi=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;


        ZahtevModel.find({'korisnickoIme':korisnickoIme},(err,data)=>{
            if(err) console.log(err);
            else res.json(data)
        })
    }

    dodajZahtev=(req:express.Request, res:express.Response)=>{
        let zahtev=new ZahtevModel({
            korisnickoIme:req.body.korisnickoIme,
            naziv:req.body.naziv,
            autor:req.body.autor,
            zanr:req.body.zanr,
            izdavac:req.body.izdavac,
            godinaIzdanja:req.body.godinaIzdanja,
            jezik:req.body.jezik,
            slika:req.body.slika,
            prihvacen:"0"
        })
        //console.log(zahtev)
        zahtev.save((err,resp)=>{
            if(err){
                console.log(err)
            }
            else res.json({'message':'ok'})
        })
    }


    deleteZahtev=(req:express.Request,res:express.Response)=>{
        let korisnickoIme=req.body.korisnickoIme;
        let naziv=req.body.naziv

        ZahtevModel.deleteOne({'korisnickoIme':korisnickoIme,'naziv':naziv},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message':'ok'})
        })
    }
}