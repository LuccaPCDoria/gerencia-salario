import { useState } from "react";
import { supabase } from "../services/supabase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState(null);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [ehCadastro, setEhCadastro] = useState(false);
    const navigate = useNavigate();

    const alternarModo = () => {
        setEmail("");
        setSenha("");
        setErro(null);
        setEhCadastro(!ehCadastro);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(null);

        if (ehCadastro) {
            const { error } = await supabase.auth.signUp({
                email,
                password: senha,
            });
            if (error) {
                setErro("Erro ao criar conta.");
            } else {
                navigate("/dashboard");
            }
        } else {
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md space-y-4 text-center"
            >
                <div className="flex justify-center">
                    <div className="bg-green-600 p-3 rounded-full">
                        <span className="text-white text-2xl font-bold">$</span>
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                    {ehCadastro ? "Criar conta" : "Fazer login"}
                </h2>
                <p className="text-gray-600 text-sm">
                    {ehCadastro
                        ? "Gerencie seus salários de forma simples"
                        : "Acesse seu gerenciador de salários"}
                </p>

                <div className="text-left space-y-4 mt-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                📧
                            </span>
                            <input
                                type="email"
                                placeholder="seu@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700 block mb-1">
                            Senha
                        </label>
                        <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                🔒
                            </span>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                                className="w-full pl-10 pr-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                            >
                                {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                </div>

                {erro && (
                    <p className="text-red-600 text-sm text-center">{erro}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
                >
                    {ehCadastro ? "Criar conta" : "Entrar"}
                </button>

                <p className="text-sm text-center text-green-700 mt-2">
                    {ehCadastro ? (
                        <>
                            Já tem uma conta?{" "}
                            <button
                                type="button"
                                onClick={alternarModo}
                                className="font-medium underline"
                            >
                                Faça login
                            </button>
                        </>
                    ) : (
                        <>
                            Não tem conta?{" "}
                            <button
                                type="button"
                                onClick={alternarModo}
                                className="font-medium underline"
                            >
                                Cadastre-se
                            </button>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}
