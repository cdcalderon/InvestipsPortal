/*
run `node .\mock-server\server.js` to start mock server
*/

const serveStatic = require('serve-static');
const express = require('express');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');
const oidc = require('./oidc.js');
const port = 9900;

// configure server
const app = express();

app.use(logger('dev'));
app.use(cors());
oidc('http://localhost:' + port, app);

// run server
http.createServer(app).listen(port);
