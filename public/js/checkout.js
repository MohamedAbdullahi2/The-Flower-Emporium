// require('dotenv').config();

const checkoutButton = document.getElementById('checkout-btn');

checkoutButton.addEventListener('click', async () => {
  const response = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId: 't-shirt',
      quantity: 1,
    }),
  });

  const session = await response.json();

  const stripe = Stripe('YOUR_STRIPE_PRIVATE_KEY');
  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.error(result.error.message);
  }
});
