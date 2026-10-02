import React from 'react'

export default function LoadingScreen() {
  return (
    <main className="loading-screen" aria-label="Loading Arhaya">
      <div className="loading-screen__content">
        <p className="loading-screen__brand">Arhaya<sup className="brand-mark">®</sup></p>
        <img src="/assets/images/logo.jpg" alt="Arhaya botanical logo" className="loading-screen__logo" />
        <p className="loading-screen__label">
          <span>The world's first concept by two engineers</span>
          <span>Future by nature</span>
        </p>
      </div>
    </main>
  )
}