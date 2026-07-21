"use client";

import { useState } from "react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  quantity: number;
}

export default function CheckoutForm() {
  const [stage, setStage] = useState<"form" | "review" | "processing">("form");
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    quantity: 1,
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subtotal = formData.quantity * 3.99;
  const delivery = formData.quantity >= 2 ? 0 : 1.99;
  const total = subtotal + delivery;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.postcode) {
      alert("Please fill in all fields");
      return;
    }
    setStage("review");
  };

  const handlePayment = async () => {
    setProcessing(true);
    setError(null);

    try {
      // Call Vercel backend to create payment intent and send webhooks
      const apiUrl = process.env.NODE_ENV === 'production'
        ? 'https://kai-clearance.sintra.site/api/create-payment-intent'
        : 'http://localhost:3000/api/create-payment-intent';

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          postcode: formData.postcode,
          quantity: formData.quantity,
          subtotal: parseFloat(subtotal.toFixed(2)),
          delivery: parseFloat(delivery.toFixed(2)),
          total: parseFloat(total.toFixed(2)),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create payment intent");
      }

      const { clientSecret, orderNumber } = await response.json();

      // Redirect to order confirmation with order details
      const params = new URLSearchParams({
        orderNumber,
        clientSecret,
        firstName: formData.firstName,
        email: formData.email,
        total: total.toFixed(2),
      });
      window.location.href = `/order-confirmed?${params.toString()}`;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment setup failed");
      setProcessing(false);
    }
  };

  if (stage === "review") {
    return (
      <div className="space-y-6">
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-lg p-6">
          <h3 className="text-white font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm text-[#6a737c]">
            <p>
              <span className="text-white">Name:</span> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <span className="text-white">Email:</span> {formData.email}
            </p>
            <p>
              <span className="text-white">Address:</span> {formData.address}
            </p>
            <p>
              <span className="text-white">City:</span> {formData.city} {formData.postcode}
            </p>
            <p>
              <span className="text-white">Quantity:</span> {formData.quantity} pack(s)
            </p>
            <div className="border-t border-emerald-500/25 pt-3 mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-[#6a737c]">Subtotal</span>
                <span className="text-[#6a737c]">£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-[#6a737c]">Delivery</span>
                <span className={delivery === 0 ? "text-emerald-400" : "text-[#6a737c]"}>
                  {delivery === 0 ? "FREE" : `£${delivery.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between font-bold text-white">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-lg text-sm">{error}</div>}

        <button
          onClick={handlePayment}
          disabled={processing}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
        >
          {processing ? "Processing..." : `Proceed to Payment — £${total.toFixed(2)}`}
        </button>

        <button
          onClick={() => setStage("form")}
          className="w-full text-center text-[#6a737c] hover:text-white text-sm py-2"
        >
          ← Back to Edit
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-white text-sm font-semibold mb-3">Quantity (Packs of 5)</label>
        <select
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} pack{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="border-t border-[#1e2328] pt-6">
        <p className="text-white font-semibold text-sm mb-4">Delivery Details</p>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600 placeholder-[#4a5058]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600 placeholder-[#4a5058]"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full mt-4 bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600 placeholder-[#4a5058]"
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full mt-4 bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600 placeholder-[#4a5058]"
        />

        <div className="grid grid-cols-2 gap-4 mt-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600 placeholder-[#4a5058]"
          />
          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            value={formData.postcode}
            onChange={handleChange}
            required
            className="bg-[#0d0f11] border border-[#1e2328] text-white px-4 py-2 rounded-lg focus:outline-none focus:border-emerald-600 placeholder-[#4a5058]"
          />
        </div>
      </div>

      <div className="border-t border-[#1e2328] pt-6 space-y-3">
        <div className="flex justify-between text-[#6a737c] text-sm">
          <span>Subtotal ({formData.quantity} pack{formData.quantity > 1 ? "s" : ""})</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6a737c]">UK Delivery</span>
          <span className={delivery === 0 ? "text-emerald-400 font-semibold" : "text-[#6a737c]"}>
            {delivery === 0 ? "FREE" : `£${delivery.toFixed(2)}`}
          </span>
        </div>
        {formData.quantity >= 2 && <p className="text-emerald-400 text-xs pt-2">✓ Free shipping on 2+ packs!</p>}
        <div className="flex justify-between text-white font-bold text-lg border-t border-[#1e2328] pt-3">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>

      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
        Review Order & Proceed to Payment
      </button>

      <p className="text-[#6a737c] text-xs text-center">
        🔒 Secure payment via Stripe
      </p>
    </form>
  );
}
