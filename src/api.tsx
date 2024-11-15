import axios, { AxiosResponse } from "axios";
import { IAnimal } from "../src/@types/animal";


// !Définit l'URL de base de l'API. Assurez-vous que cette URL est correcte pour votre backend
const API_URL = import.meta.env.VITE_API_URL;

// !Crée une instance Axios configurée avec l'URL de base de l'API
const api = axios.create({
  baseURL: API_URL,
});


// !Fonction pour obtenir la liste des animaux
export const fetchAnimals = async (): Promise<IAnimal[]> => {
  try {
    // Effectue une requête GET à l'API pour récupérer la liste des animaux.
    const response: AxiosResponse<IAnimal[]> = await api.get("/animal");
    
    // Retourne les données de la réponse, qui contiennent la liste des animaux.
    return response.data; 
  } catch (error) {
    // Vérifie si l'erreur est une erreur Axios (c'est-à-dire une erreur liée à la requête HTTP).
    if (axios.isAxiosError(error)) {
      // Si c'est une erreur Axios, affiche un message d'erreur dans la console.
      // Affiche soit les données d'erreur retournées par l'API, soit le message d'erreur général.
      console.error(
        "Erreur lors de la récupération des animaux:",
        error.response?.data || error.message
      );
    } else {
      // Si ce n'est pas une erreur Axios, affiche un message d'erreur générique.
      console.error(
        "Une erreur inconnue s'est produite lors de la récupération des animaux:",
        error
      );
    }
    
    // Relève l'erreur pour qu'elle puisse être gérée par l'appelant de cette fonction.
    throw error; 
  }
};

export type { IAnimal };
