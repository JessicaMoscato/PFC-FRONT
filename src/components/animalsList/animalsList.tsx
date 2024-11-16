import React, { useState, useEffect } from "react";
import { fetchAnimals, IAnimal } from "../../api";
import "./animalsList.scss";


const Animals: React.FC = () => {
  // ! État pour stocker les animaux, l'état de chargement et les erreurs
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ! Effet pour charger les animaux au montage du composant
  useEffect(() => {
    const loadAnimals = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAnimals();
        console.log("Données récupérées:", data);
        setAnimals(data);
      } catch (err) {
        setError("Erreur lors du chargement des animaux");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAnimals();
  }, []);

  // ! Fonction pour rendre un élément d'animal
  const renderAnimal = (animal: IAnimal) => (
    <li key={animal.id} className="animal-item">
      <h2 className="animal-name">{animal.name}</h2>

      {/* Photo principale */}
      {animal.profile_photo && (
        <img
          src={
            animal.profile_photo.startsWith("http")
              ? animal.profile_photo
              : `${import.meta.env.VITE_STATIC_URL}${animal.profile_photo}`
          }
          alt={animal.name}
          className="animal-photo"
        />
      )}

      {/* Détails de l'animal */}
      <div className="animal-details">
        {animal.species && (
          <p>
            <strong></strong> {animal.species}
          </p>
        )}
        {animal.breed && (
          <p>
            <strong></strong> {animal.breed}
          </p>
        )}
        {animal.age && (
          <p>
            {animal.age} ans
            
          </p>
        )}
      </div>
    </li>
  );

  // ! Rendu du composant Animals
  return (
    <main className="Animals">
     {/*  <h1>Animaux</h1> */}
      {isLoading && <p className="loading">Chargement...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading &&
        !error &&
        (animals.length > 0 ? (
          <ul className="animal-list">{animals.map(renderAnimal)}</ul>
        ) : (
          <p>Aucun animal trouvé.</p>
        ))}
    </main>
  );
};

export default Animals;