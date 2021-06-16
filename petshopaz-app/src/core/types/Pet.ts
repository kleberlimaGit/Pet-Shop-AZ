export type Pet = {
    id: number;
    nome: string;
    raca: Raca;

    
}

export type Raca = {
    id: number,
    tipoRaca: string;
}


export type RacaResponse = {
    content: Raca[];
    totalPages: number;
}

export type PetResponse = {
    content:Pet[]
    totalPages:number;
}