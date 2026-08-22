import React from 'react'

type Props = { value: number; onChange: (v: number) => void; max?: number }

export default function QuantitySelector({ value, onChange, max = 999 }: Props) {
  return (
    <div className="inline-flex items-center border rounded overflow-hidden">
      <button aria-label="decrease" onClick={() => onChange(Math.max(1, value - 1))} className="px-3">
        -
      </button>
      <div className="px-3">{value}</div>
      <button aria-label="increase" onClick={() => onChange(Math.min(max, value + 1))} className="px-3">
        +
      </button>
    </div>
  )
}
