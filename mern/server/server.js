const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');

const port = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(require("./routes/record"));
app.use(require("./routes/transactions"));
//app.use('/login', loginRoutes);

loginRoutes.login(app)

// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${port}`);
});