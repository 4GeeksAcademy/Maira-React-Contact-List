import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
 

const Login = () => {

    const [user, setUser] = useState("");

    const { store, dispatch } = useGlobalReducer();

    const navigate = useNavigate();

    useEffect(() => {
		newAccess();
	}, [])

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
        <form onSubmit={newAccess} className="text-center">            
            <div className="mb-3">
                <label htmlFor="acces" className="form-label">Usuario</label>
                <input type="text" className="form-control" id="acces" />
            </div>
            <Link to="/">
                <button className="btn btn-primary">Volver</button>
            </Link>
            <button className="btn btn-danger" onClick={(e) => {
                e.preventDefault();
                newAccess(store.usuario);
                console.log("Nuevo Usuario");
                navigate("/");
            }}>Guardar</button>
            
        </form>
    )
}

export default Login;