const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Ledger Model
const Ledger = require("../../../../../Models/Private/Account/Ledger");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/account/ledgerValidation");

// @type    POST
// @route   /api/v1/account/ledger/addLedger
// @desc    Create a new ledger
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const ledgerObj = await getLedgerObj(req,"create");
      await new Ledger(ledgerObj)
      .save();
      res.status(201).json({
        message: "Ledger Successfully added",
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
// @route   /api/v1/account/ledger/ledgerRequest/addLedger/:id
// @desc    Update a ledger by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateLedger) {
  try {
    const ledger = await Ledger.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateLedger },
      { new: true }
    );
    if (!ledger) {
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
      const ledgerObj = await getLedgerObj(req,"update");

      updateMe(req, res, ledgerObj);
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
// @route   /api/v1/account/ledger/addLedger/deleteOne/:id
// @desc    Delete a ledger by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const ledger = await Ledger.findByIdAndRemove(req.params.id);
      if (!ledger) {
        return res
          .status(404)
          .json({ variant: "error", message: "Ledger not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Ledger deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getLedgerObj(req,type) {
  let newLedger = {  

  };
  if(type == "create"){
   
  } 
    newLedger.user=  req.user.id;

// Check and assign values for each parameter based on their type
if (req.body.createDate) {
  newLedger.createDate = req.body.createDate;
}

if (req.body.ledgerImage) {
  newLedger.ledgerImage = req.body.ledgerImage;
}

newLedger.voucher = await generateUniqueVoucher();


if (req.body.ledger) {
  newLedger.ledger = req.body.ledger;
}

if (req.body.group) {
  newLedger.group = {}
  if (req.body.group.label) {
    newLedger.group.label = req.body.group.label;
  }

  if (req.body.group._id) {
    newLedger.group._id = req.body.group._id;
  }

  if (req.body.group.link !== undefined) {
    newLedger.group.link = req.body.group.link;
  }
}

if (req.body.openingBal !== undefined) {
  newLedger.openingBal = req.body.openingBal;
}

if (req.body.isDr !== undefined) {
  newLedger.isDr = req.body.isDr;
}

if (req.body.gender) {
  newLedger.gender = {}
  if (req.body.gender?.label) {
    newLedger.gender.label = req.body.gender.label;
  }

  if (req.body.gender?.id) {
    newLedger.gender.id = req.body.gender.id;
  }
}

if (req.body.street) {
  newLedger.street = req.body.street;
}

if (req.body.unit) {
  newLedger.unit = req.body.unit;
}

if (req.body.mobile) {
  newLedger.mobile = req.body.mobile;
}

if (req.body.email) {
  newLedger.email = req.body.email;
}

if (req.body.zip) {
  newLedger.zip = req.body.zip;
}

if (req.body.city) {
  newLedger.city = req.body.city;
}

if (req.body.state) {
  newLedger.state = {}
  if (req.body.state.label) {
    newLedger.state.label = req.body.state.label;
  }

  if (req.body.state.id) {
    newLedger.state.id = req.body.state.id;
  }
}

if (req.body.remark) {
  newLedger.remark = req.body.remark;
}

if (req.body.url) {
  newLedger.url = req.body.url;
}

if (req.body.bankName) {
  newLedger.bankName = req.body.bankName;
}

if (req.body.holderName) {
  newLedger.holderName = req.body.holderName;
}

if (req.body.accountNo) {
  newLedger.accountNo = req.body.accountNo;
}

if (req.body.Aba) {
  newLedger.Aba = req.body.Aba;
}

if (req.body.swift) {
  newLedger.swift = req.body.swift;
}

if (req.body.branch) {
  newLedger.branch = req.body.branch;
}


  newLedger.lastModified = new Date();
 
  return newLedger;
}
function generateVoucher() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let voucher = '';
  for (let i = 0; i < 4; i++) {
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
       // Check if the generated voucher exists in the database
    const existingLedger = await Ledger.findOne({ voucher });

    if (!existingLedger) {
      isUnique = true;
    }
  }

  return voucher;
}



module.exports = router;
