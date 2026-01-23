import { useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function StripeForm({ amount, currency, apiBaseUrl }) {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handlePay = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      // 1) Demana al servidor un client_secret
      const r = await fetch(`${apiBaseUrl}/api/stripe/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data?.error || "Error creant PaymentIntent");

      // 2) Confirma pagament amb la targeta
      const card = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else if (result.paymentIntent?.status === "succeeded") {
        setMessage(`✅ Pagament Stripe completat! ID: ${result.paymentIntent.id}`);
      } else {
        setMessage(`ℹ️ Estat: ${result.paymentIntent?.status}`);
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h3>Stripe (targeta)</h3>
      <p><strong>Import:</strong> {amount} {currency}</p>

      <form onSubmit={handlePay}>
        <div style={{ padding: 12, border: "1px solid #ccc", borderRadius: 6 }}>
          <CardElement options={{ hidePostalCode: true }} />
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          style={{ marginTop: 12, padding: "10px 14px" }}
        >
          {processing ? "Processant..." : "Pagar amb Stripe"}
        </button>
      </form>

      <div style={{ marginTop: 12, fontSize: 12 }}>
        <p><strong>Targeta test:</strong> 4242 4242 4242 4242 · data futura · CVC qualsevol</p>
      </div>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}

export default function StripeCheckout({ amount, currency, apiBaseUrl }) {
  const options = useMemo(() => ({}), []);

  return (
    <Elements stripe={stripePromise} options={options}>
      <StripeForm amount={amount} currency={currency} apiBaseUrl={apiBaseUrl} />
    </Elements>
  );
}
