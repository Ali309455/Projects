import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from 'react-auth-kit'
import createStore from 'react-auth-kit/createStore';




const store = createStore({
  // authName:'_auth',
  // authType:'cookie',
  // cookieDomain: "",
  // cookieSecure: window.location.protocol === 'https:',
  // sameSite: 'Lax',
  authType:'localstorage' , // Options: 'cookie', 'localstorage'
    authName:'_auth',
    cookieDomain:window.location.hostname,
    cookieSecure:true
 })

createRoot(document.getElementById('root')).render(
  <AuthProvider 
    store={store}
    >
  <StrictMode>
    <App />
  </StrictMode>,
  </AuthProvider>
)
