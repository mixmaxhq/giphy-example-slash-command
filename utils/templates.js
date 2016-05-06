(function () {
  'use strict';

  module.exports = {
    getSearchPromptTemplate: function () {
      return `<i>(enter a search term)</i>`;
    },
    // Returns search result template for the track.
    getTrackSearchResultTemplate: function (track) {
      var result = '';

      if (!track || !track.name) {
        return result;
      }

      result += `<div><b>${track.name}</b></div>`;

      if (track.artists && track.artists.length && track.artists[0].name) {
        result += `<div>${track.artists[0].name}</div>`;
      } else {
        result += `<div>(unknown artist)</div>`;
      }

      return result;
    },
    getNoSearchResultsTemplate: function () {
      return `<i>(no results)</i>`;
    },
    // Returns full track link template
    getRobustTrackLinkTemplate: function (track) {

    }
  };
}());
