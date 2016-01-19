var utils = require('../utils/utils')

var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');

function nextPossibleColor(position) {
  var possibleColors = ['0', '4', '8', 'b', 'f'];
  if (position > 4) {
    return possibleColors[0];
  }
  return possibleColors[position];
}

function fillWithPossibleColors(hexColor, position) {
  var color = hexColor;
  for (var i = hexColor.length; i < 7; i++) {
    color += nextPossibleColor(position);
  };
  return color;
}

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
  }

  var color = term.toString();
  var colors = [];
  var isValidHex = /^#?([a-f]+)$/i.exec(color);
  if (color.charAt(0) === '#' && color.length <= 7 && isValidHex) {


    for (var position = 0; position < 5; position++) {
      var hexColor = fillWithPossibleColors(color, position);
      var rgbColor = utils.hexToRgb(hexColor);
      var textColor = utils.matchingTextColor(hexColor);

      var element = {
        title: '<div style="width: 300px; height: 40px; background-color:' + hexColor + ' ; color:' + textColor + '">' +
                hexColor + "<br>" +
                'r:' + rgbColor.r + ' b:' + rgbColor.g + ' c:' + rgbColor.b + '</div>',
        text: hexColor
      }
      colors.push(element)
    };
  }

  if (colors.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(colors);
  }
};
