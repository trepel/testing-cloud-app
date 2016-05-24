var express = require('express');
var winston = require('winston');
var statusObj = require("./data_generation_status");
var userService = require("./services/user_service");

module.exports = {
  router: router
};

function router() {
  var router = new express.Router();

  router.get('/', function(req, res) {
   winston.info("GET /generate called : " + new Date() + ", number of records: " + req.query.numberOfRecords);

    if(statusObj.isFinished()){
      res.statusCode = 200;
      res.json(statusObj);
      statusObj.clearStatus();
    }else if(statusObj.isInProgress()){
      res.statusCode = 202;
      res.json(statusObj);
    }else{
      insertDataIntoDb(req.query.numberOfRecords);
      res.statusCode = 202;
      res.send(statusObj);
    }
  });

  return router;
}

var insertDataIntoDb = function(numberOfRecords){
  if(!numberOfRecords){
    numberOfRecords = 1;
  }
  statusObj.started = new Date();
  statusObj.total = numberOfRecords;
  setImmediate(function(){
    userService.insert(statusObj)
  });
};
