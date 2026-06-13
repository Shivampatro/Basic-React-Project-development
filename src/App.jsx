
import './App.css'
import Header from './header'
import Footer from './footer'
import Navbar from './navbar'
import Home from './home'
import AboutUs from './about'
import Services from './services'
import Contact from './contact'
import Register from './Register'
import BookTicket from './BookTicket'
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">We are starting our Journey To React !!</h1>
      <Header />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book-ticket" element={<BookTicket />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
