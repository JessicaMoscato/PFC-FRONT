import React, { useState, useEffect } from "react";
import { GetAllAnimals } from "../../api/animal.api";
import { IAnimal } from "../../@types/animal";
import "./animalsList.scss";

const Animals: React.FC = () => {
  // Déclare les états pour gérer les animaux, les filtres et les erreurs
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

  // États pour stocker les options uniques des filtres
  const [breeds, setBreeds] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  // Effet pour charger les données des animaux au montage du composant
  useEffect(() => {
    document.body.classList.add("animals-page"); // Ajoute une classe pour la page actuelle

    const loadAnimals = async () => {
      try {
        setIsLoading(true); // Indique que les données sont en cours de chargement
        const data = await GetAllAnimals();
        setAnimals(data); // Stocke tous les animaux récupérés
        setFilteredAnimals(data); // Initialise les animaux filtrés avec toutes les données

        // Récupère des valeurs uniques pour les filtres (race, espèce, taille)
        const uniqueBreeds = Array.from(
          new Set(data.map((animal) => animal.breed))
        ).filter(Boolean);

        // Trie les races par ordre alphabétique
        const sortedBreeds = uniqueBreeds.sort((a, b) => a.localeCompare(b));

        const uniqueSpecies = Array.from(
          new Set(data.map((animal) => animal.species))
        ).filter(Boolean);
        const uniqueSizes = Array.from(
          new Set(data.map((animal) => animal.size))
        ).filter(Boolean);

        setBreeds(sortedBreeds); // Met à jour les races triées
        setSpecies(uniqueSpecies); // Met à jour les espèces uniques
        setSizes(uniqueSizes); // Met à jour les tailles uniques
      } catch (err) {
        setError("Erreur lors du chargement des animaux"); // Gère une éventuelle erreur
        console.error(err);
      } finally {
        setIsLoading(false); // Indique que le chargement est terminé
      }
    };
    loadAnimals();

    return () => {
      document.body.classList.remove("animals-page"); // Nettoie la classe au démontage
    };
  }, []);

  // Fonction pour appliquer les filtres sur la liste des animaux
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

    setFilteredAnimals(filtered); // Met à jour la liste filtrée
  };

  // Gère les changements dans les filtres
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Réinitialise tous les filtres
  const resetFilters = () => {
    setFilters({
      breed: "",
      species: "",
      size: "",
      ageRange: "all",
    });
    setFilteredAnimals(animals); // Réinitialise la liste des animaux affichés
  };

  //! Fonction pour rendre l'affichage d'un animal
  // Fonction qui génère l'affichage d'un animal sous forme d'élément de liste
const renderAnimal = (animal: IAnimal) => (
  <li key={animal.id} className="animal-item">
    {/* Affichage du nom de l'animal */}
    <h2 className="animal-name">{animal.name}</h2>

    {/* Affichage de la photo de l'animal si elle existe */}
    {animal.profile_photo && (
      <img
        src={
          // Vérifie si l'URL de la photo de profil commence par "http"
          // Si c'est le cas, cela signifie que l'URL est absolue, donc elle est utilisée directement
          animal.profile_photo.startsWith("http")
            ? animal.profile_photo
            : 
         // Sinon, l'URL est relative (chemin /public/images côté back).
        // Dans ce cas, elle est complétée avec une URL de base définie dans les variables d'environnement (VITE_STATIC_URL --> sans le /api).
        // Cela permet de construire une URL complète pour accéder correctement à l'image.
              `${import.meta.env.VITE_STATIC_URL}${animal.profile_photo}`
        }
        alt={animal.name}
        className="animal-photo"
      />
    )}

    {/* Détails supplémentaires sur l'animal */}
    <div className="animal-details">
      {/* Affichage de l'espèce si elle est disponible */}
      {animal.species && (
        <p>
          <strong>Espèce:</strong> {animal.species}
        </p>
      )}
      {/* Affichage de la race si elle est disponible */}
      {animal.breed && (
        <p>
          <strong>Race:</strong> {animal.breed}
        </p>
      )}
      {/* Affichage de l'âge si disponible */}
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
    {/* Message de chargement si les données sont en cours de récupération */}
    {isLoading && <p className="loading">Chargement...</p>}

    {/* Message d'erreur si une erreur est survenue lors du chargement */}
    {error && <p className="error">{error}</p>}

    {/* Section des filtres pour affiner la recherche */}
    <div className="filters">
      {/* Bouton pour réinitialiser tous les filtres */}
      <button
        id="reset-filters-btn"
        className="reset-btn"
        onClick={resetFilters}
      >
        <i className="fa-solid fa-xmark"></i>
      </button>

      {/* Filtre par race */}
      <select name="breed" value={filters.breed} onChange={handleFilterChange}>
        <option value="">Filtrer par race</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      {/* Filtre par espèce */}
      <select name="species" value={filters.species} onChange={handleFilterChange}>
        <option value="">Filtrer par espèce</option>
        {species.map((species) => (
          <option key={species} value={species}>
            {species}
          </option>
        ))}
      </select>

      {/* Filtre par taille */}
      <select name="size" value={filters.size} onChange={handleFilterChange}>
        <option value="">Filtrer par taille</option>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>

      {/* Filtre par tranche d'âge */}
      <select name="ageRange" value={filters.ageRange} onChange={handleFilterChange}>
        <option value="all">Filtrer par âge</option>
        <option value="under-2">Moins de 2 ans</option>
        <option value="2-7">Entre 2 et 7 ans</option>
        <option value="over-7">Plus de 7 ans</option>
      </select>

      {/* Bouton pour appliquer les filtres */}
      <button id="apply-filters-btn" onClick={applyFilters}>
        Appliquer les filtres
      </button>
    </div>

    {/* Affichage des résultats filtrés */}
    {!isLoading &&
      !error &&
      (filteredAnimals.length > 0 ? (
        <ul className="animal-list">
          {filteredAnimals.map(renderAnimal)} {/* Affichage de chaque animal */}
        </ul>
      ) : (
        // Message si aucun animal ne correspond aux filtres
        <p id="no-animals-found">Aucun animal trouvé</p>
      ))}
  </main>
);

};
export default Animals;
