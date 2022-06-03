const express = require('express');
const externalModule = require('../logger/logger.js')
const externalModule2 = require('../util/helper')
const externalModule3 = require('../validator/formatter')
const lodash = require('lodash')
const router = express.Router();

router.get('/test-me1', function (req, res) {
    
    externalModule.welcome()
    res.send('My first ever api!')
    
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

router.get('/hello', function (req, res) {
    const arr = ['Jan', 'Fab' , 'Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    console.log(lodash.chunk(arr , 3))
    res.send('chunk function api!')
});

router.get('/hello2', function (req, res) {
    const arr2 = [1,3,5,7,9,11,13,15,17,19]
    console.log(lodash.tail(arr2))
    res.send('tail function api!')
});

router.get('/hello3', function (req, res) {
     const unique1 = [1,2,3]
     const unique2 = [3,4,5]
     const unique3 = [5,6,7]
     const unique4 = [7,8,9]
     const unique5 = [10,11,9]
     const result = lodash.union(unique1,unique2,unique3,unique4,unique5)
    console.log(`result: ${result}`)

    res.send('uniun function api')
})

router.get('/hello4', function (req, res) {
    const array = [['horror', 'The Shining'],['drama','Titanic'],['thriller', 'Shutter Island'],['fantasy', 'Pans Labyrinth']]
    const result = lodash.fromPairs(array)
    console.log(result)
    res.send('fromPairs function api')

})



module.exports = router;
// adding this comment for no reason