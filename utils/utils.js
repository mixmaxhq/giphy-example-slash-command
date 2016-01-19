module.exports = {
  hexToRgb: function(hex) {
    return hexToRgb(hex);
  },

  rgbToHex: function(r,g,b) {
    return rgbToHex(r,g,b);
  },

  isHex: function(hex) {
    return isHex(hex);
  },

  matchingTextColor: function(hex) {
    return matchingTextColor(hex);
  }
};

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r,g,b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function isHex(hex) {
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
}

// Gets Hex not rgb
function matchingTextColor(hex) {
  var rgbColor = hexToRgb(hex);
  var textColor = "#ffffff";
  if (rgbColor.r + rgbColor.g + rgbColor.b > 200) {
    textColor = "#0000";
  }
  return textColor;
}