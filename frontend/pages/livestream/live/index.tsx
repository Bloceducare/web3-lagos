import Livestream from '@/views/Livestream/live_stream/Livestream'
import Header from '../../../components/livestream/Header'
import Footer from '../../../components/livestream/Footer'

const page = () => {
  return (
    <>
      <Header />
      <Livestream />
      <Footer />
    </>
  )
}

export default page