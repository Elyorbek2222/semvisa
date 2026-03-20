import { ViteReactSSG } from 'vite-react-ssg'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

import App from './App.jsx'
import AppRu from './AppRu.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Countries from './pages/Countries.jsx'
import CountryVisa from './pages/CountryVisa.jsx'
import About from './pages/About.jsx'
import Privacy from './pages/Privacy.jsx'
import { blogPosts } from './data/blogPosts.js'
import { countries } from './data/countries.js'

function RootLayout() {
  return (
    <HelmetProvider>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </HelmetProvider>
  )
}

function HomePage() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('semvisa_lang') || 'uz'
    }
    return 'uz'
  })

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

  if (lang === 'ru') return <AppRu onLangSwitch={switchToUz} />
  return <App onLangSwitch={switchToRu} />
}

const routes = [
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true,               Component: HomePage },
      { path: 'blog',              Component: Blog },
      { path: 'blog/:slug',        Component: BlogPost },
      { path: 'vizalar',           Component: Countries },
      { path: 'vizalar/:slug',     Component: CountryVisa },
      { path: 'about',             Component: About },
      { path: 'privacy',           Component: Privacy },
    ],
  },
]

export const includedRoutes = () => [
  '/',
  '/blog',
  '/vizalar',
  '/about',
  '/privacy',
  ...blogPosts.map(post => `/blog/${post.slug}`),
  ...countries.map(c => `/vizalar/${c.slug}`),
]

export const createRoot = ViteReactSSG({ routes })
