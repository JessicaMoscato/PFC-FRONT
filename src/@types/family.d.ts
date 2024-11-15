interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "family" | "association";
  created_at: string;
  updated_at: string;
}

export interface IFamily {
  id: number;
  address: string;
  postal_code: string;
  city: string;
  phone: string;
  number_of_children: number;
  number_of_animals: number;
  garden: boolean;
  description: string;
  profile_photo: string;
  id_user: number;
  created_at: string;
  updated_at: string;
  animalsFamily: [];
  user: IUser;
  profile_file: File | null;
}

export interface IFamilyForm {
  profile_file: File | null;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  garden: boolean;
  number_of_children: number;
  number_of_animals: number;
  description: string;
}
