import PaytmChecksum from 'paytmchecksum'

function json(res, status, body) {
  res.status(status).json(body)
}

function paytmConfig() {
  const production = process.env.PAYTM_ENVIRONMENT === 'production'
  return {
    mid: process.env.PAYTM_MID,
    merchantKey: process.env.PAYTM_MERCHANT_KEY,
    website: process.env.PAYTM_WEBSITE || (production ? 'DEFAULT' : 'WEBSTAGING'),
    baseUrl: production ? 'https://securegw.paytm.in' : 'https://securegw-stage.paytm.in',
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed' })
  }

  const config = paytmConfig()
  if (!config.mid || !config.merchantKey) {
    return json(res, 500, { error: 'Paytm is not configured on the server' })
  }

  const amount = Number(req.body?.amount)
  const customer = req.body?.customer
  if (!Number.isInteger(amount) || amount <= 0 || !customer?.name || !customer?.phone) {
    return json(res, 400, { error: 'A valid order amount and customer details are required' })
  }

  const orderId = `ARH_${Date.now()}_${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  const body = {
    requestType: 'Payment',
    mid: config.mid,
    websiteName: config.website,
    orderId,
    txnAmount: { value: (amount / 100).toFixed(2), currency: 'INR' },
    userInfo: {
      custId: orderId,
      mobile: customer.phone,
      email: customer.email || 'orders@arhaya.in',
      firstName: customer.name,
    },
  }

  try {
    const signature = await PaytmChecksum.generateSignature(JSON.stringify(body), config.merchantKey)
    const response = await fetch(`${config.baseUrl}/theia/api/v1/initiateTransaction?mid=${encodeURIComponent(config.mid)}&orderId=${encodeURIComponent(orderId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, head: { signature } }),
    })
    const result = await response.json()
    if (!response.ok || result.body?.resultInfo?.resultStatus !== 'S') {
      console.error('Paytm order creation failed', result)
      return json(res, 502, { error: result.body?.resultInfo?.resultMsg || 'Unable to create the Paytm order' })
    }

    return json(res, 200, {
      orderId,
      txnToken: result.body.txnToken,
      mid: config.mid,
      environment: process.env.PAYTM_ENVIRONMENT === 'production' ? 'production' : 'staging',
    })
  } catch (error) {
    console.error('Paytm order creation failed', error)
    return json(res, 502, { error: 'Unable to create the Paytm order' })
  }
}
