const express = require('express');
const router = express.Router();

// router.get('/students/:name', function(req, res) {
//     let studentName = req.params.name
//     console.log(studentName)
//     res.send(studentName)
// })


let players = [
                {
                    "name": "manish",
                    "dob": "1/1/1995",
                    "gender": "male",
                    "city": "jalandhar",
                    "sports": [
                        "swimming"
                    ]
                },

                {
                    "name": "gopal",
                    "dob": "1/09/1995",
                    "gender": "male",
                    "city": "delhi",
                    "sports": [
                        "soccer"
                    ]
                },

                {
                    "name": "lokesh",
                    "dob": "1/1/1990",
                    "gender": "male",
                    "city": "mumbai",
                    "sports": [
                        "soccer"
                    ]
                },

            ]

  router.post("/players", function(req, res) {
      let name = req.body.element.name
      for(let  i=0; i<players.length; i++){
            if(name===players[i].name)
          return  res.send({msg : 'name already exist'})

      }
      let ele= req.body.element
        players.push(ele)
        res.send(  { msg: players , status: true }  )
     
 })            


//  Assignments:
// Write a POST /players api that saves a player’s details and doesn’t allow saving the data of a player with a name that already exists in the data


// //  let players = []

// router.post('/players', function (req, res) {
    
//     let newPlayer = req.body
//     let newPlayersName = newPlayer.name
//     let isNameRepeated = false

//     //let player = players.find(p => p.name == newPlayersName)

//     for(let i = 0; i < players.length; i++) {
//         if(players[i].name == newPlayersName) {
//             isNameRepeated = true;
//             break;
//         }
//     }

//     //undefined is same as false/ a falsy value
//     if (isNameRepeated) {
//         //Player exists
//         res.send("This player was already added!")
//     } else {
//         //New entry
//         players.push(newPlayer)
//         res.send(players)
//     }
// });




// router.post("/test-post-2", function(req, res) {
//     res.send(  { msg: "hi" , status: true }  )
// })

// router.post("/test-post-3", function(req, res) {
//     // let id = req.body.user
//     // let pwd= req.body.password

//     // console.log( id , pwd)

//     console.log( req.body )

//     res.send(  { msg: "hi" , status: true }  )
// })



// router.post("/test-post-4", function(req, res) {
//     let arr= [ 12, "functionup"]
//     let ele= req.body.element
//     arr.push(ele)
//     res.send(  { msg: arr , status: true }  )
// })

module.exports = router;