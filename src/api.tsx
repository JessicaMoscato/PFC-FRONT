import axios from "axios";

//! Configuration de base
const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
});

//! Fonction utilitaire pour gérer les erreurs
export const handleApiError = (error: unknown, context: string) => {
  if (axios.isAxiosError(error)) {
    console.error(
      `Erreur lors de ${context}:`,
      error.response?.data || error.message
    );
  } else {
    console.error(
      `Une erreur inconnue s'est produite lors de ${context}:`,
      error
    );
  }
  throw error;
};
