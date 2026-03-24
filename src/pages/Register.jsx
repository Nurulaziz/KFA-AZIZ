import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logoKfa from '../assets/images/logo-kf.png'

function Register() {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        fullName: '',
        email: '',
        password: '',
        role: 'user',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.username || !formData.fullName || !formData.email || !formData.password) {
            setError('Semua field wajib diisi.');
            return;
        }

        setLoading(true);
        try {
            await register({
                username: formData.username,
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'Gagal mendaftar. Periksa kembali data Anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-sm d-flex flex-column justify-content-center align-items-center p-1 mb-5 vh-100">
            <div className="col-md-4 text-center mb-4 bg-body-tertiary rounded p-5 shadow">
                <main className="form-signin w-100 m-auto">
                    <form onSubmit={handleSubmit}>
                        <img className="mb-4" src={logoKfa} alt="" height="57" />
                        <h1 className="h3 mb-3 fw-normal">Daftar Akun Admin</h1>

                        {error && (
                            <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                <strong>{error}</strong>
                                <button type="button" className="btn-close" onClick={() => setError('')} aria-label="Close"></button>
                            </div>
                        )}

                        <div className="form-floating mb-2">
                            <input
                                type="text"
                                className="form-control"
                                id="usernameInput"
                                placeholder="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                            />
                            <label htmlFor="usernameInput">Username</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input
                                type="text"
                                className="form-control"
                                id="fullnameInput"
                                placeholder="Nama Lengkap"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                            <label htmlFor="fullnameInput">Nama Lengkap</label>
                        </div>
                        <div className="form-floating mb-2">
                            <input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="name@example.com"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="emailInput">Alamat Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label htmlFor="passwordInput">Password</label>
                        </div>

                        <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Mendaftar...
                                </>
                            ) : 'Daftar'}
                        </button>

                        <p className="mt-3 mb-0">
                            Sudah punya akun?{' '}
                            <Link to="/login">Masuk di sini</Link>
                        </p>
                        <p className="mt-4 mb-3 text-body-secondary">© 2017–2025</p>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default Register;
