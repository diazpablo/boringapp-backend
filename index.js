const cors = require("cors");
const config = require("config");
const path = require("path");
const express = require("express");
const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(cors());

require('./startup/db')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
	console.log(`Listening on port ${port}...`)
);

module.exports = server;
