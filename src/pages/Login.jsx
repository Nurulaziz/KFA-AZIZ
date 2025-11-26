import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import logoKfa from '../assets/images/logo-kf.png'

function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();

    

    // tambahkann fungsi error validasi
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]:value,
        });

        if (error) {
            setError('');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password){
            setError('Plese fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            await login({
                email: formData.email,
                password: formData.password
        });
            navigate('/dashboard')
        }catch(error){
            setError('Failed to log in. Please check your credentials.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-sm d-flex flex-column justify-content-center align-items-center p-1 mb-5 vh-100 ">
            <div className="col-md-4 text-center mb-4  bg-body-tertiary rounded p-5 shadow">
            <main className="form-signin w-100 m-auto">
            <form onSubmit={handleSubmit}> 
            <img
                className="mb-4"
                src={logoKfa}
                alt=""
                height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Holy guacamole!</strong> You should check in on some of those fields below.
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            )}
            <div className="form-floating mb-2">
                <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name='email'
                value={formData.email}
                onChange={handleChange}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
                <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                name='password'
                value={formData.password}
                onChange={handleChange}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="form-check text-start my-3">
                <input
                className="form-check-input"
                type="checkbox"
                defaultValue="remember-me"
                id="checkDefault"
                />
                <label className="form-check-label" htmlFor="checkDefault">
                Remember me
                </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
                Sign in
            </button>
            <p className="mt-5 mb-3 text-body-secondary">© 2017–2025</p>
            </form>
        </main>
        </div>
        </div>


    );   
}

export default Login;