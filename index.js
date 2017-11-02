const express = require('express');
const http = require('http');
const socketIo = require('socket.io');


const app = express();
const server = http.createServer(app);
const io = socketIo(server); // this gives us a socketIO instance, allowing us to receive socket connections.

io.on('connection', (socket) => {
  console.log('connection received');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('hello', () => console.log('picked up a hello event!'));
});

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.plugin(require('mongoose-unique-validator'));

const morgan = require('morgan');
const bodyParser = require('body-parser');
const { port, dbURI, env } = require('./config/environment');
const routesGen = require('./config/routesGen');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');

mongoose.connect(dbURI, { useMongoClient: true });

if('test' !== env) app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());

app.use(customResponses);

app.use('/api', routesGen(io));
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);


server.listen(port, () => console.log(`Express is listening on port ${port}`));

module.exports = app;
