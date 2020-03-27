import React, { useEffect, useState } from "react";
import "./styles.css";
import imgLogo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import api from "../../services/api";


export default function Profile() {
    const [casos, setCasos] = useState([]);
    const ongId = localStorage.getItem("ongId");
    const ongNome = localStorage.getItem("ongNome");
    const history = useHistory();

    useEffect(() => {
        api.get("perfil", {
            headers: {
                Authorization: ongId
            }
        }).then(res => {
            setCasos(res.data);
        });

    }, [ongId]);

    async function deletar(id) {
        try {
            await api.delete(`casos/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setCasos(casos.filter(caso => caso.id != id));
        } catch(erro) {
            alert("Erro ao deletar.");
        }
    }

    function logout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={imgLogo} alt="Be The Hero" />
                <span>Bem vinda, {ongNome}</span>

                <Link className="button" to="/casos/novo">Cadastrar novo caso</Link>
                <button type="button" onClick={logout}>
                    <FiPower size="18" color="#e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {casos.map(caso => (
                    <li key={caso.id}>
                        <strong>CASO:</strong>
                        <p>{caso.titulo}</p>

                        <strong>DESCRIÇÃO</strong>
                        <p>{caso.descricao}</p>

                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(caso.valor)}</p>

                        <button type="button" onClick={() => deletar(caso.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}