
const mid1= function ( req, res, next) {
    let currentDate = new Date().toLocaleString()
    let IP = req.ip 
    let currentRoute = req.route.path
    console.log(currentDate ," ", IP ," ", currentRoute)
    
    next()
}

// const mid2= function ( req, res, next) {
//     console.log("Hi I am a middleware named Mid2")
//     next()
// }



module.exports.mid1= mid1
// module.exports.mid2= mid2
// module.exports.mid3= mid3
// module.exports.mid4= mid4
