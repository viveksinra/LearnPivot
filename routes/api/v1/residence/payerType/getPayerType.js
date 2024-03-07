const express = require("express");
const router = express.Router();
const passport = require("passport");
const Contact = require("../../../../../Models/Private/Enquiry/Contact");


// @type    GET
// @route   /api/v1/residence/payerType/getPayerType/getAll
// @desc    Get a prospect by ID
// @access  Public
router.get(
    "/getAll",
    // passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      try {
        let payerType = [
            {label:"Private",
            id:"private"
            },
          
        ]
        res.status(200).json({ variant: "success", message: "Type Loaded", data: payerType.reverse() });
      } catch (error) {
        console.log(error)
        res
          .status(500)
          .json({ 
            variant: "error", 
            message: "Internal server error" + error.message});
      }
    }
  );

   // @type    GET
  // @route   /api/v1/residence/payerType/getPayerType/getPayer/:prospectId/:payerTypeId
  // @desc    Get Payer with Type
  // @access  Public
  router.get(
    "/getPayer/:prospectId/:payerTypeId",
    // passport.authenticate("jwt", { session: false }),
    async (req, res) => {
  
      try {
  if(req.params.payerTypeId == "private"){
        const myData = await Contact.find({ prospectId: req.params.prospectId })
  
        const modifiedData = myData.map(contact => ({
          _id:contact._id,
          label:contact.firstName + " "+ contact.lastName,
          relation: contact.relation.label,
          gender: contact.gender.label,
          contactImage: contact.contactImage,
        }));
        modifiedData.push({
          _id:"60f98cef90051e32b7ed59bd",
          label:"Self",
          relation: "Self",
          gender: "Self",
          contactImage: "",
        })

        res
          .status(200)
          .json({ variant: "success", message: "Contact Loaded", data: modifiedData });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ variant: "error", message: "Internal server error" + error.message});
      }
    }
  );

  // @type    GET
// @route   /api/v1/residence/payerType/getPayerType/getBillItem/getAll
// @desc    Get a prospect by ID
// @access  Public
router.get(
  "/getBillItem/getAll",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let BillingItem = [
          {
            label:"Rent 1 - Shared Bed Room",
             _id:"60f98cef90051e32b7ed59bd",
             category:"rent",
             price:"500"
          },
          {
            label:"Rent 2 - Single Bed Room",
             _id:"60f98cef90051e32b7ed39bd",
             category:"rent",
             price:"300"
          },
          {
            label:"Care 1 - Little care",
             _id:"60f98cef90051e32b7ed19bd",
             category:"care",
             price:"500"
          },
          {
            label:"Care 2 - Little care",
             _id:"60f98cef90051e32b7ed29bd",
             category:"care",
             price:"300"
          },
      ]
      res.status(200).json({ variant: "success", message: "Type Loaded", data: BillingItem.reverse() });
    } catch (error) {
      console.log(error)
      res
        .status(500)
        .json({ 
          variant: "error", 
          message: "Internal server error" + error.message});
    }
  }
);

  module.exports = router;