import React from 'react'

export default function TrackOrder() {
  const order = JSON.parse(localStorage.getItem('last_order') || 'null')

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-semibold">Track Order</h1>
      {!order ? (
        <p className="mt-4">No order found.</p>
      ) : (
        <div className="mt-6">
          <p className="mb-4">Demo tracking — live courier tracking is not connected.</p>
          <ol className="space-y-4">
            <li>Order Placed ✅</li>
            <li>Order Confirmed ✅</li>
            <li>Processing ✅</li>
            <li>Shipped ⏳</li>
            <li>Out for Delivery ⏳</li>
            <li>Delivered ⏳</li>
          </ol>
        </div>
      )}
    </div>
  )
}
