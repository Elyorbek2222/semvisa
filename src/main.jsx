import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import App from './App.jsx'
import AppRu from './AppRu.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Countries from './pages/Countries.jsx'
import CountryVisa from './pages/CountryVisa.jsx'

function Root() {
  const [lang, setLang] = useState(() => localStorage.getItem('semvisa_lang') || 'uz')

  const switchToRu = () => {
    localStorage.setItem('semvisa_lang', 'ru')
    setLang('ru')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const switchToUz = () => {
    localStorage.setItem('semvisa_lang', 'uz')
    setLang('uz')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const HomePage = lang === 'ru'
    ? <AppRu onLangSwitch={switchToUz} />
    : <App onLangSwitch={switchToRu} />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/vizalar" element={<Countries />} />
        <Route path="/vizalar/:slug" element={<CountryVisa />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <Root />
      <Analytics />
    </HelmetProvider>
  </StrictMode>,
)
