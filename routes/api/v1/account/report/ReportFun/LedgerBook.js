const Receipt = require("./../../../../../../Models/Private/Account/Receipt");
const Payment = require("./../../../../../../Models/Private/Account/Payment");
const { formatDateToShortMonth } = require("../../../../../../utils/dateFormat");
var mongoose = require('mongoose');
const getLedgerDetails = require("../../../../../../utils/getLedgerDetails");

const LedgerBook = async (req, res) => {
    let timeZone = "UTC+5:30";
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let ledgerId = mongoose.Types.ObjectId(req.params.ledgerId);

    let rData = await Receipt.find({
        "ledger._id":ledgerId,
        tranDate: {
            $gte: startDate,
            $lte: endDate
        }
    });

    let pData = await Payment.find({
        'ledger._id':req.params.ledgerId,
        tranDate: {
            $gte: startDate,
            $lte: endDate
        }
    });
    let ledgerData = {}
    if(pData.length <= 0 && rData.length <= 0){
     ledgerData = await getLedgerDetails("type", ledgerId);
}

 
let myLedger = pData[0]?.ledger?.label || rData[0]?.ledger?.label || ledgerData?.label || ""
    let mrData = rData.map((data) => {
        let myDate = formatDateToShortMonth(data.tranDate);
        return {
            date: myDate || "",
            particulars: "From " + data.mode.label || "",
            type: "Receipt" || "",
            voucherNo: data.voucher || "",
           
            dr: "",
            cr: data.amount || ""
        };
    });

    let mpData = pData.map((data) => {
        let myDate = formatDateToShortMonth(data.tranDate);
        return {
            date: myDate || "",
            particulars: "To " + data.mode.label || "",
            type: "Payment" || "",
            voucherNo: data.voucher || "",
            dr: data.amount || "",
            cr: ""
        };
    });

    let finalData = [...mrData, ...mpData];

    finalData.sort((a, b) => {
        return a.date.localeCompare(b.date);
    });

    return {finalData,myLedger};
};

module.exports = LedgerBook;
