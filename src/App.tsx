import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Oneplant";
import Selectid from "./pages/Selectid";
import Create from "./pages/Create";
import Update from "./pages/Update";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* On utilise notre composant dans notre JSX */}
        <NavBar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:id" element={<Details />} />
          <Route path="/details" element={<Details />} />
          <Route path="/selectid" element={<Selectid />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
