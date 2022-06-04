const express = require('express');
const router = express.Router();


// <------------------problem-1- GET/movies api--------------------------->

router.get("/movies", function(req, res) {
    let moviesArr = ["Matrix", "Puspa", "Avengers", "Suryavansum", "KGF"]
    
    res.send(  { msg: moviesArr }  )
})

// <------------------problem-2 && 3- GET/movies/indexNUmber-api------------------------->
//Create an API GET /movies/:indexNumber (For example GET /movies/1 is a valid request and it should return the movie in your array at index 1). You can define an array of movies again in your api

router.get("/movies/:indexNumber", function (req, res){
    let moviesArr = ["Matrix", "Pushpa", "Avenger", "Suryanvasum", "KGF"]
    let index = req.params.indexNumber
    
    if(index<moviesArr.length){ 
    let movie = moviesArr[index]
    res.send({movie: movie})
    }
    else{
        res.send({msg: "indexNumber is invalid, use a valid index Number"})
    }
})

// <------------------problem-4-GET/films-api------------------------->
//Write another api called GET /films. Instead of an array of strings define an array of movie objects this time. Each movie object should have values - id, name.
//Return the entire array in this api’s response

 let arrObj = [
    {'id': 1, 
      'name': 'Avenger' },
    {
        'id': 2,
        'name':'Pushpa'
       }, {
        'id': 3,
        'name': 'Matrix'
       }, {
        'id': 4,
        'name': 'KGF'
       },
       {
        'id': 5,
        'name': 'Sherdil-The Pilibhit Saga'
       }
           
]
router.get("/films", function(req, res){
    
    res.send({arrayOfObj: arrObj})
})

// <------------------problem-5-GET/films/:filmId-api------------------------->
//Write api GET /films/:filmId where filmId is the value received in request path params. Use this value to return a movie object with this id. In case there is no such movie present in the array, return a suitable message in the response body. Example for a request GET /films/3 should return the movie object 
// {
//     “id”: 3,
//     “name”: “Rang de Basanti”
//    }
//    Similarly for a request GET /films/9 the response can be something like - ‘No movie exists with this id’

router.get("/films/:filmId" , function (req , res){
    let id = (req.params.filmId)
    // console.log(`id=${id} and id-1=${id-1}`)
    if(id>0 && id<=arrObj.length){
        
        res.send(arrObj[id-1]);
    }
     else{
         res.send({msg: "No movie exists with this id"
         })
     }
       
})



module.exports = router;