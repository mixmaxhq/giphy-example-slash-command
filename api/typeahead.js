(function () {
  'use strict';

  var _ = require('underscore');
  var tracks = require('../utils/tracks');
  var templates = require('../utils/templates');

  function isInvalidTrack(track) {
    return !track ||
      !track.id ||
      !track.name;
  }

  function getTypeaheadForTrack(track) {
    return {
      title: templates.getTrackSearchResultTemplate(track),
      text: track.id
    };
  }

  // The Type Ahead API.
  module.exports = function(req, res) {
    var term = req.query.text.trim(),
        songs;

    if (!term) {
      res.json([{
        title: templates.getSearchPromptTemplate(),
        text: ''
      }]);
      return;
    }

    try {
      songs = tracks.get(term);
    } catch (e) {
      // TODO: gracefully handle errors
      res.status(500).send('Error getting songs');
      return;
    }

    var results = _.chain(songs)
      .reject(isInvalidTrack)
      .map(getTypeaheadForTrack)
      .value();

    if (results.length === 0) {
      res.json([{
        title: templates.getNoSearchResultsTemplate(),
        text: ''
      }]);
    } else {
      res.json(results);
    }
  };
}());
