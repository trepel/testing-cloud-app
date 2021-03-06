var fh = require('fh-mbaas-api');
var express = require('express');
var util = require('./util');

var rsaConfig = {
  "act": 'keygen',
  "params": {
    "algorithm": "RSA",
    "keysize": 1024
  }
};
var aesConfig = {
  "act": 'keygen',
  "params": {
    "algorithm": "AES",
    "keysize": 128
  }
};

function router() {
  var router = new express.Router();

  router.get('/rsa_keys', function(req, res) {
    fh.sec(rsaConfig, util.defaultResponse(res));
  });
  router.get('/aes_keys', function(req, res) {
    fh.sec(aesConfig, util.defaultResponse(res));
  });
  router.get('/test', function(req, res) {
    util.runTests(req, res, 'Secure API', true);
  });

  return router;
}

module.exports = {
  router: router
};
