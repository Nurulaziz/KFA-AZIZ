import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Dashboard(){
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    

    const handleLogout = async () => {
        try{
            await logout();
            navigate('/login');
        } catch(error){
            console.error('Failed to logout', error);
        }
    };
    return(
        <div>
            <h1>Dashboard</h1>
            <p>Welcome, {user ? user.fullName: 'User'}!</p>

            <div className="container my-4">
                <div className="row g-3">
                    <div className="col-md-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body text-dark">
                        <h6 className="card-title mb-1">Total User</h6>
                        <h3 className="mb-0">1,240</h3>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body text-dark">
                        <h6 className="card-title mb-1">Sales Today</h6>
                        <h3 className="mb-0">57</h3>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body text-dark">
                        <h6 className="card-title mb-1">Pending Orders</h6>
                        <h3 className="mb-0">12</h3>
                        </div>
                    </div>
                    </div>

                    <div className="col-md-3">
                    <div className="card bg-light shadow-sm">
                        <div className="card-body text-dark">
                        <h6 className="card-title mb-1">Errors</h6>
                        <h3 className="mb-0">3</h3>
                        </div>
                    </div>
                    </div>
                </div>
                </div>


        </div>
    );
}
export default Dashboard;