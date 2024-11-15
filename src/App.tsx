// src/App.tsx

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header/header"; // Import du Header
import "@fortawesome/fontawesome-free/css/all.min.css";


import Animal from "./components/animalsList/animalsList"; // Exemple de composant pour la route

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header /> {/* Affichage du Header */}
      <main>
        <Routes>
          <Route path="/animals" element={<Animal />} />
          {/* Vous pouvez ajouter d'autres routes ici */}
        </Routes>
      </main>
     {/*  <Footer /> */} 
    </BrowserRouter>
  );
};

export default App;
