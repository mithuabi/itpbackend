const router = require("express").Router();
// const { Router } = require("express");
const { get } = require("mongoose");
let Repair = require("../models/Repair");




router.route("/add").post((req,res)=> {
    const name = req.body.name;
    const category= (req.body.cat);
    const type = (req.body.type);
    const client = (req.body.client);
    const technician = (req.body.technician);
    const serialNumber = (req.body.serialNumber);
    const model = (req.body.model);
    const problem= (req.body.problem);
    const expectedDate= (req.body.expectedDate);
    const sendSms = (req.body.sendSms);
    const sendEmail = (req.body.sendEmail);
    const status = (req.body.status);

    const newRepair = new Repair({
        name,
        category,
        type,
        client,
        technician,
        serialNumber,
        model,
        problem,
        expectedDate,
        sendSms,
        sendEmail,
        status,

        

    });

    newRepair.save().then(()=>{
        res.json("Repair Added");
    }).catch((err)=>{
        console.log(err);
    });
}); // post eken wenne http request method

router.route("/").get((req,res) => {
    Repair.find().then((Repair)=>{
        res.json(Repair);
    }).catch((err)=>{
        console.log(err);
    });
})

router.route("/update/:id").put(async (req,res) => {
    let userId = req.params.id;
    const{name,
        category,
        type,
        client,
        technician,
        serialNumber,
        model,
        problem,
        expectedDate,
        sendSms,
        sendEmail,
        status,
}= req.body;

    const updateRepair = {
        name,
        category,
        type,
        client,
        technician,
        serialNumber,
        model,
        problem,
        expectedDate,
        sendSms,
        sendEmail,
        status,

       
    }

    const update = await Repair.findByIdAndUpdate(userId, updateRepair)
    .then(() =>{
        res.status(200).send({status: "User updated "})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status:"Error with updating data", error:err.message});
    });
});

router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;
    await Repair.findByIdAndDelete(userId)
    .then(() => {
        res.status(200).send({status:"User Deleted"});
    }).catch((err) => {
        console.log(err.mesage);
        res.status(500).send({status: "Erro with delete user", error:err.message});
    });
});

router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await Repair.findById(userId)
    .then((Repair) => {
        res.status(200).send({status: "user fatched ", user: user});
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", err: message});
    });
});

module.exports = router;
