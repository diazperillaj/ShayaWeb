import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import ShayaCafe    from './features/ShayaCafe/ShayaCafe.tsx'
import CheckoutPage from './features/ShayaCafe/sub_pages/CheckoutPage.tsx'
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/react"
import AboutUs from './features/ShayaCafe/about_us/AboutUs.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <SpeedInsights/>
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<ShayaCafe />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/nosotros"   element={<AboutUs />} />
        <Route path="/qr"   element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)