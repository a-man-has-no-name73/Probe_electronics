'use client'

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import BoxContents from '@/components/BoxContents';
import Specs from '@/components/Specs';
import Timeline from '@/components/Timeline';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import './page.css'

export default function Home() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Gallery />
        <BoxContents />
        <Specs />
        <Timeline />
        <Testimonials />
        <FAQ />
        <OrderForm />
        <WhatsAppButton />
        <div style={{ height: '10vh' }}></div>
      </main>
      <Footer />
    </div>
  )
}
