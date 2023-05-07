const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClientRepairSchema= new Schema({

    ClientsName: {
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Email:{
        type:String,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        required:true
    },
    Address: {
        type:String,
        required:true
    },
    Description: {
        type:String,
        required:true
    }
    
})

const ClientRepair = mongoose.model("ClientRepair", ClientRepairSchema);

module.exports = ClientRepair;