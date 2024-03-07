const express = require("express");
const router = express.Router();
const passport = require("passport");
const Ledger = require("../../../../../Models/Private/Account/Ledger");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const User = require("../../../../../Models/User");
const Payment = require("../../../../../Models/Private/Account/Payment");
const { formatDateToLong, formatDateToISO } = require("../../../../../utils/dateFormat");
const numberToWords = require("../../../../../utils/numToWord");
const getLedgerDetails = require("../../../../../utils/getLedgerDetails");
const Receipt = require("../../../../../Models/Private/Account/Receipt");

// @type    GET by voucher number
// @route   /api/v1/account/payment/getPayment/getByVoucher/payment/:voucher
// @desc    Get a payment by ID
// @access  Public

router.get(
  "/getByVoucher/:type/:voucher",
  async (req, res) => {
    try {
      let myPayment = {}
      if(req.params.type == "payment"){
         myPayment = await Payment.findOne({ voucher: req.params.voucher });
      } else if (req.params.type == "receipt"){
        myPayment = await Receipt.findOne({ voucher: req.params.voucher });
      }
      if (!myPayment) {
        return res.status(404).json({
          variant: "error",
          message: "Payment not found",
        });
      }


      // Convert myPayment to a plain JavaScript object
      myPayment = myPayment.toObject();
      let ledgerData = await getLedgerDetails(myPayment.ledger?.type, myPayment.ledger?._id);
      let myObj = {
        ...myPayment,
        "ledgerP": ledgerData,
        "tranDateP": formatDateToLong(myPayment.tranDate),
        "tranDate": formatDateToISO(myPayment.tranDate),
        "reminderDate": formatDateToISO(myPayment.reminderDate),
        "reminderDateP": formatDateToLong(myPayment.reminderDate),
        "dollar": numberToWords(Math.floor(myPayment.amount)),
        "cent": numberToWords(Math.round((myPayment.amount % 1) * 100)),
        "qr": "https://s3.shunyafoundation.com/s3/939a16e3ccadc3d88066e0ae47410d8ef9db9cb8/upi-qr-code.png",
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
      };

      res.status(200).json({
        variant: "success",
        message: "Payment Loaded",
        data: myObj
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
// @route   /api/v1/payment/getPayment/getAll/:id
// @desc    Get a payment by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myPayment = await Payment.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Payment Loaded",
        data: myPayment,
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
  // @route   /api/v1/account/payment/getPayment/getAll
  // @desc    Get all payments
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Payment.find({})
   
        res
          .status(200)
          .json({ variant: "success", message: "Payment Loaded", data: myData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  // @type    GET
  // @route   /api/v1/account/payment/getPayment/getDataWithPage/:limit/:PageNumber
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 0; // Get the page number from the route parameters (default to 1)
        const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page

        // Calculate total count if it's the first page
        const totalCount = await Payment.countDocuments() 
        // Retrieve ledgers with pagination
    
   let allPayment = await Payment.find()
          .skip((page) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });

                
          // The joined document will be in the `joinedDocument` field of each payment document
          
   
          const modifiedDataPromises = allPayment.map(async (Payment) => {
            let ledImage = "";
            if (Payment.ledger.type == "prospect") {
              const data = await Prospect.findById(Payment.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Payment.ledger.type == "employee") {
              const data = await User.findById(Payment.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Payment.ledger.type == "ledger") {
              const data = await Ledger.findById(Payment.ledger._id);
              if (data?.ledgerImage) {
                ledImage = data.ledgerImage;
              }
            }
            return {
              ...Payment.toObject(),
              ledgerLabel: Payment.ledger.label,
              ledgerImage: ledImage || "https://res.cloudinary.com/dncukhilq/image/upload/v1690208267/oasisManors/Default/myledgerDefault_x7kowb.jpg",
              modeLabel: Payment.mode.label,
              reminderDate: formatDateToISO(Payment.reminderDate),
              tranDate: formatDateToISO(Payment.tranDate),
            };
          });
          const modifiedData = await Promise.all(modifiedDataPromises);          

  
                   res.status(200).json({ 
                     variant: "success",
                    message:"Payment Loaded",
                    data: modifiedData ,
                    page: page ,
                    totalCount: totalCount ,
                   });


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
  // @route   /api/v1/account/payment/getPayment/getDataWithPage/:limit/:PageNumber/:search
  // @desc    Get ledgers with pagination
  // @access  Public
  router.get(
    "/getDataWithPage/:limit/:PageNumber/:search",
    passport.authenticate("jwt", { session: false }),
    async(req, res) => {
      try {
        const page = parseInt(req.params.PageNumber) || 0; // Get the page number from the route parameters (default to 1)
        const limit = parseInt(req.params.limit) || 10; // Number of records to retrieve per page
        const searchQuery = req.params.search
        // Calculate total count if it's the first page
        const totalCount = await Payment.countDocuments(
          {
            $or: [
              { voucher: { $regex: new RegExp(searchQuery, "i") } },
              { remark: { $regex: new RegExp(searchQuery, "i") } },
              { "ledger.type": { $regex: new RegExp(searchQuery, "i") } },
              { "ledger.label": { $regex: new RegExp(searchQuery, "i") } },
              // Add more fields as needed for searching
            ],
          }
        ) 
        // Retrieve ledgers with pagination
    
   let allPayment = await Payment.find(
    {
      $or: [
        { voucher: { $regex: new RegExp(searchQuery, "i") } },
        { remark: { $regex: new RegExp(searchQuery, "i") } },
        { "ledger.type": { $regex: new RegExp(searchQuery, "i") } },
        { "ledger.label": { $regex: new RegExp(searchQuery, "i") } },
        // Add more fields as needed for searching
      ],
    }
   )
          .skip((page) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });
   
       
          const modifiedDataPromises = allPayment.map(async (Payment) => {
            let ledImage = "";
            if (Payment.ledger.type == "prospect") {
              const data = await Prospect.findById(Payment.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Payment.ledger.type == "employee") {
              const data = await User.findById(Payment.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Payment.ledger.type == "ledger") {
              const data = await Ledger.findById(Payment.ledger._id);
              if (data?.ledgerImage) {
                ledImage = data.ledgerImage;
              }
            }
            return {
              ...Payment.toObject(),
              ledgerLabel: Payment.ledger.label,
              ledgerImage: ledImage || "https://res.cloudinary.com/dncukhilq/image/upload/v1690208267/oasisManors/Default/myledgerDefault_x7kowb.jpg",
              modeLabel: Payment.mode.label,
              reminderDate: formatDateToISO(Payment.reminderDate),
              tranDate: formatDateToISO(Payment.tranDate),
            };
          });
          const modifiedData = await Promise.all(modifiedDataPromises);    

  
                   res.status(200).json({ 
                     variant: "success",
                    message:"Payment Loaded",
                    data: modifiedData ,
                    page: page ,
                    totalCount: totalCount ,
                   });


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
  // @route   /api/v1/account/payment/getPayment/dropdown/getLedger
  // @desc    Get all payments
  // @access  Public
  router.get(
    "/dropdown/getLedger",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {
        const myData = await Ledger.aggregate([
          {$project:{
            ledger:1,group:1,date:1
          }},
          {$sort:{date:-1}}
        ]).exec()

        const modifiedData = myData.map((resLed) => {
          return {
            ...resLed,
            label: resLed.ledger,
            group: resLed.group.label,
            type:"ledger"
          };
        });


        const myData2 = await Prospect.aggregate([
          {$project:{
            firstName:1,lastName:1,date:1,residenceStage:1
          }},
          {$sort:{date:-1}}
        ]).exec()
        const modifiedData2 = myData2.map((resLed) => {
          let grp = resLed.residenceStage
          return {
            ...resLed,
            label: `${resLed.firstName} ${resLed.lastName}`,
            group: grp.charAt(0).toUpperCase() + grp.slice(1),            
            type:"prospect"
          };
        });
        const myData3 = await User.aggregate([
          {$match:{designation:"employee"}},
          {$project:{
            firstName:1,lastName:1,date:1
          }},
          {$sort:{date:-1}}
        ]).exec()
        const modifiedData3 = myData3.map((resLed) => {
          return {
            ...resLed,
            label: `${resLed.firstName} ${resLed.lastName}`,
            group: "Employee",
            type:"employee"
          };
        });
        var dataToSend = modifiedData.concat(modifiedData2, modifiedData3);
        res
          .status(200)
          .json({ variant: "success", message: "Payment Loaded", data: dataToSend });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  

  module.exports = router;