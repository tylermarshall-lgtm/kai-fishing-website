export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { firstName, lastName, email, address, city, postcode, quantity, subtotal, delivery, total } = req.body;

    if (!firstName || !lastName || !email || !address || !city || !postcode || !quantity || total === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const orderNumber = `KAI-${timestamp}-${random}`;

    // Call Stripe API directly
    const stripeUrl = 'https://api.stripe.com/v1/payment_intents';
    const stripeAuth = Buffer.from(`${process.env.STRIPE_SECRET_KEY}:`).toString('base64');

    const stripeResponse = await fetch(stripeUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${stripeAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: Math.round(total * 100).toString(),
        currency: 'gbp',
        'payment_method_types[]': 'card',
        'metadata[orderNumber]': orderNumber,
        'metadata[firstName]': firstName,
        'metadata[lastName]': lastName,
        'metadata[email]': email,
        'metadata[address]': address,
        'metadata[city]': city,
        'metadata[postcode]': postcode,
        'metadata[quantity]': quantity.toString(),
        receipt_email: email,
      }).toString(),
    });

    const paymentIntent = await stripeResponse.json();

    // Send to Zapier if configured
    if (process.env.ZAPIER_WEBHOOK_URL) {
      fetch(process.env.ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderNumber, firstName, lastName, email, address, city, postcode, quantity, subtotal, delivery, total,
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
    }

    return res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      orderNumber,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Payment processing failed' });
  }
}
