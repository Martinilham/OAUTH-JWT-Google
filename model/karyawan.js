import mongoose from "mongoose";
const Karyawan = mongoose.Schema({
    nama:{
        type:String,
        required: true
    },
    email: {
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        required:true
    },
    role :{
        type:String,
        required:true
    },
    notlpn: {
        type:String,
        required:true
    },


});

export default mongoose.model("Karyawan",Karyawan)