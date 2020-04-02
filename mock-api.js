var express = require('express');
var apiMocker = require('connect-api-mocker');
var cors = require('cors');
 
var app = express();

app.use(cors())
app.use('/api', apiMocker('mock-api'));
 
app.listen(9001);