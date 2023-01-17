import mongoose, { mongo } from "mongoose";

const Schema=mongoose.Schema;

let Zaduzenje=new Schema({
    idKnjiga:{
        type:String
    },
    korisnickoIme:{
        type:String
    },
    datumZaduzenja:{
        type:String
    },
    datumVracanja:{
        type:String
    },
    produzenje:{
        type:Number
    },
    rezervacija:{
        type:Number
    }
   
})

export default mongoose.model("ZaduzenjeModel",Zaduzenje,'zaduzenja');