class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, carnivoro: false }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, carnivoro: false }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, carnivoro: true }] }
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const especieInfo = this.animais[animal];
        const tamanhoTotal = especieInfo.tamanho * quantidade;
        const carnivoro = especieInfo.carnivoro;

        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            // Verificar se o bioma é adequado
            if (!especieInfo.biomas.some(bioma => recinto.bioma.includes(bioma))) {
                continue;
            }

            // Verificar incompatibilidade com outros carnivoros no recinto
            const animaisCarnivoros = recinto.animais.some(a => a.carnivoro);
            if ((carnivoro && recinto.animais.length > 0 && !animaisCarnivoros) ||
                (!carnivoro && animaisCarnivoros)) {
                continue;
            }

            // Verificar espaço disponível no recinto
            let espacoOcupado = recinto.animais.reduce((total, a) => total + a.quantidade * this.animais[a.especie].tamanho, 0);
            if (recinto.animais.length > 1 || (recinto.animais.length === 1 && recinto.animais[0].especie !== animal)) {
                espacoOcupado += 1; 
            }

            const espacoLivre = recinto.tamanho - espacoOcupado;
            if (espacoLivre >= tamanhoTotal) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoLivre - tamanhoTotal} total: ${recinto.tamanho})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
