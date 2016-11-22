var express = require('express');
var problemService = require('../commonservices/problemservice.js');
var answerService = require('../commonservices/answerservice.js');
var userService = require('../commonservices/userservice.js');
var router = express.Router();

router.get('/', function(req, res, next) {
  problemService.getAllProblems(function(allProblems){
    userService.getAllUsers(function(allUsers){
      for(var idx = 0; idx < allProblems.length; idx += 1) {
        allProblems[idx].postedBy = allUsers[idx + 1];
      }
      res.send(allProblems);
    });
  });
});

router.get('/:problemId', function(req, res, next) {
  problemService.getProblemById(req.params.problemId, function(problem){
    userService.getUserById(problem.postedBy, function(user){
      problem.postedBy = user;
      answerService.getAnswers(req.params.problemId, function(answers){
        problem.answers = answers;
        res.send(problem);
      });
    });
  });
});

router.post('/', function(req, res, next) {
  var problem = problemService.postProblems(req.body);
  res.send("OK");
});

module.exports = router;
