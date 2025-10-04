import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";


const EditContact = () => {

    const { idContact } = useParams();
    console.log(idContact);

    const { store, dispatch } = useGlobalReducer();

    const [existingContact, setExistingContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });


    useEffect(() => {
        const contactoEditado = store.contactos.filter((elemento) => elemento.id == idContact)
        console.log(idContact);
        setExistingContact(contactoEditado);
    }, [store.contactos, idContact])

    const navigate = useNavigate();

    function editContact() {
        fetch(`https://playground.4geeks.com/contact/agendas/Marcel/contacts/${idContact}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: existingContact.name,
                email: existingContact.email,
                phone: existingContact.phone,
                address: existingContact.address,
            })
        })
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    navigate("/");
                    return
                }
            })
            .then((data) => {
                console.log(data);

            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setExistingContact(elemento => ({ ...elemento, [name]: value }))
    }

    return (
        <form>
            <div className="container mt-3 text-center">
                <h2>Editar Contacto</h2>
                <div className="mb-3 text-start">
                    <label htmlFor="Input1" className="form-label">Nombre</label>
                    <input type="text" className="form-control" id="Input1" placeholder="Full Name" name="name" value={existingContact.name || ""} onChange={handleChange} />

                    <label htmlFor="Input2" className="form-label">Email</label>
                    <input type="email" className="form-control" id="Input2" placeholder="name@example.com" name="email" value={existingContact.email || ""} onChange={handleChange} />

                    <label htmlFor="Input3" className="form-label">Teléfono</label>
                    <input type="number" className="form-control" id="Input3" placeholder="636363636" name="phone" value={existingContact.phone || ""} onChange={handleChange} />

                    <label htmlFor="Input4" className="form-label">Dirección</label>
                    <input type="text" className="form-control" id="Input4" placeholder="5555 Sargento Cabral" name="address" value={existingContact.address || ""} onChange={handleChange} />

                </div>
                <button className="btn btn-success" type="button" onClick={editContact}>
                    Guardar Cambios
                </button>
                <Link to="/">
                    <button className="btn btn-primary">Volver</button>
                </Link>
            </div>

        </form>
    )
}

export default EditContact;