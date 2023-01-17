import mongoose from "mongoose";
const Schema=mongoose.Schema;

let Komentar=new Schema({
    idKnjiga:{
        type:String
    },
    korisnickoIme:{
        type:String
    },
    tekstKomentara:{
        type:String
    },
    ocena:{
        type:Number
    },
    datum_vreme:{
        type:String
    },
    edited:{
        type:String
    }
})

export default mongoose.model("KomentarModel",Komentar,"komentar")