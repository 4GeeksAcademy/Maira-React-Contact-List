import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/add-contact">
				<button className="btn btn-success position-absolute top-0 end-0"><i className="fa-solid fa-file-signature"></i></button>
			</Link>
			<div className="container start-0">
				<h2 className="navbar-brand h1"><i className="fa-solid fa-user"></i>Lista de Contactos</h2>
				
			</div>
		</nav>
	);
};