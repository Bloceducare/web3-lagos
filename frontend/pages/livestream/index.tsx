import HomePage from '@/views/Livestream/homePage/HomePage';
import  Header from './components/Header';
import  Footer from './components/Footer';


function Home() {
  return (
    <div className="bg-gradient-to-b from-[#ffffff] to-[#ECF3FE]">
      <Header />
      <HomePage />

      <Footer />
    </div>
  )
}

export default Home;
