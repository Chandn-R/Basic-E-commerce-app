import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
    {/* data-theme={theme} */}
      <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme="forset">
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App 