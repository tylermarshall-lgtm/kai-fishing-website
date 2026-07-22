"use client";

import { useState, useEffect } from "react";

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
  const [error, setError] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const subtotal = formData.quantity * 3.99;
  const delivery = formData.quantity >= 2 ? 0 : 1.99;
  const total = subtotal + delivery;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? parseInt(value) || 1 : value,
    }));
  };

  const handleQuantityChange = (qty: number) => {
    setFormData((prev) => ({ ...prev, quantity: Math.max(1, qty) }));
  };

  const handlePayment = async () => {
    setStage("processing");
    setError(null);

    try {
      // Generate order number
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      const newOrderNumber = `KAI-${timestamp}-${random}`;
      setOrderNumber(newOrderNumber);

      // Create Stripe Checkout Session
      const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer pk_live_51QJz5xFfTIVYvBYPt7K6L7M8N9o0P1Q2r3S4t5U6V7W8x9Y0z1A2b3C4d5E`,
        },
        body: new URLSearchParams({
          "line_items[0][price_data][currency]": "gbp",
          "line_items[0][price_data][product_data][name]": "Kai Lead Clip Action Pack",
          "line_items[0][price_data][unit_amount]": "399",
          "line_items[0][quantity]": formData.quantity.toString(),
          "line_items[1][price_data][currency]": "gbp",
          "line_items[1][price_data][product_data][name]": "Delivery",
          "line_items[1][price_data][unit_amount]": Math.round(delivery * 100).toString(),
          "line_items[1][quantity]": "1",
          customer_email: formData.email,
          "metadata[orderNumber]": newOrderNumber,
          "metadata[firstName]": formData.firstName,
          "metadata[lastName]": formData.lastName,
          "metadata[address]": formData.address,
          "metadata[city]": formData.city,
          "metadata[postcode]": formData.postcode,
          "metadata[quantity]": formData.quantity.toString(),
          mode: "payment",
          success_url: `https://www.kaifishingco.co.uk/order-confirmed?orderNumber=${newOrderNumber}&status=success`,
          cancel_url: `https://www.kaifishingco.co.uk/products`,
        }).toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();
      if (session.url) {
        window.location.href = session.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment processing failed");
      setStage("review");
    }
  };

  if (stage === "processing") {
    return (
      <div className="bg-blue-500/10 border border-blue-500/25 rounded-xl p-6">
        <p className="text-blue-400 font-semibold mb-2">Processing...</p>
        <p className="text-[#6a737c] text-sm">Redirecting to Stripe secure payment...</p>
      </div>
    );
  }

  if (stage === "review") {
    return (
      <div className="space-y-6">
        <div className="space-y-4 bg-[#0a0c0e] p-6 rounded-xl border border-[#1e2328]">
          <h4 className="text-white font-semibold">Order Summary</h4>
          <div className="space-y-2 text-sm text-[#6a737c]">
            <p>
              <span className="text-white">Customer:</span> {formData.firstName} {formData.lastName}
            </p>
            <p>
              <span className="text-white">Email:</span> {formData.email}
            </p>
            <p>
              <span className="text-white">Address:</span> {formData.address}, {formData.city}{" "}
              {formData.postcode}
            </p>
            <p>
              <span className="text-white">Quantity:</span> {formData.quantity} pack(s)
            </p>
          </div>

          <div className="border-t border-[#1e2328] pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-[#6a737c]">
              <span>Subtotal</span>
              <span>£{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[#6a737c]">
              <span>Delivery {formData.quantity >= 2 ? "(FREE)" : ""}</span>
              <span>£{delivery.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white font-semibold border-t border-[#1e2328] pt-2">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/25 text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handlePayment}
          className="w-full bg-[#4a7ab5] hover:bg-[#5a8ac5] text-white py-3 rounded-lg font-semibold transition-colors"
        >
          Proceed to Stripe Payment
        </button>

        <button
          onClick={() => setStage("form")}
          className="w-full bg-transparent border border-[#1e2328] hover:border-[#4a7ab5] text-[#4a7ab5] py-3 rounded-lg font-semibold transition-colors"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStage("review");
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-[#6a737c] mb-2">
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-[#6a737c] mb-2">
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#6a737c] mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleInputChange}
          className="w-full bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-[#6a737c] mb-2">
          Street Address *
        </label>
        <input
          type="text"
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleInputChange}
          className="w-full bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-[#6a737c] mb-2">
            City/Town *
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={formData.city}
            onChange={handleInputChange}
            className="w-full bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="postcode" className="block text-sm font-medium text-[#6a737c] mb-2">
            Postcode *
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            required
            value={formData.postcode}
            onChange={handleInputChange}
            className="w-full bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white placeholder-[#3a4048] focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#6a737c] mb-3">Quantity *</label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleQuantityChange(formData.quantity - 1)}
            className="bg-[#1e2328] hover:bg-[#252b31] text-white px-4 py-2 rounded-lg transition-colors"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleInputChange}
            name="quantity"
            className="flex-1 bg-[#0a0c0e] border border-[#252b31] rounded-lg px-4 py-2 text-white text-center focus:outline-none focus:border-[#4a7ab5] transition-colors"
          />
          <button
            type="button"
            onClick={() => handleQuantityChange(formData.quantity + 1)}
            className="bg-[#1e2328] hover:bg-[#252b31] text-white px-4 py-2 rounded-lg transition-colors"
          >
            +
          </button>
        </div>
      </div>

      <div className="bg-[#0a0c0e] p-4 rounded-lg border border-[#1e2328]">
        <div className="flex justify-between text-[#6a737c] mb-2">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#6a737c] mb-3">
          <span>Delivery {formData.quantity >= 2 ? "(FREE)" : ""}</span>
          <span>£{delivery.toFixed(2)}</span>
        </div>
        <div className="border-t border-[#1e2328] pt-2 flex justify-between text-white font-semibold">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#4a7ab5] hover:bg-[#5a8ac5] text-white py-3 rounded-lg font-semibold transition-colors"
      >
        Review Order
      </button>
    </form>
  );
}
