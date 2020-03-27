import React, { useState } from "react";
import "./styles.css";
import imgLogo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function Profile() {
    const ongId = localStorage.getItem("ongId");
    const history = useHistory();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [valor, setValor] = useState("");

    async function cadastrar(e) {
        e.preventDefault();
        const data = { titulo, descricao, valor };

        try {
            await api.post("casos", data, {
                headers: {
                    Authorization: ongId
                }
            });
            history.push("/profile");
        } catch(erro) {
            alert("Erro ao cadastrar");
        }
        
    }

    return (
        <div className="novo-caso">
            <div className="content">
                <section>
                    <img src={imgLogo} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form>
                    <input
                        placeholder="Titulo do caso"
                        value={titulo}
                        onChange={e => setTitulo(e.target.value)}
                    />

                    <textarea
                        placeholder="Descrição"
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={valor}
                        onChange={e => setValor(e.target.value)}
                    />

                    <button onClick={cadastrar} type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}