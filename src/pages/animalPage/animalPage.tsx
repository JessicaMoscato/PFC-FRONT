// src/pages/AnimalsPage.tsx

import React from "react";
import Header from "../../components/header/header";
import AnimalsList from "../../components/animalsList/animalsList";
import "./animalPage.scss";

const AnimalsPage: React.FC = () => {
  return (
    <div className="animals-page">
      <Header />
      <h1>Nos animaux</h1>
      <main>
        <AnimalsList />
      </main>
    </div>
  );
};

export default AnimalsPage;
