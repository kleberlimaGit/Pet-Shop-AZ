import { Pet } from './Pet';

export type ClienteResponse = {
    content: Cliente[];
    totalPages: number;
}

export type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  telefone:string;
  pets: Pet[];
};
