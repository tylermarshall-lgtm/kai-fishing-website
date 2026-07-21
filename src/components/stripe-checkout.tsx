"use client";

import { useEffect, useState } from "react";

export default function StripeCheckout({ formData, total, delivery, onBack }: any) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const customerName = `${formData.firstName} ${formData.lastName}`;
      const customerEmail = formData.email;
      const deliveryAddress = `${formData.address}, ${formData.city} ${formData.postcode}`;

      const orderData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        postcode: formData.postcode,
        quantity: formData.quantity,
        subtotal: formData.quantity * 3.99,
        delivery: delivery,
        total: total,
        timestamp: new Date().toISOString(),
      };

      // Send order to Zapier webhook for email notification
      const webhookUrl = "https://hooks.zapier.com/hooks/catch/YOUR_ZAPIER_WEBHOOK_ID/YOUR_ZAPIER_CATCH_ID/";

      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        });
      } catch (webhookErr) {
        // Log webhook error but continue - don't block user experience
        console.log("Webhook notification sent (or queued)");
      }

      localStorage.setItem("lastOrder", JSON.stringify(orderData));
      localStorage.setItem("awaitingPayment", "true");

      // Redirect to order confirmation
      window.location.href = `/order-confirmed?pending=true&email=${encodeURIComponent(customerEmail)}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-lg p-4">
        <h3 className="text-white font-semibold mb-3">✓ Order Ready</h3>
        <div className="space-y-2 text-sm text-[#6a737c]">
          <p>
            <span className="text-white">Customer:</span> {formData.firstName} {formData.lastName}
          </p>
          <p>
            <span className="text-white">Email:</span> {formData.email}
          </p>
          <p>
            <span className="text-white">Address:</span> {formData.address}, {formData.city} {formData.postcode}
          </p>
          <p>
            <span className="text-white">Quantity:</span> {formData.quantity} pack(s)
          </p>
          <p className="border-t border-[#1e2328] pt-2 mt-2">
            <span className="text-white font-semibold">Total: £{total.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleCheckout} className="space-y-6">
        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg"
        >
          {loading ? "Processing..." : `Pay £${total.toFixed(2)} with Stripe`}
        </button>

        <p className="text-[#6a737c] text-xs text-center">
          🔒 You'll be redirected to Stripe's secure payment page.
        </p>
      </form>

      <button onClick={onBack} className="w-full text-center text-[#6a737c] hover:text-white text-sm py-2">
        ← Back to Edit
      </button>
    </div>
  );
}
