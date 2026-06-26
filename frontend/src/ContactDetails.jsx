import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getContactById } from "./service/api-services";

const ContactDetails = () => {
  const { id } = useParams();

  const [contact, setContact] = useState(null);

  useEffect(() => {
    getContactById(id)
      .then((response) => {
        console.log(response.data);
        setContact(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [id]);

  if (!contact) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>Contact Details</h1>

      <p>
        <strong>ID:</strong> {contact._id}
      </p>

      <p>
        <strong>Name:</strong> {contact.name}
      </p>

      <p>
        <strong>Email:</strong> {contact.email}
      </p>

      <p>
        <strong>Phone:</strong> {contact.phoneno}
      </p>

      <p>
        <strong>City:</strong> {contact.city}
      </p>

      <p>
        <strong>Address:</strong> {contact.address}
      </p>
    </div>
  );
};

export default ContactDetails;