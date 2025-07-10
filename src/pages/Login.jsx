import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const [modoCadastro, setModoCadastro] = useState(false); // false = login, true = cadastro
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);

        if (modoCadastro) {
            // Criar conta
            const { error } = await supabase.auth.signUp({
                email,
                password: senha,
            });
            if (error) {
                setErro("Erro ao criar conta. Tente novamente.");
            } else {
                setModoCadastro(false); // volta para login
            }
        } else {
            // Fazer login
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: senha,
            });
            if (error) {
                setErro("Email ou senha inválidos.");
            } else {
                navigate("/dashboard");
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleSubmit}>
                <div className="login-icon">$</div>
                <h2>{modoCadastro ? "Criar conta" : "Fazer login"}</h2>
                <p>
                    {modoCadastro
                        ? "Gerencie seus salários de forma simples"
                        : "Acesse seu gerenciador de salários"}
                </p>

                <label>Email</label>
                <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Senha</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />

                {erro && <p className="error-msg">{erro}</p>}

                <button type="submit">
                    {modoCadastro ? "Criar conta" : "Entrar"}
                </button>

                <p className="link-text">
                    {modoCadastro ? (
                        <>
                            Já tem uma conta?{" "}
                            <a href="#" onClick={() => setModoCadastro(false)}>
                                Faça login
                            </a>
                        </>
                    ) : (
                        <>
                            Não tem conta?{" "}
                            <a href="#" onClick={() => setModoCadastro(true)}>
                                Cadastre-se
                            </a>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}
