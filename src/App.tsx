import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Oneplant";
import Selectid from "./pages/Selectid";
import Create from "./pages/Create";
import Update from "./pages/Update";
import Connect from "./pages/Connect";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import { useEffect, useState } from "react";

const App = () => {
  // recuperer le token decoder pour afficher ou non des elements
  const [retourRole, setRetourRole] = useState<boolean>(false);

  useEffect(() => {
    let role = localStorage.getItem("role");
    console.log("role dans la navbar", role);
    if (role === '"admin"') {
      setRetourRole(true);
    } else {
      setRetourRole(false);
    }
  }, []);
  console.log(retourRole);

  return (
    <div>
      <BrowserRouter>
        {/* On utilise notre composant dans notre JSX */}
        <NavBar retourRole={retourRole} setRetourRole={setRetourRole} />
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/home/:id" element={<Details />} />
          <Route path="/details" element={<Details />} />
          <Route path="/selectid" element={<Selectid />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />

          <Route
            path="/connect"
            element={<Connect setRetourRole={setRetourRole} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
