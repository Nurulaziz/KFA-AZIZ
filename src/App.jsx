import {Link,Routes, Route} from 'react-router-dom';
import MainLayout from "../src/layouts/MainLayout.jsx";
import Home from "../src/pages/Home.jsx";

function App() {

  return (
    <>
      <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
      </Routes>
    </>
  );
}

export default App
