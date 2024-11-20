interface IAnimal {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  age: number;
  size: string;
  description: string;
  profile_photo: string;
  photo1: string;
  photo2: string;
  photo3: string;
  id_association: number;
  id_family: number | null;
  created_at: string;
  updated_at: string;
}

interface IUser {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "association";
  created_at: string;
  updated_at: string;
}

export interface IAssociation {
  id: number;
  lastname: string;
  firstname: string;
  representative: string;
  rna_number: string;
  address: string;
  postal_code: string;
  city: string;
  phone: string | null;
  description: string;
  status: string;
  profile_photo: string | undefined;
  profile_file: File | undefined;
  created_at: string;
  updated_at: string;
  id_user: number;
  user: IUser;
  animals: IAnimal[];
}

export interface IAssociationForm {
  profile_file: File | null;
  representative: string | null | undefined;
  rna_number: string | null | undefined;
  lastname: string | null | undefined;
  firstname: string | null | undefined;
  email: string | null | undefined;
  phone: string | null | undefined;
  address: string | null | undefined;
  postal_code: string | null | undefined;
  city: string | null | undefined;
  description: string | null | undefined;
  user?: Partial<IUser>;
}
