const express = require("express")
const router = express.Router()
const SummaryData = require("./component/summaryData");
const ProspectStage = require("./component/prospectStage");
const CareCount = require("./component/CareCount");
const MedCount = require("./component/MedCount");
const PendingTask = require("./component/pendingTask");
const SomeReceipt = require("./component/someReceipt");
const SomePayment = require("./component/somePayment");
const welcomeMsg = require("./component/welcome");
const passport = require("passport");

router.post("/summaryData", async(req,res) => {
try{
    let summaryData = await SummaryData(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:summaryData });
  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }


})
router.get("/prospectStage", async(req,res) => {
try{
    let prospectStage = await ProspectStage(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:prospectStage });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }


})
router.get("/medCount", async(req,res) => {
try{
    let medCount = await MedCount(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:medCount });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})
router.get("/careCount", async(req,res) => {
try{
    let careCount = await CareCount(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:careCount });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})
router.get("/pendingTask", async(req,res) => {
try{
    let pendingTask = await PendingTask(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:pendingTask });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})
router.get("/someReceiptAndPayment", async(req,res) => {
try{
    let someReceipt = await SomeReceipt(req,res)
    let somePayment = await SomePayment(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:{someReceipt,somePayment} });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})
router.get("/someReceipt", async(req,res) => {
try{
    let someReceipt = await SomeReceipt(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:someReceipt });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})
router.get("/somePayment",
async(req,res) => {
try{
    let somePayment = await SomePayment(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:somePayment });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})
// /api/v1/dashboard/getDashboard/welcomeMsg
router.get("/welcomeMsg", 
passport.authenticate("jwt", {session:false}),
async(req,res) => {
try{
    let weMsg = await welcomeMsg(req,res)
    res
    .status(200)
    .json({ message: "Loaded successfully!!", variant: "success",data:weMsg });


  } catch(error){
    console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error1" });
  }
})


module.exports = router