const express = require("express");
const cors = require("cors");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const stripe = require("stripe")("key");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => res.json("hello world"));

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:4242/success",
    cancel_url: "http://localhost:4242/cancel",
  });

  res.redirect(303, session.url);
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(5000, () => console.log("server running on 5000"));
