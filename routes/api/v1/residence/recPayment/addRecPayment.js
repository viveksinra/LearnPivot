const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load RecPayment Model
const RecPayment = require("../../../../../Models/Private/Residence/RecPayment");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/residence/recPaymentValidation");

// @type    POST
// @route   /api/v1/residence/recPayment/addRecPayment
// @desc    Create a new recPayment
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const recPaymentObj = await getRecPaymentObj(req,"create");
      await new RecPayment(recPaymentObj)
      .save();
      res.status(201).json({
        message: "Charge added Successfully",
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
// @route   /api/v1/residence/recPayment/recPaymentRequest/addRecPayment/:id
// @desc    Update a recPayment by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateRecPayment) {
  try {
    const recPayment = await RecPayment.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateRecPayment },
      { new: true }
    );
console.log(updateRecPayment)
    if (!recPayment) {
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
      const recPaymentObj = await getRecPaymentObj(req,"update");
      updateMe(req, res, recPaymentObj);
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
// @route   /api/v1/recPayment/addRecPayment/:id
// @desc    Delete a recPayment by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const recPayment = await RecPayment.findByIdAndRemove(req.params.id);
      if (!recPayment) {
        return res
          .status(404)
          .json({ variant: "error", message: "Charges not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Charges deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

function getDateBefore(inputDate) {
  const date = new Date(inputDate);
  date.setDate(date.getDate() - 1);
  return date.toISOString();
}


async function getRecPaymentObj(req,type) {
  let newRecPayment = {  

  };
  if(type == "create"){
   
  } 
  newRecPayment.user=  req.user.id;
// Check and assign values for each parameter based on their type
 
  if (req.body.payerType) {
    newRecPayment.payerType = {}
    if (req.body.payerType.label) {
      newRecPayment.payerType.label = req.body.payerType.label;
    }
    if (req.body.payerType.id) {
      newRecPayment.payerType.id = req.body.payerType.id;
    }
  };
  if (req.body.payer) {
    newRecPayment.payer = {}
    if (req.body.payer.label) {
      newRecPayment.payer.label = req.body.payer.label;
    }
    if (req.body.payer.relation) {
      newRecPayment.payer.relation = req.body.payer.relation;
    }
    if (req.body.payer._id) {
      newRecPayment.payer._id = req.body.payer._id;
    }
  };
  if (req.body.item) {
    newRecPayment.item = {}
    if (req.body.item.label) {
      newRecPayment.item.label = req.body.item.label;
    }
    if (req.body.item.category) {
      newRecPayment.item.category = req.body.item.category;
    }
    if (req.body.item.price) {
      newRecPayment.item.price = req.body.item.price;
    }
    if (req.body.item._id) {
      newRecPayment.item._id = req.body.item._id;
    }
  };
  if (req.body.description) {
    newRecPayment.description = req.body.description;
  };
  if (req.body.startDate) {
    newRecPayment.startDate = req.body.startDate;
  };
  if (req.body.endDate) {
    newRecPayment.endDate = req.body.endDate;
  };
  if (req.body.price) {
    newRecPayment.price = req.body.price;
  };
  if (req.body.taxPercent) {
    newRecPayment.taxPercent = req.body.taxPercent;
  };
  if (req.body.recurring != undefined) {
    newRecPayment.recurring = req.body.recurring;
  };
  if (req.body.discontinue != undefined) {
    newRecPayment.discontinue = req.body.discontinue;
  };

  if (req.body.prospectId) {   
    newRecPayment.prospectId = req.body.prospectId;
  }
  newRecPayment.lastModified = new Date();
 
  return newRecPayment;
}




module.exports = router;
