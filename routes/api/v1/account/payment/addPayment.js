const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Payment Model
const Payment = require("../../../../../Models/Private/Account/Payment");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/account/paymentValidation");

// @type    POST
// @route   /api/v1/account/payment/addPayment
// @desc    Create a new payment
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const paymentObj = await getPaymentObj(req,"create");
      await new Payment(paymentObj)
      .save()
      res.status(201).json({
        message: "Payment Successfully Added",
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
// @route   /api/v1/enquiry/payment/paymentRequest/addPayment/:id
// @desc    Update a payment by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updatePayment) {
  try {
    const payment = await Payment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updatePayment },
      { new: true }
    );
    if (!payment) {
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
      const paymentObj = await getPaymentObj(req,"update");

      updateMe(req, res, paymentObj);
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
// @route   /api/v1/account/payment/addPayment/deleteOne:id
// @desc    Delete a payment by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const payment = await Payment.findByIdAndRemove(req.params.id);
      if (!payment) {
        return res
          .status(404)
          .json({ variant: "error", message: "Payment not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Payment deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getPaymentObj(req,type) {
  let newPayment = {  

  };
  if(type == "create"){
   
  } 
    newPayment.user=  req.user.id;

// Check and assign values for each parameter based on their type
newPayment.ledger = {};
  
if (req.body.ledger && req.body.ledger._id && req.body.ledger.type) {
    if (req.body.ledger.label) {
      newPayment.ledger.label = req.body.ledger.label;
    }
    if (req.body.ledger._id) {
      newPayment.ledger._id = req.body.ledger._id;
    }
    if (req.body.ledger.type) {
      newPayment.ledger.type = req.body.ledger.type;
    }
  }

  if (req.body.tranDate) {
    newPayment.tranDate = req.body.tranDate;
  }


    newPayment.voucher = await generateUniqueVoucher();


  if (req.body.amount) {
    newPayment.amount = req.body.amount;
  }
  newPayment.mode = {};

  if (req.body.mode && req.body.mode._id ) {
    if (req.body.mode.label) {
      newPayment.mode.label = req.body.mode.label;
    }
    if (req.body.mode._id) {
      newPayment.mode._id = req.body.mode._id;
    }

  }

  if (req.body.remark) {
    newPayment.remark = req.body.remark;
  }

  if (req.body.reminderDate) {
    newPayment.reminderDate = req.body.reminderDate;
  }

  if (req.body.url) {
    newPayment.url = req.body.url;
  }

  newPayment.lastModified = new Date();
 
  return newPayment;
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
    voucher = 'P' + voucher
       // Check if the generated voucher exists in the database
    const existingLedger = await Payment.findOne({ voucher:voucher });

    if (!existingLedger) {
      isUnique = true;
    }
  }

  return voucher;
}



module.exports = router;
