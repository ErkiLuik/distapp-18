'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/CarService');

module.exports.carGET = function carGET (req, res, next) {
  Default.carGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.carsPOST = function carsPOST (req, res, next, body) {
  Default.carsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
