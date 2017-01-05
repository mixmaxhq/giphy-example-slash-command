var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors');

// Since Mixmax calls this API directly from the client-side, it must be whitelisted.
var corsOptions = {
	origin: /^[^.\s]+\.mixmax\.com$/,
	credentials: true
};


app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
app.get('/resolver', cors(corsOptions), require('./api/resolver'));

app.listen(process.env.PORT || 9145);