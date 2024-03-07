const express = require("express");
const router = express.Router();
const passport = require("passport");
const Ledger = require("../../../../../Models/Private/Account/Ledger");
const Prospect = require("../../../../../Models/Private/Enquiry/Prospect");
const User = require("../../../../../Models/User");
const Receipt = require("../../../../../Models/Private/Account/Receipt");
const { formatDateToLong, formatDateToISO } = require("../../../../../utils/dateFormat");

// @type    GET by voucher number
// @route   /api/v1/account/receipt/getReceipt/getByVoucher/:voucher
// @desc    Get a payment by ID
// @access  Public

router.get(
  "/getByVoucher/:voucher",
  async (req, res) => {
    try {
      let myReceipt = await Receipt.findOne({voucher:req.params.voucher});
      res.status(200).json({
        variant: "success",
        message: "Receipt Loaded",
        data: myReceipt,
        isReceipt:true
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
// @route   /api/v1/receipt/getReceipt/getAll/:id
// @desc    Get a receipt by ID
// @access  Public

router.get(
  "/getAll/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let myReceipt = await Receipt.findById(req.params.id);
      res.status(200).json({
        variant: "success",
        message: "Receipt Loaded",
        data: myReceipt,
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
  // @route   /api/v1/account/receipt/getReceipt/getAll
  // @desc    Get all receipts
  // @access  Public
  router.get(
    "/getAll",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
     
      try {

        const myData = await Receipt.find({})
   
        res
          .status(200)
          .json({ variant: "success", message: "Receipt Loaded", data: myData.reverse() });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  
  
  // @type    GET
  // @route   /api/v1/account/receipt/getReceipt/getDataWithPage/:limit/:PageNumber
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
        const totalCount = await Receipt.countDocuments() 
        // Retrieve ledgers with pagination
    
   let allReceipt = await Receipt.find()
          .skip((page) * limit) // Skip the appropriate number of records based on the page number
          .limit(limit) // Limit the number of records to retrieve
          .sort({ date: -1 })
          .catch((err) => {
            throw new Error("An error occurred while retrieving ledgers.");
          });

                
          // The joined document will be in the `joinedDocument` field of each receipt document
          
   
          const modifiedDataPromises = allReceipt.map(async (Receipt) => {
            let ledImage = "";
            if (Receipt.ledger.type == "prospect") {
              const data = await Prospect.findById(Receipt.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Receipt.ledger.type == "employee") {
              const data = await User.findById(Receipt.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Receipt.ledger.type == "ledger") {
              const data = await Ledger.findById(Receipt.ledger._id);
              if (data?.ledgerImage) {
                ledImage = data.ledgerImage;
              }
            }
            return {
              ...Receipt.toObject(),
              ledgerLabel: Receipt.ledger.label,
              ledgerImage: ledImage || "https://res.cloudinary.com/dncukhilq/image/upload/v1690208267/oasisManors/Default/myledgerDefault_x7kowb.jpg",
              modeLabel: Receipt.mode.label,
              reminderDate: formatDateToISO(Receipt.reminderDate),
              tranDate: formatDateToISO(Receipt.tranDate),
            };
          });
          const modifiedData = await Promise.all(modifiedDataPromises);          

  
                   res.status(200).json({ 
                     variant: "success",
                    message:"Receipt Loaded",
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
  // @route   /api/v1/account/receipt/getReceipt/getDataWithPage/:limit/:PageNumber/:search
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
        const totalCount = await Receipt.countDocuments(
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
    
   let allReceipt = await Receipt.find(
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
   
       
          const modifiedDataPromises = allReceipt.map(async (Receipt) => {
            let ledImage = "";
            if (Receipt.ledger.type == "prospect") {
              const data = await Prospect.findById(Receipt.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Receipt.ledger.type == "employee") {
              const data = await User.findById(Receipt.ledger._id);
              if (data?.userImage) {
                ledImage = data.userImage;
              }
            } else if (Receipt.ledger.type == "ledger") {
              const data = await Ledger.findById(Receipt.ledger._id);
              if (data?.ledgerImage) {
                ledImage = data.ledgerImage;
              }
            }
            return {
              ...Receipt.toObject(),
              ledgerLabel: Receipt.ledger.label,
              ledgerImage: ledImage || "https://res.cloudinary.com/dncukhilq/image/upload/v1690208267/oasisManors/Default/myledgerDefault_x7kowb.jpg",
              modeLabel: Receipt.mode.label,
              reminderDate: formatDateToISO(Receipt.reminderDate),
              tranDate: formatDateToISO(Receipt.tranDate),
            };
          });
          const modifiedData = await Promise.all(modifiedDataPromises);    

  
                   res.status(200).json({ 
                     variant: "success",
                    message:"Receipt Loaded",
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
  // @route   /api/v1/account/receipt/getReceipt/dropdown/getLedger
  // @desc    Get all receipts
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
          .json({ variant: "success", message: "Receipt Loaded", data: dataToSend });
      } catch (error) {
        console.log(error)
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );
  

  module.exports = router;