

const printDate = function(){
    console.log("Module:2")
    let date = new Date()
    console.log(`date: ${date}`)
    
}


const printMonth = function(){
    let date = new Date()
    let month = date.getMonth()+1
    console.log(`currentMonth: ${month}`)

}

const getBatchInfo = function(){
    console.log("BatchInfo: Radon,W3D3, the topic for today is Nodejs-module system")
    console.log()
}


module.exports.printDate = printDate
module.exports.getBatchInfo = getBatchInfo
module.exports.printMonth = printMonth
