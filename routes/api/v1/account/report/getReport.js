const express = require("express");
const DayBook = require("./ReportFun/DayBook");
const { formatDateToShortMonth } = require("../../../../../utils/dateFormat");
const LedgerBook = require("./ReportFun/LedgerBook");
const TrialBalance = require("./ReportFun/TrialBalance");
const router = express.Router();

// Get Data
// /api/v1/account/report/getReport/dayBook
router.post("/dayBook", async(req,res) => {
try {
    let data = await DayBook(req,res)
    let subTitle = getSubTitle(req)
    res.json({
        data:data,
        subTitle:subTitle,
        message:"Data Loaded",
        variant:"success"
    })
} catch (error) {
    console.log(error)
    res.json({
        message:"Something went Wrong in Server",
        variant:"error"
    })
}

})
// Get Ledger book Data
// /api/v1/account/report/getReport/ledgerBook/:id
router.post("/ledgerBook/:ledgerId", async(req,res) => {
try {
    let data = await LedgerBook(req,res)
    let subTitle = getSubTitle(req)    

    res.json({
        data:data.finalData,
        ledger:data.myLedger,
        subTitle:subTitle,
        message:"Data Loaded",
        variant:"success"
    })
} catch (error) {
    console.log(error)
    res.json({
        message:"Something went Wrong in Server",
        variant:"error"
    })
}

})

// Get Data
// /api/v1/account/report/getReport/trialBalance
router.post("/trialBalance", async(req,res) => {
    try {
        let data = await TrialBalance(req,res)
    let subTitle = getSubTitle(req)

        res.json({
            subTitle:subTitle,
            data:data.finalData,
            message:"Data Loaded",
            variant:"success"
        })
    } catch (error) {
        console.log(error)
        res.json({
            message:"Something went Wrong in Server",
            variant:"error"
        })
    }
    
    })
module.exports = router;

const getSubTitle = (req) => {

    let startDate = formatDateToShortMonth(req.body.startDate);
    let endDate = formatDateToShortMonth(req.body.endDate);
    if (startDate === endDate) {
        return `For ${startDate}`;
      } else {
        return `Between ${startDate} - ${endDate}`;
      }

}