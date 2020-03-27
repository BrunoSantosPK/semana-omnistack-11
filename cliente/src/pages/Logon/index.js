import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";
import imgHeros from "../../assets/heroes.png";
import imgLogo from "../../assets/logo.svg";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";

export default function Logon() {
    const [id, setId] = useState("");
    const history = useHistory();

    async function logar(e) {
        e.preventDefault();

        try {
            const response = await api.post("login", { id });
            localStorage.setItem("ongId", id);
            localStorage.setItem("ongNome", response.data.nome);
            history.push("/profile");
        } catch(erro) {
            alert("Falha no login, tente novamente.");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={imgLogo} alt="Be The Hero" />

                <form onSubmit={logar}>
                    <h1>Faça seu logon</h1>
                    <input
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Enviar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041" />
                        Não tenho ID
                    </Link>
                </form>
            </section>
            <img src={imgHeros} alt="Heros" />
        </div>
    );
}