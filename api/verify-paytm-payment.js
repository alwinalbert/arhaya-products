import PaytmChecksum from 'paytmchecksum'

function json(res, status, body) {
  res.status(status).json(body)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed' })
  }

  const mid = process.env.PAYTM_MID
  const merchantKey = process.env.PAYTM_MERCHANT_KEY
  const production = process.env.PAYTM_ENVIRONMENT === 'production'
  const orderId = req.body?.orderId
  if (!mid || !merchantKey) {
    return json(res, 500, { error: 'Paytm is not configured on the server' })
  }
  if (!orderId || typeof orderId !== 'string') {
    return json(res, 400, { error: 'Paytm order ID is required' })
  }

  const body = { mid, orderId }
  try {
    const signature = await PaytmChecksum.generateSignature(JSON.stringify(body), merchantKey)
    const response = await fetch(`${production ? 'https://securegw.paytm.in' : 'https://securegw-stage.paytm.in'}/v3/order/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, head: { signature } }),
    })
    const result = await response.json()
    if (!response.ok || result.body?.resultInfo?.resultStatus !== 'TXN_SUCCESS') {
      return json(res, 400, { verified: false, error: result.body?.resultInfo?.resultMsg || 'Payment verification failed' })
    }
    return json(res, 200, { verified: true, transactionId: result.body.txnId || orderId })
  } catch (error) {
    console.error('Paytm payment verification failed', error)
    return json(res, 502, { error: 'Unable to verify the Paytm payment' })
  }
}
