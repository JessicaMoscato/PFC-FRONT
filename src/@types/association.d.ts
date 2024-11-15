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
  role: string;
  created_at: string;
  updated_at: string;
}

export interface IAssociation {
  id: number;
  representative: string;
  address: string;
  phone: string;
  description: string;
  status: string;
  profile_photo: string;
  created_at: string;
  updated_at: string;
  id_user: number;
  user: IUser;
  animals: IAnimal[];
}

export interface IAssociationForm {
  profile_photo: string;
  lastname: string;
  firstname: string;
  email: string;
  phone: string;
  address: string;
  postal_code: string;
  city: string;
  description: string;
}
