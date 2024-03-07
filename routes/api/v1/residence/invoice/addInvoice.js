const express = require("express");
const router = express.Router();
const passport = require("passport");

// Load Invoice Model
const Invoice = require("../../../../../Models/Private/Residence/Invoice");
const {
  validateOnCreate,
  validateOnUpdate,
} = require("../../../../../validation/residence/invoiceValidation");

// @type    POST
// @route   /api/v1/residence/invoice/addInvoice
// @desc    Create a new invoice
// @access  Public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateOnCreate,
  async (req, res) => {
    try {
      const invoiceObj = await getInvoiceObj(req,"create");
      await new Invoice(invoiceObj)
      .save()
      .then(() => updateRecPayment(req.body.rows))


      res.status(201).json({
        message: "Invoice Successfully added",
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

const updateRecPayment = (rows) => {

}

// @type    PUT
// @route   /api/v1/enquiry/invoice/invoiceRequest/addInvoice/:id
// @desc    Update a invoice by ID
// @access  Public
// @type    POST

async function updateMe(req, res, updateInvoice) {
  try {
    const invoice = await Invoice.findOneAndUpdate(
      { _id: req.params.id },
      { $set: updateInvoice },
      { new: true }
    );
    if (!invoice) {
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
      const invoiceObj = await getInvoiceObj(req,"update");

      updateMe(req, res, invoiceObj);
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
// @route   /api/v1/invoice/addInvoice/:id
// @desc    Delete a invoice by ID
// @access  Public
router.delete(
  "/deleteOne/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const invoice = await Invoice.findByIdAndRemove(req.params.id);
      if (!invoice) {
        return res
          .status(404)
          .json({ variant: "error", message: "Invoice not found" });
      }
      res
        .status(200)
        .json({ variant: "success", message: "Invoice deleted successfully" });
    } catch (error) {
console.log(error)
      res.status(500).json({
        variant: "error",
        message: "Internal server error" + error.message,
      });
    }
  }
);

async function getInvoiceObj(req,type) {
  let newInvoice = {  

  };
  if(type == "create"){
    newInvoice.voucher = await createVoucher();
   
  } 
  newInvoice.user=  req.user.id;

  if (req.body.tranDate) {
    newInvoice.tranDate = req.body.tranDate;
}
newInvoice.ledger = {};

if (req.body.ledger) {
    if (req.body.ledger.label) {
        newInvoice.ledger.label = req.body.ledger.label;
    }
    if (req.body.ledger._id) {
        newInvoice.ledger._id = req.body.ledger._id;
    }
}
newInvoice.payer = {};

if (req.body.payer) {
    if (req.body.payer.relation) {
        newInvoice.payer.relation = req.body.payer.relation;
    }
    if (req.body.payer.label) {
        newInvoice.payer.label = req.body.payer.label;
    }
    if (req.body.payer._id) {
        newInvoice.payer._id = req.body.payer._id;
    }
    if (req.body.payer.mobile) {
      newInvoice.payer.mobile = req.body.payer.mobile;
    }
    
if (req.body.email) {
  newInvoice.payer.email = req.body.email;
}
    

if (req.body.address) {
  newInvoice.payer.billingAddress = req.body.address;
}
if (req.body.zip) {
  newInvoice.payer.zipCode = req.body.zip;
}
if (req.body.cityState.city) {
  newInvoice.payer.city = req.body.cityState.city;
}
if (req.body.cityState.state) {
  newInvoice.payer.state = req.body.cityState.state;
}
}


if (req.body.rows) {
    newInvoice.rows = [];
    for (let i = 0; i < req.body.rows.length; i++) {
        let rows = {};
        if (req.body.rows[i].item) {
            rows.item = {};
            if (req.body.rows[i].item._id) {
                rows.item._id = req.body.rows[i].item._id;
            }
            if (req.body.rows[i].item.label) {
                rows.item.label = req.body.rows[i].item.label;
            }
            if (req.body.rows[i].item.category) {
                rows.item.category = req.body.rows[i].item.category;
            }
            if (req.body.rows[i].item.issuedOn) {
                rows.item.issuedOn = req.body.rows[i].item.issuedOn;
            }
            if (req.body.rows[i].item.price) {
                rows.item.price = req.body.rows[i].item.price;
            }
            if (req.body.rows[i].item.qty) {
                rows.item.qty = req.body.rows[i].item.qty;
            }
            if (req.body.rows[i].item.amount) {
                rows.item.amount = req.body.rows[i].item.amount;
            }
            if (req.body.rows[i].item.taxPercent) {
                rows.item.taxPercent = req.body.rows[i].item.taxPercent;
            }
            if (req.body.rows[i].item.taxValue) {
                rows.item.taxValue = req.body.rows[i].item.taxValue;
            }
        }
        newInvoice.rows.push(rows);
    }
}
if (req.body.payment) {
    newInvoice.payment = req.body.payment;   
}
if (req.body.freight) {
    newInvoice.freight = req.body.freight;
}
if (req.body.discount) {
    newInvoice.discount = req.body.discount;
}
if (req.body.netAmount) {
    newInvoice.netAmount = req.body.netAmount;
}
if (req.body.paid) {
    newInvoice.paid = req.body.paid;
}
if (req.body.dues) {
    newInvoice.dues = req.body.dues;
}
  newInvoice.lastModified = new Date();
 
  return newInvoice;
}


const createVoucher = () => {
  const currentDate = new Date();
  
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');
  
  const identifier = Math.floor(Math.random() * 1000).toString().padStart(3, '0');// Replace this with your logic
  
  const uniqueId = `${year}${month}${day}${identifier}`;
  return uniqueId;
}

module.exports = router;
