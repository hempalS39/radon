const { count } = require("console")
const orderModel= require("../models/orderModel")
const productModel = require("../models/productModel")
const userModel= require("../models/userModel")



const createOrder= async function (req, res) {
    let data = req.body
    let userId = data.userId
    let productId = data.productId
    let userPresent = await userModel.findById(userId)
    if(!userPresent){
        return res.send({msg: "user not present"})
    }
    let productPresent = await productModel.findById(productId)
        if(!productPresent){
            return res.send({msg: "product not present"})
    }

    if(!req.apptypefree && userPresent.balance >= productPresent.price){
        userPresent.balance = userPresent.balance - productPresent.price
        await userPresent.save()
        data.amount = productPresent.price
        data.isfreeappuser = false
        let orderCreated = await orderModel.create(data)
        return res.send({order : orderCreated})
    }
    else if(!req.apptypefree){
        return res.send({msg: "status false"})
    }
    else{
        data.amount = 0
        data.isfreeappuser = true 
        let orderCreated = await orderModel.create(data)
        return res.send({data : data})
    }

}


// const OrderDetail = async function (req, res) {
//     let data = req.body
//     let isFreeAppUser = req.headers.isfreeappuser
//     let check = await productModel.findOne({ _id: data.productId }).select({ _id: 1 })
//     let check1 = await userModel.findOne({ _id: data.userId }).select({ _id: 1 })
//     let check2 = await productModel.findOne({ _id: data.productId }).select({ price: 1, _id: 0 })
//     // let check3 = await userModel.findOne({ _id: data.userId }).select({ balance: 1, _id: 0 })
//     // let deductedBalance = check3.balance - check2.price
//     // console.log(deductedBalance)

//     if (data.userId && data.productId) {
//         let orderr = await orderModel.create(data)
//         console.log(orderr)
//         let check3 = await userModel.findOne({ _id: data.userId }).select({ balance: 1, _id: 0 })
//         let deductedBalance = check3.balance - check2.price
//         console.log(deductedBalance)

//         // return res.send({msg: orderr})
//         if (check === null && check1 === null) {
//             res.send("data invalid")
//         }
//        else if (req.headers.isfreeappuser == false) {
//             if (check3 > check2) {
//                 let updatebalance = await productModel.findOneAndUpdate({ _id: data.productId, balance: { $set: deductedBalance } })
//                 let updated = await orderModel.findOneAndUpdate({ check: productId, $set: { amount: check2, isFreeAppUser: false } })
//                 res.send({ order: updated })}
//             else {

//                 res.send("insufficient balance")
//             }}
//         else {
//             let orderr = await orderModel.create(data)
//          let updateOrder = await orderModel.updateMany({productId: check},{$set: { amount: 0, isFreeAppUser: true } })
//             res.send({ order: orderr })
//         }

//     }
//     else { res.send("invalid detail") }
    
// }

module.exports.createOrder= createOrder
// module.exports.OrderDetail= OrderDetail

