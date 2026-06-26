import axios from "axios";

// Backend Base URL
const BASE_URL = "http://localhost:5001";

const getHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ==============================
// CREATE CONTACT
// ==============================
export const createContact = async (contactData) => {
  return await axios.post(
    `${BASE_URL}/create`,
    contactData,
    getHeaders()
  );
};

// ==============================
// GET ALL CONTACTS
// ==============================
export const getAllContacts = async () => {
  return await axios.get(
    `${BASE_URL}/contact-list`,
    getHeaders()
  );
};

// ==============================
// GET CONTACT BY ID
// ==============================
export const getContactById = async (id) => {
  return await axios.get(
    `${BASE_URL}/find-by/${id}`,
    getHeaders()
  );
};

// ==============================
// UPDATE CONTACT
// ==============================
export const updateContact = async (id, updatedData) => {
  return await axios.put(
    `${BASE_URL}/update-contact-by-id/${id}`,
    updatedData,
    getHeaders()
  );
};

// ==============================
// DELETE CONTACT
// ==============================
export const deleteContact = async (id) => {
  return await axios.delete(
    `${BASE_URL}/delete-contact-by-id/${id}`,
    getHeaders()
  );
};
