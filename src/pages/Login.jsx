// src/pages/Login.jsx
import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

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
        <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-md shadow-md">
                <div className="flex justify-center mb-6">
                    <div className="bg-green-600 p-3 rounded-full">
                        <span className="text-white text-2xl font-bold">$</span>
                    </div>
                </div>

                <h2 className="text-center text-2xl font-bold text-gray-800 mb-1">
                    Fazer login
                </h2>
                <p className="text-center text-gray-500 mb-6">
                    Acesse seu gerenciador de salários
                </p>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Digite seu email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>

                    {erro && (
                        <p className="text-red-600 text-sm text-center">
                            {erro}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
                    >
                        Entrar
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-6">
                    Não tem conta?{" "}
                    <a href="#" className="text-green-600 font-medium">
                        Cadastre-se
                    </a>
                </p>
            </div>
        </div>
    );
}
