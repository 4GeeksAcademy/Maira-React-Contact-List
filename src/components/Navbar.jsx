import { Link } from "react-router-dom";
import Login from "../pages/Login";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<Link to="/add-contact">
				<button className="btn btn-success position-absolute top-0 end-0"><i className="fa-solid fa-file-signature"></i></button>
			</Link>
			<div className="container">
				<span className="navbar-brand mb-0 h1">Lista de Contactos</span>
				<div className="ml-auto">
					<Link to="/pages/Login">
						<button className="btn btn-primary position-absolute top-0 start-0"><i className="fa-solid fa-user"></i></button>
					</Link>
				</div>
			</div>
		</nav>
	);
};