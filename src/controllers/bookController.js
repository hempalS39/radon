const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel = require("../models/publisherModel")


// const createBook= async function (req, res) {
//     let book = req.body
//     let bookCreated = await bookModel.create(book)
//     res.send({data: bookCreated})
// }

const createBook = async function (req, res) {
    let book = req.body
    let check = await authorModel.findOne({ _id: book.author_id })
    // console.log(check)
    let check1 = await publisherModel.findOne({ _id: book.publisher_id })
    // console.log(check1)

    if (book.author_id && book.publisher_id) {
        if (check === null) {
            res.send("author with this Id is not persent")
        }
        else if (check1 === null) {
            res.send("publisher with this Id is not persent")
        }
        else {
            let bookCreated = await bookModel.create(book)
            res.send({ data: bookCreated })
        }
    }
    else { res.send("authorId or publisherId is missing") }
    // res.send({msg:check})
}


const getBooksWithAuthorDetails = async function (req, res) {
    let BooksData = await bookModel.find().populate('author_id').populate('publisher_id')
    res.send({ data: BooksData })

}





//5.........................
const updateBookData = async function (req, res) {
    //let kd = publisher_id.name
    let check1 = await publisherModel.find({$or:[{name:{$eq: 'HarperCollins'}},{name:{$eq:'Penguin'}}]}).select({_id:1})
    let specificBook=null
    let check2=null
    for (let i=0;i<check1.length;i++){
let check2=check1[i]._id
 specificBook = await bookModel.updateMany({publisher_id : check2},{$set:{isHardCover:true}})
}
    res.send({ data: specificBook })

}

const updateBookPrice= async function(req,res){
    let check = await authorModel.find({rating:{$gt:3.5}}).select('_id')
    let bookdata=await bookModel.updateMany({author_id:check},{$inc:{price:10}})
    res.send({data:bookdata})
}





// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }



module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
module.exports.updateBookData = updateBookData
module.exports.updateBookPrice = updateBookPrice

