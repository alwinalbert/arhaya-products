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
  const orderId = req.body?.orderId
  if (!clientId || !clientSecret) {
    return json(res, 500, { error: 'Cashfree is not configured on the server' })
  }
  if (!orderId || typeof orderId !== 'string') {
    return json(res, 400, { error: 'Cashfree order ID is required' })
  }

  try {
    const response = await fetch(`${cashfreeBaseUrl()}/orders/${encodeURIComponent(orderId)}/payments`, {
      headers: {
        'x-api-version': '2023-08-01',
        'x-client-id': clientId,
        'x-client-secret': clientSecret,
      },
    })
    const payments = await response.json()
    if (!response.ok) return json(res, 502, { error: 'Unable to verify the Cashfree payment' })

    const successfulPayment = Array.isArray(payments)
      ? payments.find((payment) => payment.payment_status === 'SUCCESS')
      : null
    if (!successfulPayment) return json(res, 400, { verified: false, error: 'Payment verification failed' })

    return json(res, 200, { verified: true, transactionId: successfulPayment.cf_payment_id || orderId })
  } catch (error) {
    console.error('Cashfree payment verification failed', error)
    return json(res, 502, { error: 'Unable to verify the Cashfree payment' })
  }
}
