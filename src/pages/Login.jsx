import { useState } from "react";
import { supabase } from "../services/supabase";
import "../styles/login.css";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [modoCadastro, setModoCadastro] = useState(false);
    const [erro, setErro] = useState("");

    const alternarModo = () => {
        setModoCadastro(!modoCadastro);
        setErro("");
        setEmail("");
        setSenha("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro("");

        if (modoCadastro) {
            const { error } = await supabase.auth.signUp({
                email,
                password: senha,
            });
            if (error) setErro("Erro ao criar conta. Verifique os dados.");
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password: senha,
            });
            if (error) setErro("Email ou senha inválidos.");
        }
    };

    return (
        <div className="pagina">
            <form className="formulario" onSubmit={handleSubmit}>
                <div className="icone-login">$</div>
                <h2>{modoCadastro ? "Criar conta" : "Fazer login"}</h2>
                <p>
                    {modoCadastro
                        ? "Gerencie seus salários de forma simples"
                        : "Acesse seu gerenciador de salários"}
                </p>

                <label>Email</label>
                <div className="input-wrapper">
                    <span className="icone-email">📧</span>
                    <input
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <label>Senha</label>
                <div className="input-wrapper">
                    <span className="icone-senha">🔒</span>
                    <input
                        type={mostrarSenha ? "text" : "password"}
                        placeholder="********"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <span
                        className="icone-toggle"
                        onClick={() => setMostrarSenha(!mostrarSenha)}
                        style={{ cursor: "pointer" }}
                    >
                        👁️
                    </span>
                </div>

                {erro && <p className="erro">{erro}</p>}

                <button type="submit">
                    {modoCadastro ? "Criar conta" : "Entrar"}
                </button>

                <p className="alternar">
                    {modoCadastro ? (
                        <>
                            Já tem uma conta?{" "}
                            <span onClick={alternarModo}>Faça login</span>
                        </>
                    ) : (
                        <>
                            Não tem conta?{" "}
                            <span onClick={alternarModo}>Cadastre-se</span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}
