import React from 'react'
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'

export default function LoadingScreen() {
  return (
    <main className="loading-screen" aria-label="Loading Arhaya">
      <div className="loading-screen__content">
        <p className="loading-screen__brand">Arhaya</p>
        <Helix size="60" speed="2.5" color="#214a35" />
        <p className="loading-screen__label">Preparing your botanical ritual</p>
      </div>
    </main>
  )
}