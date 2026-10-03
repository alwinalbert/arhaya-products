import crypto from 'node:crypto'

function json(res, status, body) {
  res.status(status).json(body)
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { error: 'Method not allowed' })
  }

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return json(res, 500, { error: 'Razorpay is not configured on the server' })
  }

  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body ?? {}
  if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
    return json(res, 400, { error: 'Incomplete Razorpay payment details' })
  }

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex')

  const expectedBuffer = Buffer.from(expectedSignature, 'utf8')
  const receivedBuffer = Buffer.from(String(razorpaySignature), 'utf8')
  const valid = expectedBuffer.length === receivedBuffer.length
    && crypto.timingSafeEqual(expectedBuffer, receivedBuffer)

  if (!valid) return json(res, 400, { verified: false, error: 'Payment verification failed' })
  return json(res, 200, { verified: true })
}
