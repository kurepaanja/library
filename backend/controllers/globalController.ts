import express from 'express';
import GlobalModel from '../model/global'

export class GlobalController{

    getDaysReturn=(req:express.Request,res:express.Response)=>{
        GlobalModel.find({},(err,data)=>{
            //console.log(data);
            if (err) console.log(err);
            else res.json(data);
        })
    }

    promeniRok=(req:express.Request,res:express.Response)=>{
        let rok=req.body.rok
        GlobalModel.updateOne({"id":0},{$set:{'daysReturn':rok,'produzenje':rok}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
        
    }

    promeniProduzenje=(req:express.Request, res:express.Response)=>{
        
        let produzenje=req.body.produzenje;
        //console.log(produzenje)
        GlobalModel.updateOne({"id":0},{$set:{'produzenje':produzenje}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    
    promeniIdKnjiga=(req:express.Request, res:express.Response)=>{
        
        let idKnjiga=req.body.idKnjiga;
        //console.log(produzenje)
        GlobalModel.updateOne({"id":0},{$set:{'idKnjiga':idKnjiga}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
}