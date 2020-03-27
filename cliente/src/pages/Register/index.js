import React, { useState } from "react";
import "./styles.css";
import imgLogo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";

export default function Register() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [zap, setZap] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");

    const history = useHistory();

    async function registrar(evento) {
        evento.preventDefault();
        const data = { nome, email, whatsapp: zap, cidade, uf };
        try {
            const response = await api.post("ongs", data);
            alert(`Seu ID de acesso: ${response.data.idCadastrado}`);
            history.push("/");
        } catch(erro) {
            alert("Erro no cadastro, tente novamente.");
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={imgLogo} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Logon
                    </Link>
                </section>

                <form onSubmit={registrar}>
                    <input
                        placeholder="Nome da ONG"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />

                    <input
                        placeholder="E-mail" type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        placeholder="WhatsApp"
                        value={zap}
                        onChange={e => setZap(e.target.value)}
                    />

                    <div className="input-group">
                        <input
                            placeholder="Cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                        />

                        <input
                            placeholder="UF" style={{ width:80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}