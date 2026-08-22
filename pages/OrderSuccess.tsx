import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderSuccess() {
  const order = JSON.parse(localStorage.getItem('last_order') || 'null')
  if (!order) return <div className="container mx-auto p-8">No recent order found.</div>

  return (
    <div className="container mx-auto py-12 text-center">
      <h1 className="text-2xl font-semibold">Order Placed Successfully 🎉</h1>
      <p className="mt-4">Order ID: <span className="font-mono">{order.id}</span></p>
      <div className="mt-6">
        <Link to="/track-order" className="px-4 py-2 bg-amber-600 text-white rounded mr-2">Track Order</Link>
        <Link to="/shop" className="px-4 py-2 border rounded">Continue Shopping</Link>
      </div>
    </div>
  )
}
