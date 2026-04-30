import Head from 'next/head'
import Navbar from '@/components/web3lagos2026/Navbar'
import Hero from '@/components/web3lagos2026/Hero'
import Ticker from '@/components/web3lagos2026/Ticker'
import About from '@/components/web3lagos2026/About'
import Archive from '@/components/web3lagos2026/Archive'
import CTA from '@/components/web3lagos2026/CTA'
import Footer from '@/components/web3lagos2026/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Web3Lagos Aug 27 - Aug 29, 2026</title>
      </Head>
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Archive />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
