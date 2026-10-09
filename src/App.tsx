import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Demo from './components/Demo'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-surface-0 font-sans text-ink">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Demo />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}