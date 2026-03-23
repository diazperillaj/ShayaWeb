import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import ShayaCafe    from './features/ShayaCafe/ShayaCafe.tsx'
import CheckoutPage from './features/ShayaCafe/sub_pages/CheckoutPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<ShayaCafe />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)