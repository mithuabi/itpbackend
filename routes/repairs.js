const router = require("express").Router();
// const { Router } = require("express");
const {get} = require("mongoose");
let Repair = require("../models/Repair");

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const category = (req.body.category);
    const type = (req.body.type);
    const client = (req.body.client);
    const technician = (req.body.technician);
    const serialNumber = (req.body.serialNumber);
    const model = (req.body.model);
    const problem = (req.body.problem);
    const expectedDate = (req.body.expectedDate);
    const picture = (req.body.picture);
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
        picture,
        sendSms,
        sendEmail,
        status,
    });

    newRepair.save().then(() => {
        res.json("Repair Added");
    }).catch((err) => {
        console.log(err);
    });
}); // post eken wenne http request method

router.route("/").get((req, res) => {
    Repair.find().then((Repair) => {
        res.json(Repair);
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/update").put(async (req, res) => {
    const {
        id,
        name,
        category,
        type,
        client,
        technician,
        serialNumber,
        model,
        problem,
        expectedDate,
        picture,
        sendSms,
        sendEmail,
        status,
    } = req.body;

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
        picture,
        sendSms,
        sendEmail,
        status,
    }

    const update = await Repair.findByIdAndUpdate(id, updateRepair)
        .then(() => {
            res.status(200).send({status: "Repair updated "})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    let repairID = req.params.id;
    await Repair.findByIdAndDelete(repairID)
        .then(() => {
            res.status(200).send({status: "Repair Deleted"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete user", error: err.message});
        });
});

router.route("/get/:id").get(async (req, res) => {
    let repairID = req.params.id;
    await Repair.findById(repairID)
        .then((repair) => {
            res.status(200).send({status: "repair fetched ", repair: repair});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get repair", err: err.message});
        });
});

module.exports = router;


//TODO: Test on Postman
//     http://localhost:8070/repair/add
//     http://localhost:8070/update
//     http://localhost:8070/delete/:id
//     http://localhost:8070/repair/get/:id
