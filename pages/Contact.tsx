import React, { useState } from 'react'
import { generateWhatsAppUrl } from '../utils/whatsapp'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent (demo)')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="container mx-auto py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-2">WhatsApp, Phone, Email, Instagram</p>
        <p className="mt-4">Business Address: Your address here</p>
        <a href={generateWhatsAppUrl('Hi')} target="_blank" rel="noreferrer" className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded">WhatsApp Us</a>
      </div>

      <form onSubmit={submit} className="p-4 border rounded">
        <input className="w-full p-2 border rounded mb-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full p-2 border rounded mb-2" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full p-2 border rounded mb-2" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <textarea className="w-full p-2 border rounded mb-2" placeholder="Message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button type="submit" className="px-4 py-2 bg-amber-600 text-white rounded">Send Message</button>
      </form>
    </div>
  )
}
