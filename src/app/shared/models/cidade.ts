export class Cidade {
    id!: number;
    nome!: string;
    microrregiao!: Microrregiao;
}

export class Microrregiao {
    id!: number;
    nome!: string;
    mesorregiao!: Mesorregiao;
}

export class Mesorregiao {
    id!: number;
    nome!: string;
    UF!: UF;
}

export class UF {
    id!: number;
    sigla!: string;
    nome!: string;
    regiao!: Regiao;
}

export class Regiao {
    id!: number;
    sigla!: string;
    nome!: string;
}


