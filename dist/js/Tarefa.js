export default class Tarefa {
    constructor(id, titulo, descricao, prioridade, status) {
        this._id = 0;
        this._id = id;
        this._titulo = titulo;
        this._descricao = descricao;
        this._prioridade = prioridade;
        this._status = status;
    }
    getValue(coluna) {
        switch (coluna) {
            case "id":
                return this.id.toString();
            case "titulo":
                return this.titulo;
            case "descricao":
                return this.descricao;
            case "prioridade":
                return this.prioridade;
            case "status":
                return this.status ? 'feito' : 'não feito';
            default:
                return "";
        }
    }
    get id() {
        return this._id;
    }
    get titulo() {
        return this._titulo;
    }
    get descricao() {
        return this._descricao;
    }
    get prioridade() {
        return this._prioridade;
    }
    get status() {
        return this._status;
    }
    set id(valor) {
        this._id = valor;
    }
    set titulo(valor) {
        if (valor.trim() !== "") {
            this._titulo = valor;
        }
        else {
            console.log("O título não pode ser vazio.");
        }
    }
    set descricao(valor) {
        if (valor.trim() !== "") {
            this._descricao = valor;
        }
        else {
            console.log("A descrição não pode ser vazia.");
        }
    }
    set prioridade(valor) {
        const prioridadesValidas = ['baixa', 'média', 'alta'];
        if (prioridadesValidas.includes(valor)) {
            this._prioridade = valor;
        }
        else {
            console.log("A prioridade deve ser uma das seguintes opções: 'baixa', 'média', 'alta'.");
        }
    }
    set status(valor) {
        this._status = valor;
    }
}
