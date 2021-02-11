const express = require("express");

// Middleware
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize App
const app = express();

let corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Get content-type - application/json off of requests
app.use(bodyParser.json());

// Get content-type - application/x-www-form-urlencoded from requests
app.use(bodyParser.urlencoded({ extended: true }));


// DB Setup
const db = require("./src/models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and resync db");
// });

// Test Route
app.get("/", (req, res) => {
	res.json({ msg: "Hellooooo Baltimore" });
});

// Course Routes
require("./src/routes/course.routes")(app);

// declare port to listen to requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on port: ${PORT}.`);
});