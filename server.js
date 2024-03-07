const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const passport = require("passport");
const upload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require('dotenv/config')
const cookieSession = require('cookie-session')

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//bring all routes
const fileupload = require("./routes/api/v1/other/fileupload");
//bring all routes
const passwordAuth = require("./routes/api/v1/auth/passwordAuth");
// main
const addSeat = require("./routes/api/v1/main/seat/addSeat");
const getSeat = require("./routes/api/v1/main/seat/getSeat");
  const addCareCat = require("./routes/api/v1/main/careCat/addCareCat");
  const getCareCat = require("./routes/api/v1/main/careCat/getCareCat");
// Addition
const addUser = require("./routes/api/v1/auth/addUser");
const enquiry = require("./routes/api/v1/public/enquiry");
// Enquiry
const addProspect = require("./routes/api/v1/enquiry/prospect/addProspect");
const getProspect = require("./routes/api/v1/enquiry/prospect/getProspect");
const moveToResidence = require("./routes/api/v1/enquiry/prospect/moveToResidence");
// ProspectSource
const addProspectSource = require("./routes/api/v1/enquiry/prospectSource/addProspectSource");
const getProspectSource = require("./routes/api/v1/enquiry/prospectSource/getProspectSource");
// Residence
const getResidence = require("./routes/api/v1/residence/getResidence");


// Health
const addHealth = require("./routes/api/v1/enquiry/health/addHealth");
const getHealth = require("./routes/api/v1/enquiry/health/getHealth");
// Contact
const addContact = require("./routes/api/v1/enquiry/contact/addContact");
const getContact = require("./routes/api/v1/enquiry/contact/getContact");
// Task
const addTask = require("./routes/api/v1/enquiry/task/addTask");
const getTask = require("./routes/api/v1/enquiry/task/getTask");
// Notes
const addNote = require("./routes/api/v1/enquiry/note/addNote");
const getNote = require("./routes/api/v1/enquiry/note/getNote");
// Compliance
const addCompliance = require("./routes/api/v1/enquiry/compliance/addCompliance");
const getCompliance = require("./routes/api/v1/enquiry/compliance/getCompliance");
// Employee
const addEmployee = require("./routes/api/v1/employee/basic/addEmployee");
const getEmployee = require("./routes/api/v1/employee/basic/getEmployee");
const addEmpLeave = require("./routes/api/v1/employee/empLeave/addEmpLeave");
const getEmpLeave = require("./routes/api/v1/employee/empLeave/getEmpLeave");
const empLeaveTable = require("./routes/api/v1/employee/empLeave/empLeaveTable");
// Dashboard
const getDashboard = require("./routes/api/v1/dashboard/getDashboard");

// Document validation
const addDocument = require("./routes/api/v1/employee/document/addDocument");
const getDocument = require("./routes/api/v1/employee/document/getDocument");
// Document validation
const addProfile = require("./routes/api/v1/employee/profile/addProfile");
const getProfile = require("./routes/api/v1/employee/profile/getProfile");
//Residence 
const addResMed = require("./routes/api/v1/residence/resMed/addResMed");
const getResMed = require("./routes/api/v1/residence/resMed/getResMed");
const addResCare = require("./routes/api/v1/residence/resCare/addResCare");
const getResCare = require("./routes/api/v1/residence/resCare/getResCare");
const addLeave = require("./routes/api/v1/residence/leave/addLeave");
const getLeave = require("./routes/api/v1/residence/leave/getLeave");
const getPayerType = require("./routes/api/v1/residence/payerType/getPayerType");
const addRecPayment = require("./routes/api/v1/residence/recPayment/addRecPayment");
const getRecPayment = require("./routes/api/v1/residence/recPayment/getRecPayment");
const addInvoice = require("./routes/api/v1/residence/invoice/addInvoice");
const getInvoice = require("./routes/api/v1/residence/invoice/getInvoice");


// Account
const addGroup = require("./routes/api/v1/account/group/addGroup");
const getGroup = require("./routes/api/v1/account/group/getGroup");
const addLedger = require("./routes/api/v1/account/ledger/addLedger");
const getLedger = require("./routes/api/v1/account/ledger/getLedger");
const addPayment = require("./routes/api/v1/account/payment/addPayment");
const getPayment = require("./routes/api/v1/account/payment/getPayment");
const addReceipt = require("./routes/api/v1/account/receipt/addReceipt");
const getReceipt = require("./routes/api/v1/account/receipt/getReceipt");
const getReport = require("./routes/api/v1/account/report/getReport");
//

// Access



// Common
const addComplianceDocs = require("./routes/api/v1/common/complianceDocs/addComplianceDocs");
const getComplianceDocs = require("./routes/api/v1/common/complianceDocs/getComplianceDocs");
// FilterTag
const addFilterTag = require("./routes/api/v1/publicMaster/filterTag/addFilterTag");
const getFilterTag = require("./routes/api/v1/publicMaster/filterTag/getFilterTag");
// Public Master
const addMyClass = require("./routes/api/v1/publicMaster/myClass/addMyClass");
const getMyClass = require("./routes/api/v1/publicMaster/myClass/getMyClass");
// Public Master
const addMockTest = require("./routes/api/v1/publicMaster/mockTest/addMockTest");
const getMockTest = require("./routes/api/v1/publicMaster/mockTest/getMockTest");




//passport 
// const passport = require("./services/passport")
const app = express();
//cookie
app.use(cookieSession({
  maxAge:24*60*60*1000,
  keys:['akjsdfkjk']
}))

//initialise passport
app.use(passport.initialize());
app.use(passport.session());

app.use(upload({ useTempFiles: true }));
app.use(cors());

//Middleware for bodyparser
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyparser.json({limit: "50mb"}));
app.use(express.static(path.join(__dirname, "client/build")))


//mongoDB configuration
const db = require("./setup/myurl").mongoURL;

//Attempt to connect to database
mongoose
  .connect(db , { useFindAndModify: false, useNewUrlParser: true , useUnifiedTopology: true} )
  .then(() => console.log(" MongoDB connected successfully"))
  .catch(err => console.log(err));

  //import Models
  require("./Models/User")

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./strategies/jsonwtStrategy")(passport);
require('./services/passport')


//actual routes
app.use("/api/v1/other/fileupload", fileupload);

//actual routes
app.use("/api/v1/auth/passwordAuth", passwordAuth);
// main
app.use("/api/v1/main/seat/addSeat", addSeat);
app.use("/api/v1/main/seat/getSeat", getSeat);
// Addition
app.use("/api/v1/auth/addUser", addUser);
app.use("/api/v1/public/enquiry", enquiry);
app.use("/api/v1/enquiry/prospect/moveToResidence", moveToResidence);
// Enquiry
app.use("/api/v1/enquiry/prospect/addProspect", addProspect);
app.use("/api/v1/enquiry/prospect/getProspect", getProspect);
// ProspectSource
app.use("/api/v1/enquiry/prospectSource/addProspectSource", addProspectSource);
app.use("/api/v1/enquiry/prospectSource/getProspectSource", getProspectSource);

//Dashboard
app.use("/api/v1/dashboard/getDashboard", getDashboard);
// Residence
app.use("/api/v1/residence/getResidence", getResidence);
app.use("/api/v1/residence/leave/addLeave", addLeave);
app.use("/api/v1/residence/leave/getLeave", getLeave);
app.use("/api/v1/residence/payerType/getPayerType", getPayerType);

// Health
app.use("/api/v1/enquiry/health/addHealth", addHealth);
app.use("/api/v1/enquiry/health/getHealth", getHealth);
// Contact
app.use("/api/v1/enquiry/contact/addContact", addContact);
app.use("/api/v1/enquiry/contact/getContact", getContact);
// Task
app.use("/api/v1/enquiry/task/addTask", addTask);
app.use("/api/v1/enquiry/task/getTask", getTask);
// Notes
app.use("/api/v1/enquiry/note/addNote", addNote);
app.use("/api/v1/enquiry/note/getNote", getNote);
// Compliance
app.use("/api/v1/enquiry/compliance/addCompliance", addCompliance);
app.use("/api/v1/enquiry/compliance/getCompliance", getCompliance);
// Employee
app.use("/api/v1/employee/basic/addEmployee", addEmployee);
app.use("/api/v1/employee/basic/getEmployee", getEmployee);
// Employee leave
app.use("/api/v1/employee/empLeave/addEmpLeave", addEmpLeave);
app.use("/api/v1/employee/empLeave/getEmpLeave", getEmpLeave);
app.use("/api/v1/employee/empLeave/empLeaveTable", empLeaveTable);
// Document validation
app.use("/api/v1/employee/document/addDocument", addDocument);
app.use("/api/v1/employee/document/getDocument", getDocument);
// profilen
app.use("/api/v1/employee/profile/addProfile", addProfile);
app.use("/api/v1/employee/profile/getProfile", getProfile);
// residence 
app.use("/api/v1/residence/resMed/addResMed", addResMed);
app.use("/api/v1/residence/resMed/getResMed", getResMed);

app.use("/api/v1/residence/invoice/addInvoice", addInvoice);
app.use("/api/v1/residence/invoice/getInvoice", getInvoice);

app.use("/api/v1/residence/recPayment/addRecPayment", addRecPayment);
app.use("/api/v1/residence/recPayment/getRecPayment", getRecPayment);

app.use("/api/v1/residence/resCare/addResCare", addResCare);
app.use("/api/v1/residence/resCare/getResCare", getResCare);
  // care cat
app.use("/api/v1/main/careCat/addCareCat", addCareCat);
app.use("/api/v1/main/careCat/getCareCat", getCareCat);

// Account
app.use("/api/v1/account/group/addGroup", addGroup);
app.use("/api/v1/account/group/getGroup", getGroup);
app.use("/api/v1/account/ledger/addLedger", addLedger);
app.use("/api/v1/account/ledger/getLedger", getLedger);
app.use("/api/v1/account/payment/addPayment", addPayment);
app.use("/api/v1/account/payment/getPayment", getPayment);
app.use("/api/v1/account/receipt/addReceipt", addReceipt);
app.use("/api/v1/account/receipt/getReceipt", getReceipt);
app.use("/api/v1/account/report/getReport", getReport);


// Common
app.use("/api/v1/common/complianceDocs/addComplianceDocs", addComplianceDocs);
app.use("/api/v1/common/complianceDocs/getComplianceDocs", getComplianceDocs);
// FilterTag
app.use("/api/v1/filterTag/addFilterTag", addFilterTag);
app.use("/api/v1/filterTag/getFilterTag", getFilterTag);
// Public Master
app.use("/api/v1/publicMaster/myClass/addMyClass", addMyClass);
app.use("/api/v1/publicMaster/myClass/getMyClass", getMyClass);
app.use("/api/v1/publicMaster/mockTest/addMockTest", addMockTest);
app.use("/api/v1/publicMaster/mockTest/getMockTest", getMockTest);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(
    err
  ) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const port = process.env.PORT || 2040;

app.listen(port, () => console.log(` App is running at ${port}`));

