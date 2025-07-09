import { useState } from "react";
import { supabase } from "../services/supabase";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);

    async function handleLogin(e) {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password: senha,
        });
        if (error) setErro(error.message);
    }

    return (
        <div className="login">
            <h2>Entrar</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Acessar</button>
            </form>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
        </div>
    );
}

export default Login;
