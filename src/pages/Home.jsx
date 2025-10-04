
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const navigate = useNavigate();

	useEffect(() => {
		getContacts().then((response) => {
			console.log(response)
			dispatch({ type: 'LISTA_CONTACTOS', payload: response });
		});
	}, [])


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

	function deleteContact(id) {

		fetch(`https://playground.4geeks.com/contact/agendas/Marcel/contacts/${id}`, {
			method: "DELETE",
			headers: {
				'content-Type': 'application/json'
			}
		})
			.then((response) => {
				if (response.ok) {
					getContacts().then((response) => {
						console.log(response)
						dispatch({ type: 'LISTA_CONTACTOS', payload: response });
					});
				}
			})
			.catch((err) => {
				console.log('Error eliminando contacto', err);

			})
	}

	return (
		<>
			<Navbar />
			<div className="text-start mt-5">
				{store.contactos.map((elemento) =>
				(
					<div className="card" key={elemento.id}>
						<div className="row g-0">
							<div className="col-md-3">
								<img src="https://avatar.iran.liara.run/public" className="img-fluid rounded-start" width="250px" height="250px" alt="..." />
							</div>
							<div className="col-md-6">
								<div className="card-body">
									<h4> {elemento.name}</h4>
									<p className="card-text">{elemento.address}</p>
									<p className="card-text">{elemento.phone}</p>
									<p className="card-text">{elemento.email}</p>
								</div>
							</div>
							<div className="col-md-2 d-flex mt-5">
								<Link to={`/edit-contact/${elemento.id}`}>
									<i className="btn fa-solid fa-pen"></i>
								</Link>

								<i className="btn fa-solid fa-trash" onClick={(e) => {
									e.preventDefault(),
										deleteContact(elemento.id)
								}}></i>
							</div>
						</div>
					</div >
				)
				)
				}
			</div>
		</>
	);
}; 