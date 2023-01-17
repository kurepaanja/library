import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Knjiga=new Schema({
    id:{
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
    brojKnjiga:{
        type:String
    },
    slika:{
        type:String
    }
})

export default mongoose.model("KnjigaModel",Knjiga,"knjiga");