(function () {
  'use strict';

  var sync = require('synchronize'),
      request = require('request');

  module.exports = {
    // Returns an array of Spotify track results for the query.
    // Throws if request fails or returns invalid data.
    get: function(query, limit) {
      var response = sync.await(request({
        url: 'https://api.spotify.com/v1/search',
        qs: {
          q: query,
          type: 'track',
          limit: limit || 10
        },
        gzip: true,
        json: true,
        timeout: 10 * 1000
      }, sync.defer()));

      if (response.statusCode !== 200 ||
        !response.body ||
        !response.body.tracks ||
        !response.body.tracks.items) {
        throw 'Error getting tracks';
      }

      return response.body.tracks.items;
    },
    // Returns a Spotify track with the given id.
    // Throws if request fails or returns invalid data.
    getById: function(id) {
      var response = sync.await(request({
        url: 'https://api.spotify.com/v1/tracks/' + id,
        gzip: true,
        json: true,
        timeout: 10 * 1000
      }, sync.defer()));

      if (response.statusCode !== 200 ||
        !response.body) {
        throw 'Error getting track by id';
      }

      return response.body;
    }
  };
}());
