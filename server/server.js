//replace it with your stipe test api key for taking it to porduction use Live key
const stripe = require("stripe")("sk_test_e0OC1qCHtKsHBhlelPBrxsAt00VzFAOP3C");
const express = require("express");
const app = express();
app.use(express.static("."));

const YOUR_DOMAIN = "http://localhost:3000/checkout";

app.post("/create-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Donation",
            images: ["https://i.imgur.com/EHyR2nP.png"],
          },
          unit_amount: 200,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });

  res.json({ id: session.id });
});

app.listen(4242, () => console.log("Running on port 4242"));
