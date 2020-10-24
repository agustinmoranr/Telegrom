//const { response } = require('express');
const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').Server(app);

const db = require('./db');
db('mongodb+srv://db_user_telegrom:KdOLaQF7g27WVjjG@cluster0.guz9z.mongodb.net/telegrom_db?retryWrites=true&w=majority')
const router = require('./network/routes');
const socket = require('./socket');

//const config = require('./config');


//db(config.dbUrl);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

socket.connect(server);

router(app);

app.use('/app', express.static('public'));

const port = 3000;

server.listen(port, function () {
  console.log('La aplicación está escuchando en el puerto '+ port);
});