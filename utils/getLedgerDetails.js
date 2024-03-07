const Ledger = require("../Models/Private/Account/Ledger")
const Prospect = require("../Models/Private/Enquiry/Prospect")
var mongoose = require('mongoose');

async function getLedgerDetails(type,myId){
let id = mongoose.Types.ObjectId(myId)
    let data = {}
    if (type == "prospect" ){
     data = await getProspectDetails(id)
} else if ( type == "employee"){
    data = await getUserDetails(id)
} else if (type == "ledger"){
     data = await myLedgerDetails(id)
}else{
    data = await checkInEach(id)
}

return data
}

const getUserDetails= async(id) => {
    let data = await User.findById(id)
if(data){
    let myData = {
    label:data.firstName + " " + data.lastName,
address:data.street || "",
 city:data.city || "", 
 state:data.state.label || "", 
 zip:data.zip || "", 
 mobile:data.mobile || "", 
email:data.email || ""
}
return myData
}
}
const getProspectDetails= async(id) => {
    let data = await Prospect.findById(id)
if(data){
    let myData = {
    label:data.lastName + " " + data.firstName,
address:data.streetAddress || "",
 city:data.city || "", 
 state:data.state.label || "", 
 zip:data.zipCode || "", 
 mobile:data.phone || "", 
email:data.email || ""
}
return myData
}
}

const myLedgerDetails= async(id) => {
    let data = await Ledger.findById(id)
if(data){
    let myData = {
    label:data.ledger || "",
address:data.street || "" ,
 city:data.city || "", 
 state:data.state.label || "", 
 zip:data.zip || "", 
 mobile:data.mobile || "", 
email:data.email || ""
}

return myData
}
}

const checkInEach = async(id) => {
    let data = {}
  
        data = await getProspectDetails(id)
  if ( !data ){
       data = await getUserDetails(id)
   } else if ( !data ){
        data = await myLedgerDetails(id)
   }
   return data
}

module.exports = getLedgerDetails