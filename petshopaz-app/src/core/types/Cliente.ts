import { Pet } from './Pet';

export type ClienteResponse = {
    content: Cliente[];
    totalPages: number;
}

export type Cliente = {
  id: number;
  nome: string;
  numero: number;
  bairro: string;
  logradouro: string;
  cidade: string;
  cep: string;
  uf: string;
  telefone:string;
  pets: Pet[];
};
