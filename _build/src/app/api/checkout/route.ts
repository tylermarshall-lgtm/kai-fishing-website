import { NextRequest, NextResponse } from "next/server";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_PRODUCT_ID = "prod_UvbUDyeXYInrX7";
const STRIPE_PRICE_ID = "price_1TvkHo2fkchpRrbQe6v5uwVG";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      address,
      city,
      postcode,
      quantity,
      total,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !address || !city || !postcode || !quantity || !total) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!STRIPE_SECRET_KEY) {
      console.error("Stripe API key not configured");
      return NextResponse.json(
        { error: "Payment processing unavailable" },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const params = new URLSearchParams();
    params.append("line_items[0][price]", STRIPE_PRICE_ID);
    params.append("line_items[0][quantity]", quantity.toString());
    params.append("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    params.append("shipping_options[0][shipping_rate_data][fixed_amount][amount]", "250");
    params.append("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "gbp");
    params.append("shipping_options[0][shipping_rate_data][display_name]", "UK Delivery (2-3 days)");
    params.append("mode", "payment");
    params.append("success_url", `${request.headers.get("origin")}/order-confirmed?session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${request.headers.get("origin")}/checkout`);
    params.append("customer_email", email);
    params.append("shipping_address_collection[allowed_countries][]", "GB");
    params.append("metadata[firstName]", firstName);
    params.append("metadata[lastName]", lastName);
    params.append("metadata[address]", address);
    params.append("metadata[city]", city);
    params.append("metadata[postcode]", postcode);

    const checkoutSessionResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const checkoutSession = await checkoutSessionResponse.json();

    if (!checkoutSessionResponse.ok) {
      throw new Error(checkoutSession.error?.message || "Failed to create checkout session");
    }

    return NextResponse.json({
      url: checkoutSession.url,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
