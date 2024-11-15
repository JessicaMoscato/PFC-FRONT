export interface IBreed {
  name: string;
  slug: string;
}

export interface IBreeds {
  [key: string]: IBreed[];
}
