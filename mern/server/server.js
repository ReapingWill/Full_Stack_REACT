const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const bodyParser = require('body-parser'); // Keep body-parser if you have specific reasons for its use
const loginRoutes = require('./routes/login');
const sessionRoutes = require("./routes/session.routes.js");
const SESSION = require("express-session");
const COOKIE_PARSER = require("cookie-parser");
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cors());
app.use(COOKIE_PARSER());
app.use(SESSION({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Dynamically load and use routes
const recordRoutes = require('./routes/record');
const transactionsRoutes = require('./routes/transactions');

app.use(recordRoutes);
app.use(transactionsRoutes);

loginRoutes.login(app);
sessionRoutes.sessionRoutesEndpoint(app);

// get driver connection
const dbo = require("./db/conn");
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
