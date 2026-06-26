
import './App.css'
import Header from './header'
import Footer from './footer'
import Navbar from './navbar'
import Home from './menubar/Home'
import AboutUs from './menubar/About-Us'
import Services from './menubar/services'
import Contact from './menubar/Contact-Us'
import Register from './Register'
import BookTicket from './BookTicket'
import ContactList from './ContactList'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UpdateContact from './UpdateContact';
import ContactDetails from "./ContactDetails";
import Login from "./Login";


function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <h1 className="app-title">We are starting our Journey To React !!</h1>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/book-ticket" element={<BookTicket />} />
          <Route path="/contactlist" element={<ContactList />} />
          <Route path="/update-contact/:id" element={<UpdateContact />} />
          <Route path="/contact-Us" element={<contact-Us />} />
           <Route path="/contact-by-id/:id" element={<ContactDetails/>}/>
        
          
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
