import express from 'express';
import KorisnikModel from '../model/korisnik'

export class KorisnikController {

    login = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({ "korisnickoIme": korisnickoIme, "loznika": lozinka }, (err, kor) => {
            if (err) console.log(err);
            else res.json(kor);
        })

    }

    register = (req: express.Request, res: express.Response) => {
        let kor = new KorisnikModel({
            ime: req.body.ime,
            prezime: req.body.prezime,
            korisnickoIme: req.body.korisnickoIme,
            lozinka: req.body.lozinka,
            tip: req.body.tip,
            adresa: req.body.adresa,
            telefon: req.body.telefon,
            email: req.body.email,
            slika: req.body.slika
        })

        kor.save((err, resp) => {
            if (err) {
                console.log(err)
            }
            else res.json({ 'message': 'ok' })
        })

    }

    korisnickoImePostoji = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme

        KorisnikModel.findOne({ "korisnickoIme": korisnickoIme }, (err, kor) => {
            if (err) console.log(err);
            else res.json(kor)
        })
    }

    emailPostoji = (req: express.Request, res: express.Response) => {
        let email = req.body.email;

        KorisnikModel.findOne({ "email": email }, (err, kor) => {
            if (err) console.log(err);
            else res.json(kor)
        })
    }

    proveraSifre = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let lozinka = req.body.lozinka;

        KorisnikModel.findOne({ "korisnickoIme": korisnickoIme, "lozinka": lozinka }, (err, kor) => {
            if (err) console.log(err)
            else res.json(kor)
        })
    }

    promenaSifre = (req: express.Request, res: express.Response) => {
        let korisnickoIme = req.body.korisnickoIme;
        let staraLozinka = req.body.staraLozinka;
        let novaLozinka = req.body.novaLozinka;
        console.log("USO")

        KorisnikModel.findOne({ "korisnickoIme": korisnickoIme, "lozinka": staraLozinka }, (err, kor) => {
            console.log("NIJE PRONADJEN")
            if (err) {

                console.log(err)

            }
            else {
                res.json({ 'message': 'bad' });
                if (kor) {
                    KorisnikModel.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'lozinka': novaLozinka } }, (err, resp) => {
                        //console.log("Pronadjen")
                        if (err) console.log(err)
                        else res.json({ 'message': 'ok' })
                    })
                }
            }
        })
    }


    nadjiAdmina = (req: express.Request, res: express.Response) => {
        KorisnikModel.findOne({ "tip": "3" }, (err, kor) => {
            if (err) console.log(err);
            else res.json(kor)
        })
    }

    uzmiRegKorisnike = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ "tip": { $nin: ["3", "4"] } }, (err, data) => {
            if (err) console.log(err)
            else res.json(data);
        })
    }

    uzmiNeregKorisnike = (req: express.Request, res: express.Response) => {
        KorisnikModel.find({ "tip": "4" }, (err, data) => {
            if (err) console.log(err)
            else res.json(data);
        })
    }

    prihvatiKorisnika = (req: express.Request, res: express.Response) => {
        //update
        let korisnickoIme = req.body.korisnickoIme;

        KorisnikModel.updateOne({ 'korisnickoIme': korisnickoIme }, { $set: { 'tip': '1' } }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'ok' })
        })
    }

    odbaciKorisnika = (req: express.Request, res: express.Response) => {
        //delete
        let korisnickoIme = req.body.korisnickoIme

        KorisnikModel.deleteOne({ "korisnickoIme": korisnickoIme }, (err, resp) => {
            if (err) console.log(err)
            else res.json({ 'message': 'ok' })
        })
    }

    promeniIme= (req: express.Request, res: express.Response) =>{
        //menja se i ime i prezime
        let ime=req.body.ime;
        let prezime=req.body.prezime
        let korisnickoIme=req.body.korisnickoIme;

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'ime':ime,'prezime':prezime}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }
    

    promeniKorisnickoIme= (req: express.Request, res: express.Response) =>{
        let staroKorisnickoIme=req.body.staroKorisnickoIme;
        let novoKorisnickoIme=req.body.novoKorisnickoIme;
        KorisnikModel.updateOne({'korisnickoIme':staroKorisnickoIme},{$set:{'korisnickoIme':novoKorisnickoIme}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniLozinku= (req: express.Request, res: express.Response) =>{
        
        let lozinka=req.body.lozinka

        let korisnickoIme=req.body.korisnickoIme

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'lozinka':lozinka}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniTip= (req: express.Request, res: express.Response) =>{
        let tip=req.body.tip
        let korisnickoIme=req.body.korisnickoIme

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'tip':tip}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniAdresu= (req: express.Request, res: express.Response) =>{
        let adresa=req.body.adresa
        let korisnickoIme=req.body.korisnickoIme

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'adresa':adresa}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniTelefon= (req: express.Request, res: express.Response) =>{
        let telefon=req.body.telefon
        let korisnickoIme=req.body.korisnickoIme

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'telefon':telefon}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniEmail= (req: express.Request, res: express.Response) =>{
        let email=req.body.email
        let korisnickoIme=req.body.korisnickoIme

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'email':email}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniSlika= (req: express.Request, res: express.Response) =>{
        let slika=req.body.slika
        let korisnickoIme=req.body.korisnickoIme

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'slika':slika}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniPrvoIme= (req: express.Request, res: express.Response) =>{
        let korisnickoIme=req.body.korisnickoIme
        let ime=req.body.ime;

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'ime':ime}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    promeniPrezime = (req: express.Request, res: express.Response) =>{
        let korisnickoIme=req.body.korisnickoIme
        let prezime=req.body.prezime

        KorisnikModel.updateOne({'korisnickoIme':korisnickoIme},{$set:{'prezime':prezime}},(err,resp)=>{
            if(err) console.log(err)
            else res.json({'message': 'ok'})
        })
    }

    nadjiKorisnika=(req: express.Request, res: express.Response) =>{
        let korisnickoIme=req.body.korisnickoIme
        KorisnikModel.findOne({'korisnickoIme':korisnickoIme},(err,kor)=>{
            if(err) console.log(err)
            else res.json(kor)
        })
    }



}