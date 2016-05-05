(function () {
  'use strict';

  var _ = require('underscore');
  var tracks = require('../utils/tracks');

  function isInvalidTrack(track) {
    return !track ||
      !track.id ||
      !track.name ||
      !track.artists ||
      !track.artists.length ||
      !track.artists[0].name;
  }

  function getTypeaheadForTrack(track) {
    // TODO: Include 64x64 album cover img
    return {
      title: '<b>' + track.name + '</b><br/>' + track.artists[0].name,
      text: track.id
    };
  }

  // The Type Ahead API.
  module.exports = function(req, res) {
    var term = req.query.text.trim(),
        songs;

    if (!term) {
      res.json([{
        title: '<i>(enter a search term)</i>',
        text: ''
      }]);
      return;
    }

    try {
      songs = tracks.get(term);
    } catch (e) {
      // TODO: gracefully handle errors
      res.status(503).send('Error getting songs');
      return;
    }

    var results = _.chain(songs)
      .reject(isInvalidTrack)
      .map(getTypeaheadForTrack)
      .value();

    if (results.length === 0) {
      res.json([{
        title: '<i>(no results)</i>',
        text: ''
      }]);
    } else {
      res.json(results);
    }
  };
}());
