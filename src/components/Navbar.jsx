import logo from '../assets/images/kfa-logo.png'
import Login from '../pages/Login';
import { Link } from "react-router-dom";


function Navbar (){
    return (
        <>
            <nav className="navbar navbar-expand-lg  shadow p-3 bg-light-subtle text-light-emphasis">
  <div className="container">
    <a className="navbar-brand" href="#">
        <img
        src={logo}
        alt="kfa-logo"
        height="50"
        className="d-inline-block align text-top"
        />
        </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">About</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Produk & Layanan</a>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
       <Link to="/login" className="ms-auto">
  <button
    type="button"
    className="btn"
    style={{
      backgroundColor: 'var(--primaryAccent)',
      color: 'white'
    }}
  >
    Login
  </button>
</Link>
    </div>
  </div>
</nav>
        </>
    );
}

export default Navbar;