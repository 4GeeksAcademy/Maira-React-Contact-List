import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { isElementOfType } from "react-dom/test-utils";



const AddContact = () => {

    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();

    const [newContact, setNewContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    function getContacts() {
		return fetch(`https://playground.4geeks.com/contact/agendas/Marcel/contacts`,
			{
				method: "GET"
			}
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				console.log("este es el log de getContact", data);
				return data.contacts
			})
			.catch((err) => {
				console.log(err);
			})
	};

    function addNewContact() {

        fetch(`https://playground.4geeks.com/contact/agendas/Marcel/contacts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newContact),
        })
            .then((response) => {
                getContacts().then((response) => {
                    console.log(response)
                    dispatch({ type: 'LISTA_CONTACTOS', payload: response });

                });
                return response.json()
            })
            .then((data) => {
                console.log("Nuevo Contacto creado...", data);

                return data.contactos;

            })
            .catch((err) => {
                console.log(err);

            })
    }

    // const handleChange = ({ target: { name, value } }) => { // con destructuring    
    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setNewContact(elemento => ({ ...elemento, [name]: value }))
    }

    return (
        <form onSubmit={addNewContact}>
            <div className="container mt-3 text-center">
                <h2>Agregar Contacto</h2>
                <div className="mb-3 text-start">
                    <label htmlFor="Input1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="Input1" placeholder="Full Name" name="name" value={newContact.name} onChange={handleChange} />

                    <label htmlFor="Input2" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Input2" placeholder="name@example.com" name="email" value={newContact.email} onChange={handleChange} />

                    <label htmlFor="Input3" className="form-label">Teléfono</label>
                    <input type="number" className="form-control" id="Input3" placeholder="636363636" name="phone" value={newContact.phone} onChange={handleChange} />

                    <label htmlFor="Input4" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="Input4" placeholder="5555 Sargento Cabral" name="address" value={newContact.address} onChange={handleChange} />

                </div>
                <Link to="/">
                    <button className="btn btn-primary">Volver</button>
                </Link>
                <button className="btn btn-success" onClick={(e) => {
                    e.preventDefault();
                    addNewContact(store.contactos);
                    console.log("Creando Contacto...");
                    navigate("/");
                }}>Guardar</button>
            </div>
        </form>
    )
}

export default AddContact;