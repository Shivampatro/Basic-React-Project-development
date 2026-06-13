import "./navbar.css";
const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="logo">MyLogo</div>

      <div className="nav-actions">
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/register">Register</a></li>
          <li><a href="/book-ticket">Book Ticket</a></li>
        </ul>

        <div className="cta">
          <a className="btn-primary" href="/contact">Contact</a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar