const express = require('express');
const externalModule = require('../logger/logger.js')
const externalModule2 = require('../util/helper')
const externalModule3 = require('../validator/formatter')
const router = express.Router();

router.get('/test-me1', function (req, res) {
    
    externalModule.welcome()
    res.send('My first ever api!')
    // res.send("Welcom to my application. I am Hempal Singh and a part of FunctionUp Radon cohort")
    

});

router.get('/test-me2', function (req, res) {

    externalModule2.printDate()
    externalModule2.printMonth()
    externalModule2.getBatchInfo()

    res.send('My second API')
});

router.get('/test-me3', function (req, res) {

    externalModule3.trimStr()
    externalModule3.lowercase()
    externalModule3.uppercase()

    res.send('My third api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me5', function (req, res) {
    res.send('My last api!')
});

module.exports = router;
// adding this comment for no reason