const { count } = require("console")
const BookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")


const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const createAuthor= async function (req, res) {
    let data= req.body

    let savedData= await AuthorModel.create(data)
    res.send({msg: savedData})
}

const getBooksByAuthor= async function (req, res) {
    let data = await AuthorModel.find( {authorName : "Chetan Bhagat" } ).select("author_id")
    let id = data[0].author_id
    let allBooks = await BookModel.find({author_id: id})
    
    res.send({msg: allBooks})
}

// const updateBooks= async function (req, res) {
//     let data1= req.body
//         let allUsers= await BookModel.findOneAndUpdate( { name: "Two states"} , { $set: data1 }, { new: true})
//         let aut= allUsers.author_id
//         let allAuthor=await AuthorModel.findOne({author_id:aut})
//         res.send({msg: allAuthor.author_name})}


const updateBooks = async function (req , res) {
    // let data = req.body
    let data = await BookModel.findOneAndUpdate({bookName : "Two states"},{prices: "100INR"},{new:true}).select({author_id:1, _id:0})
    console.log(data)
    
    let authorOfTwoStates = await AuthorModel.find(data).select({authorName:1, _id :0})
    console.log(authorOfTwoStates)
    let updatedPrice = await BookModel.find({bookName: " Two states"}).select({prices:1, _id:0})
    console.log(updatedPrice)
    res.send({authorOfTwoStates ,msg:updatedPrice })
}

  const booksWithCost = async function (req, res) {
   
        let allUsers= await BookModel.find( { price : { $gte: 50, $lte: 100} }  )
        let auth= allUsers.map(x=>x.author_id)
        let arr=[]
        for(let i=0;i<auth.length;i++)
        { arr.push(await BookModel.find(allUsers[i]).select({ authorName: 1,_id:0}))
    
        }
        
        res.send({msg:arr })
    }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }






module.exports.createBook= createBook
module.exports.createAuthor= createAuthor

module.exports.getBooksByAuthor= getBooksByAuthor
module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks
module.exports.booksWithCost =booksWithCost
