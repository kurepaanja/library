import mongoose from "mongoose";

const Schema=mongoose.Schema;

let Rezervacija=new Schema({
    idKnjiga:{
        type:String
    },
    korisnici:{
        type:Array
    },
    turn:{
        type:Number
    }
})

export default mongoose.model("RezervacijaModel",Rezervacija,"rezervacija")