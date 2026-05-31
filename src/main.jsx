import { Analytics } from '@vercel/analytics/react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context_api/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <BrowserRouter>
            <App />
            <Analytics />
        </BrowserRouter>
    </ThemeProvider>

)
