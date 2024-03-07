const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Receipt Model
const Receipt = require("../../../../../Models/Private/Account/Receipt");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/account/receiptValidation");

// @type    POST
// @route   /api/v1/account/receipt/addReceipt
// @desc    Create a new receipt
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const receiptObj = await getReceiptObj(req,"create");
      await new Receipt(receiptObj)
      .save();
      res.status(201).json({
        message: "Receipt Successfully Added",
        variant: "success",
      });
    } catch (error) {
console.log(error)
      res
        .status(500)
        .json({ variant: "error", message: "Internal server error1" });
    }
  }
);



// @type    PUT
// @route   /api/v1/account/receipt/addReceipt/:id
// @desc    Update a receipt by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateReceipt) {
  try {
    const receipt = await Receipt.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateReceipt },
      { new: true }
    );
    if (!receipt) {
      return res
        .status(406)
        .json({ message: "Id not found", variant: "error" });
    }
    res
      .status(200)
      .json({ message: "Updated successfully!!", variant: "success" });
  } catch (error) {
console.log(error)
    res
      .status(500)
      .json({ variant: "error", message: "Internal server error" + error.message});
  }
}

router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validateOnUpdate,
  async (req, res) => {
    try {
      const receiptObj = await getReceiptObj(req,"update");

      updateMe(req, res, receiptObj);
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);


// @type    DELETE
// @route   /api/v1/account/receipt/addReceipt/deleteOne:id
// @desc    Delete a receipt by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const receipt = await Receipt.findByIdAndRemove(req.params.id);
      if (!receipt) {
        return res
          .status(404)
          .json({ variant: "error", message: "Receipt not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Receipt deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getReceiptObj(req,type) {
  let newReceipt = {  

  };
  if(type == "create"){
   
  } 
    newReceipt.user=  req.user.id;

// Check and assign values for each parameter based on their type
newReceipt.ledger = {};
  
if (req.body.ledger && req.body.ledger._id && req.body.ledger.type) {
    if (req.body.ledger.label) {
      newReceipt.ledger.label = req.body.ledger.label;
    }
    if (req.body.ledger._id) {
      newReceipt.ledger._id = req.body.ledger._id;
    }
    if (req.body.ledger.type) {
      newReceipt.ledger.type = req.body.ledger.type;
    }
  }

  if (req.body.tranDate) {
    newReceipt.tranDate = req.body.tranDate;
  }


    newReceipt.voucher = await generateUniqueVoucher();


  if (req.body.amount) {
    newReceipt.amount = req.body.amount;
  }
  newReceipt.mode = {};

  if (req.body.mode && req.body.mode._id ) {
    if (req.body.mode.label) {
      newReceipt.mode.label = req.body.mode.label;
    }
    if (req.body.mode._id) {
      newReceipt.mode._id = req.body.mode._id;
    }

  }

  if (req.body.remark) {
    newReceipt.remark = req.body.remark;
  }

  if (req.body.reminderDate) {
    newReceipt.reminderDate = req.body.reminderDate;
  }

  if (req.body.url) {
    newReceipt.url = req.body.url;
  }

  newReceipt.lastModified = new Date();
 
  return newReceipt;
}

function generateVoucher() {
  const characters = '0123456789';
  let voucher = '';
  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    voucher += characters.charAt(randomIndex);
  }
  return voucher;
}

async function generateUniqueVoucher() {
  let isUnique = false;
  let voucher;

  while (!isUnique) {
    voucher = await generateVoucher();
    voucher = 'R' + voucher
       // Check if the generated voucher exists in the database
    const existingLedger = await Receipt.findOne({ voucher:voucher });

    if (!existingLedger) {
      isUnique = true;
    }
  }

  return voucher;
}


module.exports = router;
