import { useState } from 'react'
// Import API Function
import { createContact } from '../api/contactApi';
import { useNavigate } from 'react-router-dom';

const ContactUs = () => {
    // Step-1
    const [name, setName] = useState("");
    const [email,setEmail] = useState("");
    const [phone,setPhone] = useState("");    
    const [password,setPassword] = useState("");
    const [city,setCity] = useState("");
    const [address,setAddress] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit =async (e)=>{
      e.preventDefault(); 
     
        e.preventDefault();

        // Create Object
        const contactData = {
            name: name,
            email: email,
            phoneno: phone,
            password: password,
            city:city,
            address:address

        };

        try {

            // API Calling
            const response = await createContact(contactData);

            alert('Form Submitted Successfully');

            console.log(response.data);

            // Clear Form
            setName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setCity("");
            setAddress("");

             navigate(`/contact-list`);

        } catch (error) {

            console.log(error);

            alert('Something went wrong');
        }
    
    }



  return (
   <div className="container mt-5">
  <div className="card shadow p-4">
    <h2 className="text-center mb-4">Add Contact</h2>

    <form onSubmit={handleSubmit}>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Name
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Email
        </label>
        <div className="col-sm-9">
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Phone
        </label>
        <div className="col-sm-9">
          <input
            type="number"
            className="form-control"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          Password
        </label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <label className="col-sm-3 col-form-label">
          City
        </label>
        <div className="col-sm-9">
          <input
            type="text"
            className="form-control"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-4">
        <label className="col-sm-3 col-form-label">
          Address
        </label>
        <div className="col-sm-9">
          <textarea
            className="form-control"
            rows="3"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="btn btn-success me-2"
        >
          Save Contact
        </button>

        <button
          type="reset"
          className="btn btn-secondary"
        >
          Reset
        </button>
      </div>

    </form>
  </div>
</div>
  )
}

export default ContactUs