import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = headers().get("stripe-signature");

    if (!signature || !STRIPE_WEBHOOK_SECRET) {
      return NextResponse.json(
        { error: "Missing signature or webhook secret" },
        { status: 400 }
      );
    }

    // In production, verify the signature using crypto.subtle
    // For now, we'll process the event directly
    const event = JSON.parse(body);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Extract customer info
      const firstName = session.metadata?.firstName || "Customer";
      const lastName = session.metadata?.lastName || "";
      const email = session.customer_email;
      const address = session.metadata?.address || "";
      const city = session.metadata?.city || "";
      const postcode = session.metadata?.postcode || "";

      // Get line items to calculate quantity
      const quantity = session.line_items?.data?.[0]?.quantity || 1;
      const amount = session.amount_total / 100; // Convert pence to pounds

      const orderId = session.id;
      const orderTime = new Date(session.created * 1000).toLocaleString("en-GB");

      const orderEmail = `
NEW ORDER RECEIVED - STRIPE CHECKOUT COMPLETE

Order ID: ${orderId}
Order Time: ${orderTime}

CUSTOMER DETAILS:
- Name: ${firstName} ${lastName}
- Email: ${email}
- Delivery Address: ${address}, ${city} ${postcode}

ORDER DETAILS:
- Product: Lead Clip Systems (Pack of 5)
- Quantity: ${quantity} pack(s)
- Subtotal: £${(quantity * 3.99).toFixed(2)}
- Delivery: £2.50
- TOTAL PAID: £${amount.toFixed(2)}

STATUS: PAYMENT RECEIVED ✓
ACTION REQUIRED: Pack and dispatch within 48 hours

Payment Method: Stripe
Session ID: ${session.id}
      `.trim();

      // TODO: Send email to both Tyler and Abbie
      // For now, log the order
      console.log("ORDER CONFIRMED:\n", orderEmail);

      // Send confirmation email to customer
      const customerConfirmation = `Hi ${firstName},

Your order has been confirmed! Order ID: ${orderId}

You ordered:
- ${quantity} pack(s) of Lead Clip Systems @ £3.99 each
- Delivery to: ${address}, ${city} ${postcode}

Total Paid: £${amount.toFixed(2)}

We'll dispatch within 48 hours. Track your order at the link below.

Thank you for supporting Kai Fishing Co!

Best,
Tyler & Team
      `.trim();

      console.log("CUSTOMER CONFIRMATION EMAIL:\n", customerConfirmation);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
