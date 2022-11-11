import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Oneplant";
import Selectid from "./pages/Selectid";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
