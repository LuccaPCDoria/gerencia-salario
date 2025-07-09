import { supabase } from "../services/supabase";

function Dashboard() {
    async function logout() {
        await supabase.auth.signOut();
    }

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <button onClick={logout}>Sair</button>
        </div>
    );
}

export default Dashboard;
