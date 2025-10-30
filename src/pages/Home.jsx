
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { useEffect } from "react";


export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		getContacts().then((response) => {
			console.log(response)
			dispatch({ type: 'LISTA_CONTACTOS', payload: response });
		});
	}, [])

	const user = store.usuario;

	function getContacts() {
		return fetch(`https://playground.4geeks.com/contact/agendas/Marcel/contacts`,
			{
				method: "GET"
			}
		)
			.then((response) => {
				if(response.ok == false) {
					return newAccess()
				}
				return response.json();
			})
			.then((data) => {
				console.log("este es el log de getContact", data)
				return data.contacts
			})
			.catch((err) => {
				console.log(err);
			})
	};

	function deleteContact(id) {

		return fetch(`https://playground.4geeks.com/contact/agendas/Marcel/contacts/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then((response) => {
				if (response.ok) {
					// 👇 devolvemos la promesa del GET
					return getContacts();
				} else {
					throw new Error("Error al eliminar contacto");
				}
			})
			.then((data) => {
				console.log("Contactos actualizados:", data);
				dispatch({ type: "LISTA_CONTACTOS", payload: data });
				console.log("Soy el log de después del dispatch");

			})
			.catch((err) => {
				console.log("Error eliminando contacto:", err);
			});
	
	}

	const newAccess = () => {
        fetch(`https://playground.4geeks.com/contact/agendas/Marcel`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }) 
            .then((response) => {
                console.log(response);
                dispatch({ type: 'NUEVO-USUARIO', payload: response })
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);

            })
		}

	return (
		<>
			<div className="text-start mt-5">
				{store.contactos?.map((elemento) =>
				(
					<div className="card" key={elemento.id}>
						<div className="row g-0">
							<div className="col-md-3">
								<img src="https://picsum.photos/200/300?grayscale" className="img-fluid rounded-start" width="250px" height="250px" alt="..." />
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

								<i className="btn fa-solid fa-trash" data-bs-toggle="modal" data-bs-target="#staticBackdrop">

								</i>
								<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id="staticBackdropLabel">Eliminar Contacto</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-body">
												¿Estás segur@ de eliminar este contacto?
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
												<button type="button" className="btn btn-primary" onClick={(e) => {
													e.preventDefault()
													deleteContact(elemento.id)
														.then(() => {
															window.location.reload()
														})
												}}>Confirmar</button>
											</div>
										</div>
									</div>
								</div>
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