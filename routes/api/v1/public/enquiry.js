const express = require("express");
const router = express.Router();

// Load Enquiry Model
const Enquiry = require("../../../../Models/Public/Enquiry");
const Prospect = require("../../../../Models/Private/Enquiry/Prospect");

// @type    POST
// @route   /api/v1/public/enquiry/
// @desc    Route for creating a new enquiry
// @access  Public
router.post("/", (req, res) => {
    if((!req.body.firstName && !req.body.name) || !(req.body.email || req.body.mobile)){
        res.json({
            message: "Name/Email and Mobile Number is Mandatory",
            variant: "error"
          })
    } 
    else {
// console.log(req.body)
  const newEnquiry = {

    
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.mobile,
    streetAddress: req.body.address,
    city: req.body.city,
    state: {},
    zipCode: req.body.zip,
    enquiryFor: req.body.enquiryFor,
    message: req.body.message,
    prospectSource:{
      label:"Website Form",
      id:"websiteForm"
    },
    prospectStage:{
      label:"Needs Assessment",
      id:"needsAssessment"
    },
  };
  if(req.body.state){
    if(req.body.state.id){
  newEnquiry.state.id = req.body.state.id;}
  if(req.body.state.label){
  newEnquiry.state.label = req.body.state.label;
}}
if(req.body.name){
  newEnquiry.firstName = req.body.name
}
Enquiry.findOne({
  firstName: req.body.name,
  email: req.body.email,
  mobile: req.body.mobile,
  address: req.body.address,
  city: req.body.city,
  zip: req.body.zip,
  enquiryFor: req.body.enquiryFor,
  marketing: req.body.marketing,
  message: req.body.message
})
.then(data => {
  if(!data){
  new Prospect(newEnquiry)
  .save()
    .then(() =>  res.json({
      message:"Your request has received. We will get back to you, Shortly.", 
      variant: "success" 
      }))
    .catch(err => console.log(err));
}else{
  res.json({
    message: "Duplicate Request",
    variant: "error"
  })
}})
.catch(err => console.log(err))

}
});

// @type    GET
// @route   /api/v1/public/enquiry/all
// @desc    Route to get all enquiries
// @access  Public
router.get("/all", (req, res) => {
  Enquiry.find()
    .sort({ date: -1 })
    .then(enquiries => res.json(enquiries))
    .catch(err => console.log(err));
});

// @type    GET
// @route   /api/v1/public/enquiry/:id
// @desc    Route to get a single enquiry by ID
// @access  Public
router.get("/:id", (req, res) => {
  Enquiry.findById(req.params.id)
    .then(enquiry => {
      if (!enquiry) {
        return res.status(404).json({ message: "Enquiry not found" });
      }
      res.json(enquiry);
    })
    .catch(err => console.log(err));
});

// @type    PUT
// @route   /api/v1/public/enquiry/:id
// @desc    Route to update/edit an enquiry
// @access  Public
router.put("/:id", (req, res) => {
  Enquiry.findById(req.params.id)
    .then(enquiry => {
      if (!enquiry) {
        return res.status(404).json({ message: "Enquiry not found" });
      }

      enquiry.name = req.body.name || enquiry.name;
      enquiry.email = req.body.email || enquiry.email;
      enquiry.mobile = req.body.mobile || enquiry.mobile;
      enquiry.address = req.body.address || enquiry.address;
      enquiry.city = req.body.city || enquiry.city;
      enquiry.state = req.body.state || enquiry.state;
      enquiry.zip = req.body.zip || enquiry.zip;
      enquiry.enquiryFor = req.body.enquiryFor || enquiry.enquiryFor;
      enquiry.marketing = req.body.marketing || enquiry.marketing;
      enquiry.message = req.body.message || enquiry.message;

      enquiry
        .save()
        .then(updatedEnquiry => res.json(updatedEnquiry))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// @type    DELETE
// @route   /api/v1/public/enquiry/:id
// @desc    Route to delete an enquiry
// @access  Public
router.delete("/:id", (req, res) => {
  Enquiry.findByIdAndRemove(req.params.id)
    .then(() => res.json({ success: true }))
    .catch(err => console.log(err));
});

module.exports = router;
