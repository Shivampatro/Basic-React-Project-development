import { useEffect, useState } from "react"
import { deleteContact, getAllContacts } from "./service/api-services";
import { useNavigate } from "react-router-dom";
 

const ContactList = () => {

    const[contacts, setContacts] = useState([]);
    const navigator = useNavigate();

   useEffect(() => {
    getAllContacts()
      .then((response) => {
          console.log("Response:", response);
          setContacts(response.data);
      })
      .catch((error) => {
          console.log("Error:", error);
      });
     }, []);

     const viewContact = (id) => {
        alert('id : '+ id);
        navigator('/contact-by-id/'+id);
       
    };


    const handleDelete = async (id) => {

    const isConfirmed = window.confirm(
        "Are you sure you want to delete this contact?"
    );

    if (!isConfirmed) {
        return;
    }
    deleteContact(id);
    navigator('/contact-list');     
    // Remove deleted contact from UI
     setContacts(
            contacts.filter(contact => contact._id !== id)
    );   
};

  // Update Contact
  const updateContact = (id) => {
    navigator(`/update-contact/${id}`);
  };

  const  addContact=()=>{
      navigator(`/contact`);
  }

  return (
   <>
     <h3>  This is Contact List Page </h3>
   
     <div className='container'>
       
                      
        <button type="button" className="btn btn-primary" onClick={() => addContact()} >Add Contact</button>
       <h3> List Of Empoyees</h3>
    <table className='table'>
        <thead>

            <tr>
             
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>City</th>
                <th>Address</th>
                <th> Actions</th>
            </tr>
        </thead>

        <tbody>
            {
                 contacts.map((contact) =>
                   <tr key={contact._id}>
                      
                       <td>{contact.name}</td>
                       <td>{contact.email}</td>
                       <td>{contact.phoneno}</td>
                       <td>{contact.city}</td>
                       <td>{contact.address}</td>
                       <td>
                        <button className="btn btn-info me-2"onClick={() => viewContact(contact._id)}> View </button>
                        <button className="btn btn-warning me-2" onClick={() => updateContact(contact._id)}> Update</button>
                        <button  className="btn btn-danger" onClick={() => handleDelete(contact._id)}>Delete</button>
                       </td>
                     
                   </tr>) 
            }
        </tbody>
    </table>


    </div>

   
   </>



  )
}

export default ContactList