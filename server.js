const express = require("express");
const  mongoose  = require("mongoose");
// const bodyParser = require("boddy-parser");
const bodyParser = require('body-parser');
const cors = require("cors");
// const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;
// mongoose.connect(URL, {
// useCreateIndex: true,
// useNewUrlParser: true,
// useUnifiedTopology: true,
// useFindAndModify: false
//   });

// const connection = mongoose.connection;
// connection.once("open",() => {
// console.log("mongodb connection success!");
//  });

mongoose.set("strictQuery", false);
mongoose.connect(URL, () => {
  console.log("mongodb connection success!");
});

app.get("/", (req, res) => res.json(`Welcome to ${process.env.APP_NAME}.`));

const RepairRouter = require("./routes/repairs.js");
app.use("/repair", RepairRouter);
const ClientRepairRouter = require("./routes/clientRepair");
app.use("/client-repair", ClientRepairRouter);

 app.listen(PORT, () => {
    console.log(`Sever is up and running on port number : ${PORT}`);
 });
