import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {  getContactById, updateContact} from "./service/api-services";

const UpdateContact = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phoneno: "",
        city: "",
        address: ""
    });

useEffect(() => {
    const fetchContact = async () => {
        try {
            const response = await getContactById(id);
            setContact(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    fetchContact();
}, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;

        setContact({
            ...contact,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        alert('I am here ...')
        e.preventDefault();

        try {

            await updateContact(id, contact);

            alert("Contact Updated Successfully");

            navigate("/contact-list");

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Update Contact</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={contact.name}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={contact.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phoneno"
                        className="form-control"
                        value={contact.phoneno}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={contact.city}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label>Address</label>
                    <textarea
                        name="address"
                        className="form-control"
                        value={contact.address}
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                >
                    Update Contact
                </button>

            </form>
        </div>
    );
};

export default UpdateContact;