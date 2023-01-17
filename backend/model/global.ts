import mongoose from "mongoose";

const Schema=mongoose.Schema;

let GlobalDB=new Schema({
    id:{
        type:Number
    },
    daysReturn:{
        type:Number
    },
    produzenje:{
        type:Number
    },
    idKnjiga:{
        type:Number
    }
})

export default mongoose.model("GlobalModel",GlobalDB,"global")