const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RepairSchema = new Schema({

    name: {
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
        required:true
    },
    client: {
        type:String,
        required:true
    },
    technician: {
        type:String,
        required:true
    },
    serialNumber: {
        type:String,
        required:true
    },
    model: {
        type:String,
        required:true
    },
    problem: {
        type:String,
        required:true
    },
    expectedDate: {
        type:String,
        required:true
    },
    picture: {
        type:String,
        required:true
    },
    sendSms: {
        type:String,
        required:true
    },
    sendEmail: {
        type:String,
        required:true
    },
    Status: {
        type:String,
        required:true
    }
    
})

const Repair = mongoose.model("Repair", RepairSchema);

module.exports = Repair;
