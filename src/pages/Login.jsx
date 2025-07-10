import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; // <- Importa o CSS puro

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErro(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });

        if (error) {
            setErro("Email ou senha inválidos.");
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
                <div className="login-icon">$</div>

                <h2>Fazer login</h2>
                <p>Acesse seu gerenciador de salários</p>

                <label>Email</label>
                <input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha</label>
                <input
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                {erro && <p className="error-msg">{erro}</p>}

                <button type="submit">Entrar</button>

                <p className="link-text">
                    Não tem conta? <a href="#">Cadastre-se</a>
                </p>
            </form>
        </div>
    );
}
