import express from 'express';
import { json } from 'stream/consumers';
import KnjigaModel from '../model/knjiga'

export class KnjigaController{

    sveKnjige=(req:express.Request,res:express.Response)=>{
        KnjigaModel.find({},(err,knjige)=>{
            if(err) console.log(err);
            else res.json(knjige);
        })
    }

    nadjiKnjigu=(req:express.Request,res:express.Response)=>{
        let autorSearch=req.body.autorSearch;
        let nazivSearch=req.body.nazivSearch;
        let izdavac=req.body.izdavac;
        //'autor':{$regex:autorSearch},
        
        KnjigaModel.find({'naziv':{$regex:nazivSearch},  'izdavac':{$regex:izdavac}},(err,knjige)=>{
            if(err) console.log(err);
            else res.json(knjige)
        })
    }

    decBrojKnjiga=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga;
        //console.log("OVDE");
       // console.log(idKnjiga);
        

        KnjigaModel.findOne({'id':idKnjiga},(err,knjiga)=>{
            //console.log(knjiga)
            if(err) console.log(err);
            else {
                if(knjiga){

                    let temp=Number(knjiga.brojKnjiga);
                    //console.log(temp)
                    temp--;
                    //console.log(temp)
                    KnjigaModel.updateOne({'id':idKnjiga},{$set:{'brojKnjiga':temp.toString()}},(err,resp)=>{
                        if(err) console.log(err)
                        else res.json({'message': 'ok'})
                    })
                }
            }
        })
    }

    incBrojKnjiga=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga;
        //console.log("OVDE");
       // console.log(idKnjiga);
        

        KnjigaModel.findOne({'id':idKnjiga},(err,knjiga)=>{
            //console.log(knjiga)
            if(err) console.log(err);
            else {
                if(knjiga){

                    let temp=Number(knjiga.brojKnjiga);
                    //console.log(temp)
                    temp++;
                    //console.log(temp)
                    KnjigaModel.updateOne({'id':idKnjiga},{$set:{'brojKnjiga':temp.toString()}},(err,resp)=>{
                        if(err) console.log(err)
                        else res.json({'message': 'ok'})
                    })
                }
            }
        })

    }

    uzmiKnjigu=(req:express.Request,res:express.Response)=>{
        let idKnjiga=req.body.idKnjiga;
        KnjigaModel.findOne({"id":idKnjiga},(err,knjiga)=>{
            if (err) console.log(err);
            else res.json(knjiga);
        })
    }



    dodajKnjigu=(req:express.Request,res:express.Response)=>{
        let knjiga=new KnjigaModel({
            id:req.body.id,
            naziv:req.body.naziv,
            autor:req.body.autor,
            zanr:req.body.zanr,
            izdavac:req.body.izdavac,
            godinaIzdanja:req.body.godinaIzdanja,
            jezik:req.body.jezik,
            brojKnjiga:req.body.brojKnjiga,
            slika:req.body.slika
        })

        knjiga.save((err,resp)=>{
            if(err){
                console.log(err)
            }
            else res.json({'message':'ok'})
        })


    }

    promeniNaziv=(req:express.Request,res:express.Response)=>{
        let naziv=req.body.naziv;
        let id=req.body.id;

        KnjigaModel.updateOne({'id':id},{$set:{'naziv':naziv}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
        
    }

    promeniAutor=(req:express.Request,res:express.Response)=>{
        let autor=req.body.autor
        let id=req.body.id;

        KnjigaModel.updateOne({'id':id},{$set:{'autor':autor}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })

    }

    promeniZanr=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let zanr=req.body.zanr

        KnjigaModel.updateOne({'id':id},{$set:{'zanr':zanr}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniIzdavac=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let izdavac=req.body.izdavac

        KnjigaModel.updateOne({'id':id},{$set:{'izdavac':izdavac}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniGodina=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let godinaIzdanja=req.body.godinaIzdanja

        KnjigaModel.updateOne({'id':id},{$set:{'godinaIzdanja':godinaIzdanja}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniJezik=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let jezik=req.body.jezik

        KnjigaModel.updateOne({'id':id},{$set:{'jezik':jezik}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniBrojKnjiga=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let brojKnjiga=req.body.brojKnjiga

        KnjigaModel.updateOne({'id':id},{$set:{'brojKnjiga':brojKnjiga}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniSliku=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;
        let slika=req.body.slika

        KnjigaModel.updateOne({'id':id},{$set:{'slika':slika}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    izbrisiKnjigu=(req:express.Request,res:express.Response)=>{
        let id=req.body.id;

        KnjigaModel.deleteOne({'id':id},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    
}