/*import axios from "axios"; */
const API_URL= "http://localhost:5001";
const API_POST_URL=API_URL+"/create";
const API_GET_ALL_CONTACT_URL=API_URL+"/contact-list";
const API_GET_BY_ID_URL=API_URL+"/find-by";
const API_UPDATE_URL=API_URL+"/update-by-id";
const API_DELETE_URL=API_URL+"/delete-by-id";
/*
export const createContact = (contactData) => axios.post(API_POST_URL,contactData);
export const getAllContacts = () => axios.get(API_GET_ALL_CONTACT_URL)
export const getContactById = (id) => axios.get(API_GET_BY_ID_URL+ '/'+ id);
export const deleteContact =  (id) => axios.delete(API_DELETE_URL + '/'+ id);
export const updateContact = (id, contact) =>axios.put(API_UPDATE_URL + '/' + id, contact);
*/
/***********************************************/
/* import authApi from "./authApi";
/***********************************************/

import authApi from "./authApi";

export const createContact = (contactData) =>
    authApi.post(API_POST_URL, contactData);

export const getAllContacts = () =>
    authApi.get(API_GET_ALL_CONTACT_URL);

export const getContactById = (id) =>
    authApi.get(`${API_GET_BY_ID_URL}/${id}`);

export const deleteContact = (id) =>
    authApi.delete(`${API_DELETE_URL}/${id}`);

export const updateContact = (id, contact) =>
    authApi.put(`${API_UPDATE_URL}/${id}`, contact);