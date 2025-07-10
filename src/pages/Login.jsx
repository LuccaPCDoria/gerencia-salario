import { useState } from "react";
import "./Login.css"; // relativo ao mesmo diretório
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const toggleForm = () => setIsLogin(!isLogin);
    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-icon">$</div>
                <h2>{isLogin ? "Fazer login" : "Criar conta"}</h2>
                <p>
                    {isLogin
                        ? "Acesse seu gerenciador de salários"
                        : "Gerencie seus salários de forma simples"}
                </p>

                <form>
                    <label>Email</label>
                    <div className="input-group">
                        <span className="icon">@</span>
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            required
                        />
                    </div>

                    <label>Senha</label>
                    <div className="input-group">
                        <span className="icon">🔒</span>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            required
                        />
                        <span className="icon toggle" onClick={togglePassword}>
                            {showPassword ? <HiEyeOff /> : <HiEye />}
                        </span>
                    </div>

                    <button type="submit" className="btn">
                        {isLogin ? "Entrar" : "Criar conta"}
                    </button>
                </form>

                <p className="toggle-text">
                    {isLogin ? "Não tem conta? " : "Já tem uma conta? "}
                    <span onClick={toggleForm}>
                        {isLogin ? "Cadastre-se" : "Faça login"}
                    </span>
                </p>
            </div>
        </div>
    );
}
