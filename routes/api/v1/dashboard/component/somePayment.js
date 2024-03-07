const Payment = require("../../../../../Models/Private/Account/Payment");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const User = require("../../../../../Models/User");

async function SomePayment(req,res) {
 let myPayment = await getLastFivePayments()

    return myPayment
}
  
module.exports = SomePayment

async function getLastFivePayments() {
    try {
      const last5Payments = await Payment.find()
        .sort({ date: -1 }) // Sort by date in descending order
        .limit(4) // Limit to the last 5 records
  
      // Iterate through the Payments and fetch additional data based on the ledger type
      for (const Payment of last5Payments) {
        if (Payment.ledger.type === 'prospect') {
          const prospect = await Prospect.findById(Payment.ledger._id);
          Payment.ledgerImage = prospect ? prospect.userImage : '';
        } else if (Payment.ledger.type === 'employee') {
          const employee = await User.findById(Payment.ledger._id);
          Payment.ledgerImage = employee ? employee.userImage : '';
        } else {
          Payment.ledgerImage = '';
        }
      }
  let modifiedData = last5Payments.map((data)=> {

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
      console.error('Error fetching Payments:', error);
      return [];
    }
  }
  
  

  