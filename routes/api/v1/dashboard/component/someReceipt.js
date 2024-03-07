const Receipt = require("../../../../../Models/Private/Account/Receipt");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const User = require("../../../../../Models/User");

async function SomeReceipt(req,res) {
 let myReceipt = await getLastFiveReceipts()
 receipt = [{ledger:"John Michu",
  mode:"Cash",
   ledgerImage:"https://mui.com/static/images/avatar/1.jpg", 
   amount:"514"}]
    return myReceipt
}
  
module.exports = SomeReceipt

async function getLastFiveReceipts() {
    try {
      const last5Receipts = await Receipt.find()
        .sort({ date: -1 }) // Sort by date in descending order
        .limit(4) // Limit to the last 5 records
  
      // Iterate through the receipts and fetch additional data based on the ledger type
      for (const receipt of last5Receipts) {
        if (receipt.ledger.type === 'prospect') {
          const prospect = await Prospect.findById(receipt.ledger._id);
          receipt.ledgerImage = prospect ? prospect.userImage : '';
        } else if (receipt.ledger.type === 'employee') {
          const employee = await User.findById(receipt.ledger._id);
          receipt.ledgerImage = employee ? employee.userImage : '';
        } else {
          receipt.ledgerImage = '';
        }
      }
  let modifiedData = last5Receipts.map((data)=> {

    return {
        ledger:data.ledger.label,
        mode:data.mode.label,
      voucher:data.voucher,
        ledgerImage:data.ledgerImage || "https://res.cloudinary.com/oasismanors/image/upload/v1687519053/user_myqgmv.png",
        amount:data.amount
    }
  })
      return modifiedData;
    } catch (error) {
      console.error('Error fetching receipts:', error);
      return [];
    }
  }
  
  

  