import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

function MainLayout() {
    return (
        <div className="main-layout">
            <Navbar />
        <main className="main-content">
            <Outlet />
        </main>
        <footer className="footer">
            <div className="container">
                <p>footer</p>
            </div>
        </footer>
    </div>

    );
}

export default MainLayout;