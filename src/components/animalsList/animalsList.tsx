import React, { useState, useEffect } from "react";
import { GetAllAnimals } from "../../api/animal.api";
import { IAnimal } from "../../@types/animal";
import "./animalsList.scss";

const Animals: React.FC = () => {
  // ! État pour stocker les animaux, l'état de chargement, les erreurs, et les filtres
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([]); // Etat pour animaux filtrés
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    breed: "",
    species: "",
    size: "",
    ageRange: "all", // Ajout du filtre âge
  });

  // ! États pour les options des filtres
  const [breeds, setBreeds] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  // ! Effet pour charger les animaux au montage du composant
  useEffect(() => {
    // Ajouter une classe spécifique au body
    document.body.classList.add("animals-page");

    const loadAnimals = async () => {
      try {
        setIsLoading(true);
        const data = await GetAllAnimals();
        console.log("Données récupérées:", data);
        setAnimals(data);
        setFilteredAnimals(data); // Initialiser avec tous les animaux

        // Extraire les options uniques pour les filtres
        const uniqueBreeds = Array.from(
          new Set(data.map((animal) => animal.breed))
        ).filter(Boolean);
        const uniqueSpecies = Array.from(
          new Set(data.map((animal) => animal.species))
        ).filter(Boolean);
        const uniqueSizes = Array.from(
          new Set(data.map((animal) => animal.size))
        ).filter(Boolean);

        setBreeds(uniqueBreeds);
        setSpecies(uniqueSpecies);
        setSizes(uniqueSizes);
      } catch (err) {
        setError("Erreur lors du chargement des animaux");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadAnimals();

    // Nettoyer l'effet au démontage du composant
    return () => {
      document.body.classList.remove("animals-page");
    };
  }, []);

  // ! Fonction pour appliquer les filtres
  const applyFilters = () => {
    let filtered = [...animals];

    // Filtrage par race
    if (filters.breed) {
      filtered = filtered.filter((animal) =>
        animal.breed.toLowerCase().includes(filters.breed.toLowerCase())
      );
    }

    // Filtrage par espèce
    if (filters.species) {
      filtered = filtered.filter((animal) =>
        animal.species.toLowerCase().includes(filters.species.toLowerCase())
      );
    }

    // Filtrage par taille
    if (filters.size) {
      filtered = filtered.filter((animal) =>
        animal.size.toLowerCase().includes(filters.size.toLowerCase())
      );
    }

    // Filtrage par âge
    if (filters.ageRange !== "all") {
      if (filters.ageRange === "under-2") {
        filtered = filtered.filter((animal) => animal.age < 2);
      } else if (filters.ageRange === "2-7") {
        filtered = filtered.filter(
          (animal) => animal.age >= 2 && animal.age <= 7
        );
      } else if (filters.ageRange === "over-7") {
        filtered = filtered.filter((animal) => animal.age > 7);
      }
    }

    setFilteredAnimals(filtered); // Met à jour la liste filtrée
  };

  // ! Fonction pour gérer le changement de filtre
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // ! Fonction pour réinitialiser les filtres
  const resetFilters = () => {
    setFilters({
      breed: "",
      species: "",
      size: "",
      ageRange: "all",
    });
    setFilteredAnimals(animals); // Remet la liste filtrée à tous les animaux
  };

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
            <strong>Espèce:</strong> {animal.species}
          </p>
        )}
        {animal.breed && (
          <p>
            <strong>Race:</strong> {animal.breed}
          </p>
        )}
        {animal.age && (
          <p>
            <strong>Âge:</strong> {animal.age} ans
          </p>
        )}
      </div>
    </li>
  );

  // ! Rendu du composant Animals
  return (
    <main className="Animals">
      {isLoading && <p className="loading">Chargement...</p>}
      {error && <p className="error">{error}</p>}

      {/* Formulaire de filtrage */}
      <div className="filters">
        <select
          name="breed"
          value={filters.breed}
          onChange={handleFilterChange}
        >
          <option value="">Filtrer par race</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>

        <select
          name="species"
          value={filters.species}
          onChange={handleFilterChange}
        >
          <option value="">Filtrer par espèce</option>
          {species.map((species) => (
            <option key={species} value={species}>
              {species}
            </option>
          ))}
        </select>

        <select name="size" value={filters.size} onChange={handleFilterChange}>
          <option value="">Filtrer par taille</option>
          {sizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>

        <select
          name="ageRange"
          value={filters.ageRange}
          onChange={handleFilterChange}
        >
          <option value="all">Filtrer par âge</option>
          <option value="under-2">Moins de 2 ans</option>
          <option value="2-7">Entre 2 et 7 ans</option>
          <option value="over-7">Plus de 7 ans</option>
        </select>

        <button onClick={applyFilters}>Appliquer les filtres</button>
        {/* Bouton pour réinitialiser les filtres */}
        <button onClick={resetFilters}>Réinitialiser les filtres</button>
      </div>

      {/* Affichage des animaux filtrés */}
      {!isLoading &&
        !error &&
        (filteredAnimals.length > 0 ? (
          <ul className="animal-list">{filteredAnimals.map(renderAnimal)}</ul>
        ) : (
          <p>Aucun animal trouvé.</p>
        ))}
    </main>
  );
};

export default Animals;
