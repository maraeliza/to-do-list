import { listaPrioridades } from "./data.js";
import Form from "./Form.js";
import Tarefa from "./Tarefa.js";
export default class TarefaForm extends Form {
    constructor() {
        super();
        this.Lista = [];
        this.Total++;
        this.Lista = [];
        this.addItensIniciais();
    }
    addItemLista(tarefa) {
        this.Total++;
        this.Lista.push(tarefa);
    }
    addItensIniciais() {
        this.addItemLista(new Tarefa(this.Total, "Estudar TypeScript", "Estudar os conceitos básicos de TypeScript", "alta", true));
        this.addItemLista(new Tarefa(this.Total, "Comprar leite", "Comprar leite na loja perto de casa", "média", true));
        this.addItemLista(new Tarefa(this.Total, "Fazer a lição de casa", "Fazer a lição de matemática", "alta", false));
    }
    create() {
        var tituloElemento = document.getElementById("titulo");
        var descricaoElemento = document.getElementById("descricao");
        var prioridadeElemento = document.getElementById("prioridade");
        var titulo = tituloElemento.value;
        if (titulo.length > 0) {
            var descricao = descricaoElemento.value;
            if (descricao.length > 0) {
                var prioridade = prioridadeElemento.value;
                if (['baixa', 'média', 'alta'].includes(prioridade)) {
                    var newTarefa = new Tarefa(this.Total, titulo, descricao, prioridade, false);
                    this.addItemLista(newTarefa);
                    return true;
                }
            }
        }
        return false;
    }
    update(id) {
        var alterado = false;
        var tituloElemento = document.getElementById("titulo");
        var descricaoElemento = document.getElementById("descricao");
        var prioridadeElemento = document.getElementById("prioridade");
        var statusElemento = document.getElementById("status");
        if (typeof id == "number" && id != 0) {
            var tarefa = this.getItemByID(id);
            var titulo = tituloElemento.value;
            if (titulo.length > 0 && tarefa.titulo != titulo) {
                tarefa.titulo = titulo;
                alterado = true;
            }
            var descricao = descricaoElemento.value;
            if (descricao.length > 0 && tarefa.descricao != descricao) {
                tarefa.descricao = descricao;
                alterado = true;
            }
            var prioridade = prioridadeElemento.value;
            if (['baixa', 'média', 'alta'].includes(prioridade) && tarefa.prioridade != prioridade) {
                tarefa.prioridade = prioridade;
                alterado = true;
            }
            var status = statusElemento.value;
            tarefa.status = ['feito', 'não feito'].includes(status);
            alterado = true;
        }
        return alterado;
    }
    getCampos() {
        return ["id", "titulo", "descricao", "prioridade", "status"];
    }
    getTarefaByTitulo(titulo) {
        for (var tarefa of this.Lista) {
            var tituloTarefa = tarefa.titulo.toLocaleLowerCase().replace(/ /g, "_").split(" ").join("_");
            if (tituloTarefa == titulo) {
                return tarefa;
            }
        }
        return null;
    }
    montarLinhaAdd() {
        var linhaAdd = "<tr><th><input type='checkbox' id='checkAll' ></th>";
        for (var coluna of this.getCampos()) {
            var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
            if (coluna == "id") {
                linhaAdd += "<th>" + this.Total + "</th>";
            }
            else if (coluna == "prioridade") {
                //montar select com todos os clientes
                linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
                for (var prioridade of listaPrioridades) {
                    var valorInput = prioridade.nome
                        .toLocaleLowerCase()
                        .replace(/ /g, "_")
                        .split(" ")
                        .join("_");
                    linhaAdd += "<option value=" + valorInput + ">" + prioridade.nome + "</option>";
                }
                linhaAdd += "</select></th>";
            }
            else if (coluna == "status") {
                //montar select com todos os clientes
                linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
                linhaAdd += "<option value='feito'>Concluído</option>";
                linhaAdd += "<option value='nãofeito'>Pendente</option>";
                linhaAdd += "</select></th>";
            }
            else {
                linhaAdd +=
                    "<th> <input class='inputTabela' id='" +
                        idInput +
                        "' placeholder='" +
                        coluna +
                        "...'></th>";
            }
        }
        linhaAdd +=
            "<th class=acao> <button class='btm'><img id='addBtn' src='./imgs/add.png'></button> </th>";
        linhaAdd += "</tr>";
        return linhaAdd;
    }
    getNomes() {
        var nomes = [];
        for (var tarefa of this.Lista) {
            nomes.push(tarefa.titulo);
        }
        return nomes;
    }
}
