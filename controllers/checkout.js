const stripe = require("stripe")("sk_test_51LORdbJOV72oSMERs7LcCgspcFMBZkGMosyh2b1zJtHTa8NLYJECO28AmuJq9974NSGmLHFfwUhBMIKrne1bLzvE00L80UmJF5");

// ADD PAYMENT
exports.addPayment = async (req, res) => {
    stripe.charges.create(
        {
          source: req.body.tokenId,
          amount: req.body.amount,
          currency: "usd",
        },
        (stripeErr, stripeRes) => {
          if (stripeErr) {
            res.status(500).json(stripeErr);
          } else {
            res.status(200).json(stripeRes);
          }
        }
      );
};