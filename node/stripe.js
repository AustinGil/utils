const secret = "sk_test_123";
const publishable = "pk_test_123";

const Stripe = require("stripe");
const stripeBackend = Stripe(secret);
const stripeFrontend = Stripe(publishable);
const elements = stripeFrontend.elements();

(async () => {
  const paymentIntent = await stripeBackend.paymentIntents.create({
    amount: 1,
    currency: "usd",
    // Verify your integration in this guide by including this parameter
    metadata: { integration_check: "accept_a_payment" }
    //   payment_method_types: ["card"],
    //   receipt_email: "jenny.rosen@example.com"
  });

  const { id, client_secret } = paymentIntent;

  // const elements = stripe.elements();

  const card = await stripeBackend.paymentMethods.create({
    type: "card",
    card: {
      number: "4242424242424242",
      exp_month: 3,
      exp_year: 2021,
      cvc: "314"
    }
  });

  const confirm = await stripeBackend.paymentIntents.confirm(id, {
    payment_method: "pm_card_visa"
  });
  // console.log(confirm);

  // stripe.confirmCardPayment(client_secret, {
  //   payment_method: {
  //     card: card,
  //     billing_details: {
  //       name: "Jenny Rosen"
  //     }
  //   }
  // });
})();
