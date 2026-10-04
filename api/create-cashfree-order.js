function json(res, status, body) {
  res.status(status).json(body)
}

function cashfreeBaseUrl() {
  return process.env.CASHFREE_ENVIRONMENT === 'production'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg'
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed' })
  }

  const clientId = process.env.CASHFREE_CLIENT_ID
  const clientSecret = process.env.CASHFREE_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    return json(res, 500, { error: 'Cashfree is not configured on the server' })
  }

  const amount = Number(req.body?.amount)
  const customer = req.body?.customer
  if (!Number.isInteger(amount) || amount <= 0 || !customer?.name || !customer?.phone) {
    return json(res, 400, { error: 'A valid order amount and customer details are required' })
  }

  const orderId = `arh_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  try {
    const response = await fetch(`${cashfreeBaseUrl()}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
        'x-request-id': orderId,
      },
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount / 100,
        order_currency: 'INR',
        customer_details: {
          customer_id: orderId,
          customer_name: customer.name,
          customer_email: customer.email || 'orders@arhaya.in',
          customer_phone: customer.phone,
        },
      }),
    })
    const result = await response.json()
    if (!response.ok) {
      console.error('Cashfree order creation failed', result)
      return json(res, 502, { error: result.message || 'Unable to create the Cashfree order' })
    }

    return json(res, 200, {
      orderId: result.order_id,
      paymentSessionId: result.payment_session_id,
      mode: process.env.CASHFREE_ENVIRONMENT === 'production' ? 'production' : 'sandbox',
    })
  } catch (error) {
    console.error('Cashfree order creation failed', error)
    return json(res, 502, { error: 'Unable to create the Cashfree order' })
  }
}
