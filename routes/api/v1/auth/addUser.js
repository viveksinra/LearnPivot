const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

// Load AddEmployee Model
const AddEmployee = require("../../../../Models/User");
// /api/v1/auth/addUser/check
router.get("/check",(req,res)=>{
console.log("i am ")
  res.send("I am working")
})
// @type    POST
// @route   /api/v1/addition/addemployee
// @desc    Create a new employee
// @access  Public
router.post("/", 
// passport.authenticate("jwt", { session: false }), 
async (req, res) => {
  var des = "admin";
  // var des = req.user.designation;
  var des1 = "admin";
  var des2 = "manager";

  if (des == des1 || des == des2) {
    // Check if the required fields are present
    if ( !req.body.mobile || !req.body.email || !req.body.password ) {
      return res.json({
        message: "email/mobile and password is required are required fields.",
        variant: "error"
      });
    }
    const newUser = {
      // user:req.user.id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      mobile: req.body.mobile,
      userImage: req.body.userImage,
      userName:req.body.userName || req.body.mobile,
      password:req.body.password,
      jobRole:{
        label:req.body.jobRole.label,
        id:req.body.jobRole.id
      }
    };
 //make value
var val1 = req.body.password
newUser.value = right_three(val1)
     // Encrypt Password using bcrypt
 // Encrypt Password using bcrypt
bcrypt.genSalt(10, (err, salt) => {
  if (err) {
    console.error("Error generating salt:", err);
    return res.status(500).json({
      message: "Internal Server Error",
      variant: "error"
    });
  }

  // Check if newUser.password is defined
  if (newUser.password) {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return res.status(500).json({
          message: "Internal Server Error",
          variant: "error"
        });
      }

      newUser.password = hash;
     new User(newUser)
        .save()
        .then((user) =>
          res.json({
            message: "Congratulations! Your Account is Successfully Created ",
            variant: "success"
          })
        )
        .catch((err) =>
          res.status(404).json({
            message: "Problem in saving",
            variant: "error"
          } + err)
        );
    });
  } else {
    // Handle the case where newUser.password is undefined
    return res.status(400).json({
      message: "Invalid password",
      variant: "error"
    });
  }
});



  } else {
    res.json({
      message: "You are not authorized.",
      variant: "error"
    });
  }
});

function right_three(str) {
    if (str.length > 1)
      {
        var text = "";
  var char_list = "abcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0; i < 5; i++ )
  {  
  text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  }
  var k = str.slice(-3) + text + str.slice(0, -3);
        return k
      }
  return str;
  }
// @type    GET
// @route   /api/v1/addition/addemployee/:id
// @desc    Get an employee by ID
// @access  Public
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findById(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// @type    GET
// @route   /api/v1/addition/addemployee
// @desc    Get all employees
// @access  Public
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.find()
    .then(employees => res.json(employees))
    .catch(err => console.log(err));
});

// @type    PUT
// @route   /api/v1/addition/addemployee/:id
// @desc    Update an employee by ID
// @access  Public
router.put("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    })
    .catch(err => console.log(err));
});

// @type    DELETE
// @route   /api/v1/addition/addemployee/:id
// @desc    Delete an employee by ID
// @access  Public
router.delete("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  AddEmployee.findByIdAndRemove(req.params.id)
    .then(employee => {
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json({ message: "Employee deleted successfully" });
    })
    .catch(err => console.log(err));
});

module.exports = router;