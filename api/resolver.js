(function () {
  'use strict';

  var tracks = require('../utils/tracks');

  // The API that returns the in-email representation.
  module.exports = function(req, res) {
    var term = req.query.text.trim(),
        song,
        html;

    if (!term) {
      res.status(400).send('Song id required');
    }

    // If the user typed and pressed enter before the typeahead had
    // a chance to suggest a song, the request for getting the track by id will
    // fail, and this handler will handle the error.

    try {
      song = tracks.getById(term);
    } catch (e) {
      // TODO: gracefully handle errors
      res.status(500).send('Error getting song');
      return;
    }

    if (!song) {
      res.status(404).send('Song not found');
    }

    html = '<iframe src="https://embed.spotify.com/?uri=spotify:track:' + term +
      '" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>';

    res.json({
      body: html,
      subject: 'This song === SWIPE RIGHT'
      // Add raw:true if you're returning content that you want the user to be able to edit
    });
  };
}());
