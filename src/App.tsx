// src/App.tsx

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimalsPage from "./pages/animalPage/animalPage";
import Signup_assoPage from "./pages/signupPage/signup_assoPage";
import Signup_faPage from "./pages/signupPage/signup_faPage";
import HomePage from "./pages/homePage/homePage";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/animaux" element={<AnimalsPage />} />
        <Route path="/inscription-association" element={<Signup_assoPage />} />
        <Route path="/inscription-famille" element={<Signup_faPage />} />
        {/* Vous pouvez ajouter d'autres routes ici */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
