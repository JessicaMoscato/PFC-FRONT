// src/pages/AnimalsPage.tsx

import React from "react";
import AnimalsList from "../../components/animalsList/animalsList";
import "./animalPage.scss";

const AnimalsPage: React.FC = () => {
  return (
    <div className="animals-page">
      
   
      <main>
        <AnimalsList />
      </main>
    </div>
  );
};

export default AnimalsPage;
