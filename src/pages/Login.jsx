import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password: senha,
            });
            if (error) setErro("Erro ao criar conta.");
            else alert("Conta criada! Verifique seu email.");
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: senha,
            });
            if (error) setErro("Email ou senha inválidos.");
            else navigate("/dashboard");
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <div className="login-icon">$</div>

                <h2>{isSignUp ? "Criar conta" : "Fazer login"}</h2>
                <p>
                    {isSignUp
                        ? "Gerencie seus salários de forma simples"
                        : "Acesse seu gerenciador de salários"}
                </p>

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

                <button type="submit">
                    {isSignUp ? "Criar conta" : "Entrar"}
                </button>

                <p className="link-text">
                    {isSignUp ? "Já tem uma conta?" : "Não tem conta?"}
                    <a href="#" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? " Faça login" : " Cadastre-se"}
                    </a>
                </p>
            </form>
        </div>
    );
}
