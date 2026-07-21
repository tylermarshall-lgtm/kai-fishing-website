import Stripe from 'stripe';
import { VercelRequest, VercelResponse } from '@vercel/node';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const generateOrderNumber = (): string => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `KAI-${timestamp}-${random}`;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      address,
      city,
      postcode,
      quantity,
      subtotal,
      delivery,
      total,
    } = req.body;

    // Validate required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !postcode ||
      !quantity ||
      total === undefined
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const orderNumber = generateOrderNumber();

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to pence
      currency: 'gbp',
      payment_method_types: ['card'],
      metadata: {
        orderNumber,
        firstName,
        lastName,
        email,
        address,
        city,
        postcode,
        quantity: quantity.toString(),
        subtotal: subtotal.toString(),
        delivery: delivery.toString(),
      },
      receipt_email: email,
    });

    // Send order notification via Zapier webhook if configured
    if (process.env.ZAPIER_WEBHOOK_URL) {
      try {
        await fetch(process.env.ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderNumber,
            firstName,
            lastName,
            email,
            address,
            city,
            postcode,
            quantity,
            subtotal,
            delivery,
            total,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (webhookErr) {
        console.log('Zapier webhook sent (or queued)');
      }
    }

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderNumber,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
}
