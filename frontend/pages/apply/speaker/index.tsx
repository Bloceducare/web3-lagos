import Head from 'next/head'
import Navbar from '@/components/web3lagos2026/Navbar'
import Footer from '@/components/web3lagos2026/Footer'
import SpeakerNominationForm from '@/components/web3lagos2026/SpeakerNominationForm'

export default function SpeakerNominationPage() {
  return (
    <>
      <Head>
        <title>Web3Lagos 2026 — Suggest a Speaker</title>
        <meta
          name="description"
          content="Nominate speakers and voices you want to hear at Web3 Lagos Conference 2026."
        />
      </Head>
      <Navbar />
      <main
        className="w-full max-w-full box-border overflow-x-hidden"
        style={{ paddingTop: 68, margin: 0, background: '#060810' }}
      >
        <SpeakerNominationForm />
      </main>
      <Footer />
    </>
  )
}
