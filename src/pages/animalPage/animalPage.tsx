// src/pages/AnimalsPage.tsx

import React from "react";
import Header from "../../components/header/header";
import AnimalsList from "../../components/animalsList/animalsList";

const AnimalsPage: React.FC = () => {
  return (
    <div className="animals-page">
      <Header />
      <main>
        <h1>Nos animaux</h1>
        <AnimalsList />
      </main>
    </div>
  );
};

export default AnimalsPage;
