const express = require("express");
const router = express.Router();
const passport = require("passport");
var mongoose = require('mongoose');

const Invoice = require("../../../../../Models/Private/Residence/Invoice");
const { formatDateToLong, formatDateToISO,formatDateToShortMonth } = require("../../../../../utils/dateFormat");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const numberToWords = require("../../../../../utils/numToWord");

// @type    GET
// @route   /api/v1/invoice/getInvoice/getAll/:id
// @desc    Get a invoice by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myInvoice = await Invoice.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Invoice Loaded",
        data: myInvoice,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        variant: "error",
        message: "Internal server error",
      });
    }
  }
);


  // @type    GET
  // @route   /api/v1/account/invoice/getInvoice/getAll
  // @desc    Get all invoices
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Invoice.find({})
   
        res
          .status(200)
          .json({ variant: "success", message: "Invoice Loaded", data: myData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  // @type    GET
  // @route   /api/v1/residence/invoice/getInvoice/getDataWithPage/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        // Calculate total count if it's the first page
        let myMatch = { }

        let data = await getSearchFun(req,res,myMatch)
        res.status(200).json(data);


      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );
  // @type    GET
  // @route   /api/v1/account/invoice/getInvoice/getDataWithPage/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
    
        const searchQuery = req.params.search
        // Calculate total count if it's the first page
        let myMatch = {
          $or: [
            { voucher: { $regex: new RegExp(searchQuery, "i") } },
            { tranDate: { $regex: new RegExp(searchQuery, "i") } },
            { "payer.label": { $regex: new RegExp(searchQuery, "i") } },
            { "ledger.label": { $regex: new RegExp(searchQuery, "i") } },
            // Add more fields as needed for searching
          ],
        }

       let data = await getSearchFun(req,res,myMatch)
        res.status(200).json(data);

      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  
  // @type    GET Main Table
  // @route   /api/v1/residence/invoice/getInvoice/mainTable/:residence/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/mainTable/:residence/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {

        // Calculate total count if it's the first page
        let myMatch = { }
if(req.params.residence != "all"){
  if((mongoose.Types.ObjectId.isValid(req.params.residence))){
    myMatch = {"ledger._id": req.params.residence}
  }else{
  return  res.json({
      variant: "error",
      message: "Invalid Id",
    });
  }
}
        let mydata = await getSearchFun(req,res,myMatch)
        let data = mydata.data
       let summary = {
          noOfInvoice:data.length,
        invoiceValue:0,
        noOfDues:0,
         totalDues:0,
         noOfFullPaid:0,
         totalFullPaid:0,
         noOfPartial:0,
          totalPartial:0
        }
        let modifiedData = data.map((inv) => {
          summary.invoiceValue += inv.netAmount;
          summary.totalDues += inv.dues;

          let status = "Total Paid";          
          if (!(inv.isPaid)) {
              if (inv.dues === inv.netAmount) {
                  status = "Dues";
          summary.noOfDues += 1;

              } else {
                  status = "Partial Paid";
                  summary.noOfPartial += 1;
                  summary.totalPartial += inv.paid
              }
          }else{
            summary.noOfFullPaid += 1;
            summary.totalFullPaid += inv.paid
          }
          return {
              _id:inv._id,
              voucher:inv.voucher,
              ledgerName: inv.ledger.label,
              ledgerImage: inv.ledger.userImage,
              payerName: inv.payer.label,
              netAmount: inv.netAmount,
              isPaid: inv.isPaid,
              paid:inv.paid,
              status: status,
              dues: inv.dues,
              isUpcoming: inv.isUpcoming,
              tranDate:formatDateToShortMonth(inv.tranDate)
          };
      });
     let residence = await Prospect.aggregate([
      {$match:{isResidence:true}},
      {$project:{firstName:1,lastName:1,userImage:1,community:1,floor:1,room:1,seat:1 }}
     ]).exec()
    let inRes = [ {
      _id:"all",
     firstName:"All Residents", 
     lastName:"", 
     community:{communityName:""},
     room:{label:"All"}, 
     seat:{label:""},
     important: true,
     userImage:"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png",
    }, ...residence]
     return res
      .status(200)
      .json({ variant: "success", message: "Invoice Loaded",residence:inRes,summary, data: modifiedData });


      } catch (error) {
  console.log(error)
        res.status(500).json({
          variant: "error",
          message: "Internal server error" + error.message,
        });
      }
    }
  );

  const getSearchFun = async(req,res,myMatch) => {
   
      const page = parseInt(req.params.PageNumber) || 0; // Get the page number from the route parameters (default to 1)
      const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page
    
      
      const totalCount = await Invoice.countDocuments(
        myMatch
      ) 
      // Retrieve ledgers with pagination
  
 let allInvoice = await Invoice.find(
  myMatch
 )
        .skip((page) * limit) // Skip the appropriate number of records based on the page number
        .limit(limit) // Limit the number of records to retrieve
        .sort({ date: -1 })
        .catch((err) => {
          throw new Error("An error occurred while retrieving ledgers.");
        });
 
     
        const modifiedDataPromises = allInvoice.map(async (Invoice) => {
          const pros = await Prospect.findOne({_id:Invoice.ledger._id})
          let newLedger = {
            community:pros.community.communityName,
            floor:pros.floor.label,
            label:Invoice.ledger.label,
            room:pros.room.label,
            userImage:pros.userImage,
            _id:Invoice.ledger._id,
          }
          let myRow = Invoice.rows
          let newRow = []
          let isPaid = false
          let isUpcoming = compareDateToCurrent(Invoice.tranDate)
          if(Invoice.dues <= 0){
            isPaid = true
          }
        for(let x = 0; x<myRow.length;x++){
          let obj = {
            amount:myRow[x].item.amount,
            issuedOn:myRow[x].item.issuedOn,
            item:myRow[x].item,
            price:myRow[x].item.price,
            qty:myRow[x].item.qty,
            taxPercent:myRow[x].item.taxPercent,
            taxValue:myRow[x].item.taxValue
          }

          newRow.push(obj)
           

        }
          return {
            ...Invoice.toObject(),
            ledger:newLedger,
            rows:newRow,
            isPaid:isPaid,
            isUpcoming:isUpcoming,
            tranDate: formatDateToISO(Invoice.tranDate),
            ledgerImage:pros.userImage
          };
        });
        const modifiedData = await Promise.all(modifiedDataPromises);  
        let dataToSend = { 
          variant: "success",
         message:"Invoice Loaded",
         data: modifiedData ,
         page: page ,
         totalCount: totalCount ,
        }
        return dataToSend       

  }
  
  function compareDateToCurrent(inputDate) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0 for accurate comparison
  
    inputDate.setHours(0, 0, 0, 0);
  
    if (inputDate > currentDate) {
      return true;
    } else if (inputDate <= currentDate) {
      return false;
    }
  }
// /api/v1/residence/invoice/getInvoice/printInvoice/type1/:voucherNumber
router.get("/printInvoice/type1/:voucher", async (req, res) => {
  try {
    let Inv = await Invoice.findOne({ voucher: req.params.voucher });

    if (Inv) {
      let pay = Inv.payment;

      const myPay = pay.map((pa) => {
        return {
          "payDate": pa.payDate,
          "mode": pa.mode.label,
          "amount": pa.amount
        };
      });

      let rows = Inv.rows;
      let cost = 0;
      let myTax = 0;

      const myRow = rows.map((pa) => {
        cost = cost + +pa.item.amount;
        myTax = myTax + +pa.item.taxValue;
        let iss = formatDateToShortMonth(pa.item.issuedOn)
        return {
          ...pa.item,
          item: pa.item.label,
          issuedOn: iss // Assuming pa.issuedOn is a valid date
        };
      });


      let myObj = {
        "payer": {
          "label":Inv.payer.label,
          "address": Inv.payer.billingAddress,
          "city": Inv.payer.city,
          "state": Inv.payer.state,
          "zip": Inv.payer.zip,
          "mobile": Inv.payer.mobile,
          "email": Inv.payer.email
        },
        "ledger": {
          "label":Inv.ledger.label
        },
   
    
        "tranDate": formatDateToLong(Inv.tranDate),
        "dueDate": formatDateToLong(Inv.tranDate),
        "rows": myRow,
        "payment": myPay,
        "itemCost": cost,
        "tax": myTax,
        "freight": Inv.freight,
        "discount": Inv.discount,
        "netAmount": Inv.netAmount,
        "paid": Inv.paid,
        "dues": Inv.dues,
        "dollar": numberToWords(Math.floor(Inv.netAmount)),
        "cent": numberToWords(Math.round((Inv.netAmount % 1) * 100)),
        "qr":"https://s3.shunyafoundation.com/s3/939a16e3ccadc3d88066e0ae47410d8ef9db9cb8/upi-qr-code.png",
        "terms": [
          {
            "term": "Please pay the dues amount within 15 days from date of invoice, overdue interest @ 14% annually will be charged on the delayed payment."
          },
          {
            "term": "Please quote invoice number when remitting funds."
          },
          {
            "term": "Any kind of alteration or complaint regarding this invoice will be subject to consider within 7 days from the date of this invoice."
          }
        ],
        "account": {
          "bankName": "State Bank of India",
          "holderName": "Oasis Manors Inc",
          "accountNo": "454545424454452",
          "ifsc": "SBIN1254SD5",
          "swift": "SBIO3154S",
          "zelle": "oasis@zelle.com"
        }
      }

      res
      .status(200)
      .json({ variant: "success", message: "Invoice Loaded", data: myObj });
}else{
  res.json({
    variant: "error",
    message: "IInvalid Voucher Number" ,
  });
}
    }catch(error){
      console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }

  })

  module.exports = router;