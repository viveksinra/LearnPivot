const stripe = require("stripe")('sk_test_26PHem9AhJZvU623DfE1x4sd');
const express = require("express");
const router = express.Router();
const passport = require("passport");
const BuyCourse = require("../../../../../Models/Private/PublicMaster/BuyCourse");

// @type    POST
// @route   /api/v1/publicMaster/stripePayment/stripePay
// @desc    Create a new MockTest
// @access  Public
router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {
      try {
          await PayStripeFun(req, res);
      } catch (error) {
          console.error("Error in /api/v1/publicMaster/stripePayment/stripePay:", error);
          res.status(500).json({ variant: "error", message: "Internal server error" });
      }
  }
);

const calculateOrderAmount = async (submittedId) => {
  try {
      const data = await BuyCourse.findOne({_id:submittedId}).catch(err => console.log(err));
      return data; 
  } catch (error) {
      console.error("Error in calculateOrderAmount:", error);
      throw new Error("Error calculating order amount");
  }
};

const PayStripeFun = async (req, res) => {
  try {
      const { items } = req.body;
      const submittedId = items[0].id;

      // Retrieve order amount from the database
      const orderData = await calculateOrderAmount(submittedId);
      const orderAmount = orderData.amount 

      // Ensure orderAmount is a number and greater than 0
      if (typeof orderAmount !== 'number' || isNaN(orderAmount) || orderAmount <= 0) {
          throw new Error("Invalid order amount retrieved from the database");
      }

      // Convert orderAmount to cents/pence for GBP
      const amountInCents = Math.round(orderAmount * 100);

      // Check if the amount is at least £0.30 GBP (30 pence)
      if (amountInCents < 30) {
          throw new Error("Order amount must be at least £0.30 GBP");
      }

      // Create payment intent with Stripe
      const paymentIntent = await stripe.paymentIntents.create({
          amount: amountInCents,
          currency: "gbp",
          type:"BuyCourse",
          courseId:submittedId
          // automatic_payment_methods: { enabled: true }, // Optional
      });

      // Send client secret back to the client
      res.json({
          message: "Secret loaded",
          variant: "success",
          clientSecret: paymentIntent.client_secret,
      });
  } catch (error) {
      console.error("Error in PayStripeFun:", error);
      res.status(500).json({ variant: "error", message: "Internal server error" });
  }
};

router.post(
  "/webhook/stripe",
  // passport.authenticate("jwt", { session: false }),
  async (req, res) => {

    
  })

module.exports = router;

