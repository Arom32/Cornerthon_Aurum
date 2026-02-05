import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 반드시 BrowserRouter가 App을 감싸고 있어야 합니다! */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)