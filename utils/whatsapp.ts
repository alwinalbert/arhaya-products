const WHATSAPP_NUMBER = '+918108118903'

export function generateWhatsAppUrl(message: string) {
  const base = 'https://wa.me/' + WHATSAPP_NUMBER.replace(/[^0-9]/g, '')
  return `${base}?text=${encodeURIComponent(message)}`
}

export function productWhatsAppMessage(productName: string) {
  return `Hi Arhaya Products, I'm interested in ${productName}. Can you provide more details?`
}

type OrderItem = { productName: string; quantity: number }

export function orderWhatsAppMessage(
  orderId: string,
  customer: { name: string; phone: string; email: string; address: string; city: string; state: string; pin: string },
  items: OrderItem[],
  total: number,
    payment: string,
    transactionId: string
) {
  const itemLines = items.map((item) => `- ${item.productName} x ${item.quantity}`).join('\n')

  return [
    'New Arhaya order',
    `Order ID: ${orderId}`,
    '',
    `Buyer name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email || 'Not provided'}`,
    `Address: ${[customer.address, customer.city, customer.state, customer.pin].filter(Boolean).join(', ')}`,
    '',
    'Items:',
    itemLines,
    `Total: ₹${total}`,
      `Payment: ${payment.toUpperCase()}`,
      `Transaction ID: ${transactionId}`,
  ].join('\n')
}

export default WHATSAPP_NUMBER
