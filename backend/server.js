const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").Server(app);
require("dotenv").config();
const db = require("./db");
db(process.env.MONGO_URI);
const router = require("./network/routes");
const socket = require("./socket");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

socket.connect(server);

router(app);

app.use("/app", express.static("public"));

const port = process.env.PORT || 3001;

server.listen(port, function () {
  console.log("La aplicación está escuchando en el puerto " + port);
});
