import "./Navbar.css";
import gietLogo from './assets/giet-logo.png';

const NavBar = () => {
  const token = localStorage.getItem("token");

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    alert("Logged out successfully");
    window.location.href = "/login";
  };

  return (
    <div>
    <nav className="navbar">
      <div className="logo">       
        <img src={gietLogo} alt="GIET Logo" />
      </div>

      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/contactlist">Contact List</a></li>
        <li><a href="/register">Register</a></li>
        <li><a href="/book-ticket">Book Ticket</a></li>
        {token ? (
          <li><a href="/logout" onClick={handleLogout}>Logout</a></li>
        ) : (
          <li><a href="/login">Login</a></li>
        )}
      </ul>
    </nav>

    </div>
  )
}

export default NavBar