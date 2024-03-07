const Ledger = require("../../../../../Models/Private/Account/Ledger")
const Payment = require("../../../../../Models/Private/Account/Payment")

async function CurrentBalance(req,res,ledgerId){

let openingBal = await getOpeningBalance(ledgerId)
let totalPayment = await getTotalPayment()
let totalReceipt = await getTotalReceipt()
}

module.export = CurrentBalance

const getOpeningBalance = (ledgerId) => {
let openingBal = 0
    let data = Ledger.aggregate([
        {$match:{_id:ledgerId}},
        {$project:{openingBal:1}}
    ])
    if(data[0]?.openingBal){
openingBal = data[0].openingBal
}

return openingBal
}
const getPayment = async (ledgerId) => {
    let modeAmount = 0
    let totalAmount = 0
    try {
        // Use async/await to wait for the aggregation result
        const aggregationResult = await Payment.aggregate([
            {
                $match: { "ledger._id": ledgerId }
            },
            {
                $group: {
                    _id: null, // Grouping all documents into a single group
                    totalAmount: { $sum: "$amount" } // Calculate the sum of the amount field
                }
            }
        ]);

        // Check if there are aggregation results
        if (aggregationResult.length > 0) {
            // Extract the totalAmount from the result
             totalAmount = aggregationResult[0].totalAmount;

        } else {
            // No documents matched the ledgerId
            return 0; // or any other suitable default value
        }
        // Use async/await to wait for the aggregation result
        const modeResult = await Payment.aggregate([
            {
                $match: { "ledger._id": ledgerId }
            },
            {
                $group: {
                    _id: null, // Grouping all documents into a single group
                    totalAmount: { $sum: "$amount" } // Calculate the sum of the amount field
                }
            }
        ]);

        // Check if there are aggregation results
        if (modeResult.length > 0) {
            // Extract the totalAmount from the result
           modeAmount = modeResult[0].totalAmount;

        } else {
            // No documents matched the ledgerId
            return 0; // or any other suitable default value
        }
    } catch (error) {
        // Handle any errors that occur during the aggregation
        console.error("Error while aggregating payments:", error);
        throw error;
    }
};
