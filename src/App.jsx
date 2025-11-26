import {Link,Routes, Route} from 'react-router-dom';
import MainLayout from "../src/layouts/MainLayout.jsx";
import Home from "../src/pages/Home.jsx";
import Login from "../src/pages/Login.jsx"
import Dashboard from './pages/Dashboard.jsx';
import Register from './pages/Register.jsx';

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
}

export default App
