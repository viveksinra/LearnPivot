const Receipt = require("./../../../../../../Models/Private/Account/Receipt");
const Payment = require("./../../../../../../Models/Private/Account/Payment");
const Ledger = require("./../../../../../../Models/Private/Account/Ledger");
const Prospect = require("./../../../../../../Models/Private/Enquiry/Prospect");
const User = require("./../../../../../../Models/User");

const TrialBalance = async (req, res) => {
    try {
        let timeZone = "UTC+5:30";
        let startDate = new Date(req.body.startDate);
        let endDate = new Date(req.body.endDate);
    let ledgers = await getAllLedger()
    let x = 0
    let data = []
    while(x<ledgers.length){
        let ledger = ledgers[x];
        let openingBal =  0
        if(ledger?.openingBal){
            openingBal = +(ledger?.openingBal) 
        }
        let isDr = ledger?.isDr || false
        if(isDr){
            openingBal = -openingBal 
        }
        let roBal = await Receipt.aggregate([
            {
                $match: {
                    "ledger._id": ledger._id,
                    tranDate: {
                        $lte: startDate
                    }
                }
            },
            {
                $addFields: {
                    "amount": { $toInt: "$amount" } // Convert the amount field to an integer
                }
            },
            {
                $group: {
                    _id: "$ledger._id", // Group by the ledger ID
                    totalAmount: {
                        $sum: "$amount" // Calculate the sum of the amount field
                    }
                }
            }
        ]).exec();
        
let rNew = await Receipt.aggregate([
            {
                $match: {
                    "ledger._id": ledger._id,
                    tranDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $addFields: {
                    "amount": { $toInt: "$amount" } // Convert the amount field to an integer
                }
            },
            {
                $group: {
                    _id: "$ledger._id", // Group by the ledger ID
                    totalAmount: {
                        $sum: "$amount" // Calculate the sum of the amount field
                    }
                }
            }
        ]).exec();
let poBal = await Payment.aggregate([
            {
                $match: {
                    "ledger._id": ledger._id,
                    tranDate: {
                        $lte: startDate
                    }
                }
            },
            {
                $addFields: {
                    "amount": { $toInt: "$amount" } // Convert the amount field to an integer
                }
            },
            {
                $group: {
                    _id: "$ledger._id", // Group by the ledger ID
                    totalAmount: {
                        $sum: "$amount" // Calculate the sum of the amount field
                    }
                }
            }
        ]).exec();
let pNew = await Payment.aggregate([
            {
                $match: {
                    "ledger._id": ledger._id,
                    tranDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }
            },
            {
                $addFields: {
                    "amount": { $toInt: "$amount" } // Convert the amount field to an integer
                }
            },
            {
                $group: {
                    _id: "$ledger._id", // Group by the ledger ID
                    totalAmount: {
                        $sum: "$amount" // Calculate the sum of the amount field
                    }
                }
            }
        ]).exec();
let froBal = 0
if(roBal[0]?.totalAmount){
    froBal = roBal[0]?.totalAmount
}
let fpoBal = 0

if(poBal[0]?.totalAmount){
    fpoBal = poBal[0]?.totalAmount
}
let frNew = 0

if(rNew[0]?.totalAmount){
    frNew = rNew[0]?.totalAmount
}
let fpNew = 0

if(pNew[0]?.totalAmount){
    fpNew = pNew[0]?.totalAmount
}

let openingBalance = openingBal + froBal - fpoBal;
let nettTransaction = frNew - fpNew;

let myData = {
    ...ledger,
    openingBalance : openingBalance,
    nettTransaction : nettTransaction,
    closingBalance : openingBalance + nettTransaction,
    openingBalDate:{
        startDate:new Date('1990-01-01'),
        endDate:startDate,
    },
    nettTransactionDate:{
        startDate:startDate,
        endDate:endDate
    },

}
data.push(myData)
        x++
    }
 
// Initialize an empty object to store the transformed data
const transformedData = {};

// Iterate through the original data
data.forEach((entry,i) => {
  // Check if the group already exists in the transformed data
  if (!transformedData[entry.group]) {
    // If not, create a new entry for the group
    transformedData[entry.group] = {
      group: entry.group,
      ledgers: []
    };
  }

  // Determine opType, nettTranType, and closingBalType based on openingBalance
  let opType = "DR";
  let nettTranType = "DR";
  let closingBalType = "DR";
  if (entry.openingBalance > 0) {
    opType = "CR";
} else   if (entry.openingBalance == 0) {
    opType = "";
}
  if (entry.nettTransaction > 0) {
    nettTranType = "CR";
  } else  if (entry.nettTransaction == 0) {
    nettTranType = "";
  } 
  if (entry.closingBalance > 0) {
    closingBalType = "CR";
  } else   if (entry.closingBalance == 0) {
    closingBalType = "";
  } 

  // Add the transformed entry to the group
  transformedData[entry.group].ledgers.push({
    ...entry,
    index:(i + 1),
    opType:opType || "",
    nettTranType: nettTranType || "",
    closingBalType:closingBalType || ""
  });
});

// Convert the transformed data object to an array
const transformedArray = Object.values(transformedData);

    return {finalData:transformedArray};  
    } catch (error) {
        console.log(error)
        return res.json({
            message:"Something went wrong in server",
            variant:"error"
        })
    }
  
};

module.exports = TrialBalance;


const getAllLedger = async() => {

        const myData = await Ledger.aggregate([
          {$project:{
            ledger:1,group:1,date:1,openingBal:1,isDr:1
          }},
          {$sort:{date:-1}}
        ]).exec()

        const modifiedData = myData.map((resLed) => {
          return {
            ...resLed,
            particulars: resLed.ledger,
            group: resLed.group.label,
            
            type:"ledger"
          };
        });


        const myData2 = await Prospect.aggregate([
          {$project:{
            firstName:1,lastName:1,date:1,residenceStage:1,openingBal:1,isDr:1
          }},
          {$sort:{date:-1}}
        ]).exec()
        const modifiedData2 = myData2.map((resLed) => {
          let grp = resLed.residenceStage
          return {
            ...resLed,
            particulars: `${resLed.firstName} ${resLed.lastName}`,
            group: grp.charAt(0).toUpperCase() + grp.slice(1),            
            type:"prospect"
          };
        });
        const myData3 = await User.aggregate([
          {$match:{designation:"employee"}},
          {$project:{
            firstName:1,lastName:1,date:1,openingBal:1,isDr:1,
          }},
          {$sort:{date:-1}}
        ]).exec()
        const modifiedData3 = myData3.map((resLed) => {
          return {
            ...resLed,
            particulars: `${resLed.firstName} ${resLed.lastName}`,
            group: "Employee",
            type:"employee"
          };
        });
 let dataToSend = modifiedData.concat(modifiedData2, modifiedData3);
  return dataToSend
}