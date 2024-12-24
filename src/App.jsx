import './App.css'
import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'

function App() {

  return (
      <div className="min-h-screen flex flex-col justify-between overflow-hidden cursor-default">
        <Header />
        <Home />
        <Footer />
      </div>
  )
}

export default App