import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PayPalCheckout({ amount, currency, apiBaseUrl }) {
  const [message, setMessage] = useState(null);

  const paypalOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID,
    currency,
    intent: "capture",
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h3>PayPal</h3>
      <p><strong>Import:</strong> {amount} {currency}</p>

      <PayPalScriptProvider options={paypalOptions}>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={async () => {
            setMessage(null);

            const r = await fetch(`${apiBaseUrl}/api/paypal/create-order`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount, currency }),
            });

            const data = await r.json();
            if (!r.ok) throw new Error(data?.error || "Error creant ordre PayPal");
            return data.orderID;
          }}
          onApprove={async (data) => {
            try {
              const r = await fetch(`${apiBaseUrl}/api/paypal/capture-order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderID: data.orderID }),
              });

              const resData = await r.json();
              if (!r.ok) throw new Error(resData?.error || "Error capturant ordre PayPal");

              const status = resData.details?.status;
              setMessage(`✅ Pagament PayPal capturat! Estat: ${status} · Order: ${data.orderID}`);
            } catch (err) {
              setMessage(err.message);
            }
          }}
          onError={(err) => setMessage(`❌ Error PayPal: ${err?.message || err}`)}
        />
      </PayPalScriptProvider>

      <div style={{ marginTop: 12, fontSize: 12 }}>
        <p>Per provar en Sandbox, inicia sessió amb el teu compte <em>Personal</em> de Sandbox.</p>
      </div>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
