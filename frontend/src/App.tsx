import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar";
import Home from "./pages/Home";
import "./App.css";
import TopBar from "./components/organisms/TopBar";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <TopBar />
      <div className="app-container">
        {/* Nawigacja widoczna na każdej stronie */}

        <Navbar />

        {/* Główna treść przełączana przez routing */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
