// src/App.tsx

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header"; // Import du Header
import "@fortawesome/fontawesome-free/css/all.min.css";
import Animal from "./components/animalsList/animalsList"; // Exemple de composant pour la route
/* import Signup_asso from "./components/signup_forms/signup_asso"; */
import Signup_fa from "./components/signup_forms/signup_fa";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header /> {/* Affichage du Header */}
      <main>
        <Routes>
          <Route path="/animals" element={<Animal />} />
 {/*          <Route path="/inscription-association" element={<Signup_asso />} /> */}
  {         <Route path="/inscription-famille" element={<Signup_fa />} /> }
          {/* Vous pouvez ajouter d'autres routes ici */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
