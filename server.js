(function () {
    'use strict';

    var express = require('express');
    var app = express();
    var sync = require('synchronize');
    var cors = require('cors');

    app.set('port', (process.env.PORT || 9145));

    // Use fibers in all routes so we can use sync.await() to make async code easier to work with.
    app.use(function (req, res, next) {
        sync.fiber(next);
    });

    // Since Mixmax calls this API directly from the client-side, it must be whitelisted.
    var corsOptions = {
        origin: /^[^.\s]+\.mixmax\.com$/,
        credentials: true
    };

    app.get('/typeahead', cors(corsOptions), require('./api/typeahead'));
    app.get('/resolver', cors(corsOptions), require('./api/resolver'));

    app.listen(app.get('port'), function () {
      console.log('App is running on port: ' + app.get('port'));
    });
}());
