import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     {/* 여기서 한 번만 감싸주세요! */}
      <App />
    
  </React.StrictMode>
)