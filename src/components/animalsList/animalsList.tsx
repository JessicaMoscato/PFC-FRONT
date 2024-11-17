import React, { useState, useEffect } from "react";
import { GetAllAnimals } from "../../api/animal.api";
import { IAnimal } from "../../@types/animal";
import "./animalsList.scss";

const Animals: React.FC = () => {
  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<IAnimal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    breed: "",
    species: "",
    size: "",
    ageRange: "all",
  });

  const [breeds, setBreeds] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  useEffect(() => {
    document.body.classList.add("animals-page");

    const loadAnimals = async () => {
      try {
        setIsLoading(true);
        const data = await GetAllAnimals();
        setAnimals(data);
        setFilteredAnimals(data);

        // Extraire les options uniques pour les filtres
        const uniqueBreeds = Array.from(
          new Set(data.map((animal) => animal.breed))
        ).filter(Boolean);

        // Trier les races par ordre alphabétique
        const sortedBreeds = uniqueBreeds.sort((a, b) => a.localeCompare(b));

        const uniqueSpecies = Array.from(
          new Set(data.map((animal) => animal.species))
        ).filter(Boolean);
        const uniqueSizes = Array.from(
          new Set(data.map((animal) => animal.size))
        ).filter(Boolean);

        setBreeds(sortedBreeds); // Mettre les races triées
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

    return () => {
      document.body.classList.remove("animals-page");
    };
  }, []);

  const applyFilters = () => {
    let filtered = [...animals];

    if (filters.breed) {
      filtered = filtered.filter((animal) =>
        animal.breed.toLowerCase().includes(filters.breed.toLowerCase())
      );
    }

    if (filters.species) {
      filtered = filtered.filter((animal) =>
        animal.species.toLowerCase().includes(filters.species.toLowerCase())
      );
    }

    if (filters.size) {
      filtered = filtered.filter((animal) =>
        animal.size.toLowerCase().includes(filters.size.toLowerCase())
      );
    }

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

    setFilteredAnimals(filtered);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      breed: "",
      species: "",
      size: "",
      ageRange: "all",
    });
    setFilteredAnimals(animals);
  };

  const renderAnimal = (animal: IAnimal) => (
    <li key={animal.id} className="animal-item">
      <h2 className="animal-name">{animal.name}</h2>

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

  return (
    <main className="Animals">
      {isLoading && <p className="loading">Chargement...</p>}
      {error && <p className="error">{error}</p>}

      <div className="filters">
        <button
          id="reset-filters-btn"
          className="reset-btn"
          onClick={resetFilters}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

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

        <button id="apply-filters-btn" onClick={applyFilters}>
          Appliquer les filtres
        </button>
      </div>

      {!isLoading &&
        !error &&
        (filteredAnimals.length > 0 ? (
          <ul className="animal-list">{filteredAnimals.map(renderAnimal)}</ul>
        ) : (
          <p id="no-animals-found">Aucun animal trouvé</p>
        ))}
    </main>
  );
};

export default Animals;
