import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/organisms/Navbar";
import Home from "./pages/Home";
import "./App.css";
import TopBar from "./components/organisms/TopBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/organisms/Footer";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Fleet from "./pages/Fleet";

function App() {
  return (
    <Router>
      <TopBar />
      <div className="app-container">
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/FAQ" element={<Faq />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Fleet" element={<Fleet />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
