interface Prioridade {
    nome: "alta" | "média" | "baixa"
    cor: string
}

export const listaPrioridades: Prioridade[] = [
    { nome: "alta", cor: "red" },     
    { nome: "média", cor: "yellow" }, 
    { nome: "baixa", cor: "green" }   
]

 