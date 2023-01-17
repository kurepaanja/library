import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Korisnik=new Schema({
    ime:{
        type:String
    },
    prezime:{
        type:String
    },
    korisnickoIme:{
        type:String
    },
    lozinka:{
        type:String
    },
    tip:{
        type:String
    },
    adresa:{
        type:String
    },
    telefon:{
        type:String
    },
    email:{
        type:String
    },
    slika:{
        type:String
    }

})

export default mongoose.model("KorisnikModel",Korisnik,"korisnik");
