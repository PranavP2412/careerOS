import { BrowserRouter, Routes, Route } from "react-router-dom";
import CareerOSHome from "./components/main.jsx";
import Predictor from "./components/Predictor.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CareerOSHome />} />
        <Route path="/predict" element={<Predictor />} />
      </Routes>
    </BrowserRouter>
  );
}