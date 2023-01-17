import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Zahtev=new Schema({
    korisnickoIme:{
        type:String
    },
    naziv:{
        type:String
    },
    autor:{
        type:Array
    },
    zanr:{
        type:Array
    },
    izdavac:{
        type:String
    },
    godinaIzdanja:{
        type:String
    },
    jezik:{
        type:String
    },
    slika:{
        type:String
    },
    prihvacen:{
        type:String
    }
    //broj Knjiga kad se doda bice jedan
})

export default mongoose.model("ZahtevModel",Zahtev,"zahtev")