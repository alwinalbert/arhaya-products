import Razorpay from 'razorpay'

function json(res, status, body) {
  res.status(status).json(body)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed' })
  }

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) {
    return json(res, 500, { error: 'Razorpay is not configured on the server' })
  }

  const amount = Number(req.body?.amount)
  if (!Number.isInteger(amount) || amount <= 0) {
    return json(res, 400, { error: 'A valid order amount is required' })
  }

  try {
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret })
    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: `arh_${Date.now()}`,
      notes: { store: 'Arhaya Products' },
    })

    return json(res, 200, { id: order.id, amount: order.amount, currency: order.currency, keyId })
  } catch (error) {
    console.error('Razorpay order creation failed', error)
    return json(res, 502, { error: 'Unable to create the Razorpay order' })
  }
}
