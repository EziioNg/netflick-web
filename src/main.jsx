
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Cấu hình React Router Dom với BrowserRouter
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <App />
  </BrowserRouter>
)
