const router = require("express").Router();
const {get} = require("mongoose");
let ClientRepair = require("../models/ClientRepair");

router.route("/add").post((req, res) => {
    const ClientsName = (req.body.ClientsName);
    const Phone = (req.body.Phone);
    const Email = (req.body.Email);
    const Address = (req.body.Address);
    const Description = (req.body.Description);

    const newClientRepair = new ClientRepair({
        ClientsName,
        Phone,
        Email,
        Address,
        Description
    });

    newClientRepair.save().then(() => {
        res.json("ClientRepair Added");
    }).catch((err) => {
        console.log(err);
    });
}); // post eken wenne http request method

router.route("/").get((req, res) => {
    ClientRepair.find().then((ClientRepair) => {
        res.json(ClientRepair);
    }).catch((err) => {
        console.log(err);
    });
})

router.route("/update").put(async (req, res) => {
    const {
        id,
        ClientsName,
        Phone,
        Email,
        Address,
        Description
    } = req.body;

    const updateClientRepair = {
        ClientsName,
        Phone,
        Email,
        Address,
        Description
    }

    const update = await ClientRepair.findByIdAndUpdate(id, updateClientRepair)
        .then(() => {
            res.status(200).send({status: "User updated "})
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with updating data", error: err.message});
        });
});

router.route("/delete/:id").delete(async (req, res) => {
    const clientRepairId = req.params.id;
    await ClientRepair.findByIdAndDelete(clientRepairId)
        .then(() => {
            res.status(200).send({status: "Client Repair Deleted"});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with delete Client Repair", error: err.message});
        });
});

router.route("/get/:id").get(async (req, res) => {
    const clientRepairId = req.params.id;
    const clientRepair = await ClientRepair.findById(clientRepairId)
        .then((ClientRepair) => {
            res.status(200).send({status: "Client Repair fetched ", clientRepair: ClientRepair});
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({status: "Error with get user", err: err.message});
        });
});

module.exports = router;
