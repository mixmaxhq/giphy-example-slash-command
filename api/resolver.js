var utils = require('../utils/utils')

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  handleHexString(term, req, res);
};

function handleHexString(term, req, res) {
  var hexColor = term;
  if (!utils.isHex(hexColor)) {
    res.status(500).send('Error: not a hex color');
    return;
  }

  var rgbColor = utils.hexToRgb(hexColor);
  var textColor = utils.matchingTextColor(hexColor);

  var html = '<div style="width: 300px; height: 40px; background-color:' + hexColor + ' ; color:' + textColor + '">' +
              hexColor + "<br>" +
              'r:' + rgbColor.r + ' b:' + rgbColor.g + ' c:' + rgbColor.b + '</div>';
  res.json({ body: html });
}
