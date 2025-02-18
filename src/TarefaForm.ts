import { listaPrioridades } from "./data.js";
import Form from "./Form.js";
import Tarefa from "./Tarefa.js";

export default class TarefaForm extends Form {
  Lista: Tarefa[] = [];

  constructor() {
    super();
    this.Total++;
    this.Lista = [];
    this.addItensIniciais();
  }

  addItemLista(tarefa: Tarefa) {
    this.Total++;
    this.Lista.push(tarefa);
  }

  addItensIniciais() {
    this.addItemLista(new Tarefa(this.Total, "Estudar TypeScript", "Estudar os conceitos básicos de TypeScript", "alta", true));
    this.addItemLista(new Tarefa(this.Total, "Comprar leite", "Comprar leite na loja perto de casa", "média", true));
    this.addItemLista(new Tarefa(this.Total, "Fazer a lição de casa", "Fazer a lição de matemática", "alta", false));
  }

  create(): boolean {
    var tituloElemento = <HTMLInputElement>document.getElementById("titulo");
    var descricaoElemento = <HTMLInputElement>document.getElementById("descricao");
    var prioridadeElemento = <HTMLInputElement>document.getElementById("prioridade");

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

  update(id: number): boolean {
    var alterado = false;

    var tituloElemento = <HTMLInputElement>document.getElementById("titulo");
    var descricaoElemento = <HTMLInputElement>document.getElementById("descricao");
    var prioridadeElemento = <HTMLInputElement>document.getElementById("prioridade");
    var statusElemento = <HTMLInputElement>document.getElementById("status");

    if (typeof id == "number" && id != 0) {
      var tarefa = <Tarefa>this.getItemByID(id);
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


      
    }
    return alterado;
  }

  getCampos(): Array<string> {
    return ["id", "titulo", "descricao", "prioridade", "status"];
  }

  getTarefaByTitulo(titulo: string): Tarefa {
    for (var tarefa of this.Lista) {
      var tituloTarefa = tarefa.titulo.toLocaleLowerCase().replace(/ /g, "_").split(" ").join("_");
      if (tituloTarefa == titulo) {
        return tarefa;
      }
    }
    return null;
  }
  montarLinhaAdd(): string {
    var linhaAdd = "<tr><th><input type='checkbox' id='checkAll' ></th>";

    for (var coluna of this.getCampos()) {
      var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
      if (coluna == "id") {
        linhaAdd += "<th>" + this.Total + "</th>";
      } else if (coluna == "prioridade") {
        //montar select com todos os clientes
        linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
        for (var prioridade of listaPrioridades ) {
          var valorInput = prioridade.nome
            .toLocaleLowerCase()
            .replace(/ /g, "_")
            .split(" ")
            .join("_");
          linhaAdd += "<option value=" + valorInput + ">" + prioridade.nome + "</option>";
        }
        linhaAdd += "</select></th>";
      } else if (coluna == "status") {
        //montar select com todos os clientes
        linhaAdd += "<th> <select class='inputTabela' id='" + idInput + "'>";
        
          linhaAdd += "<option value='feito'>Concluído</option>";
          linhaAdd += "<option value='nãofeito'>Pendente</option>";
        
        linhaAdd += "</select></th>";
      }else {
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
  getNomes(): Array<string> {
    var nomes: string[] = [];
    for (var tarefa of this.Lista) {
      nomes.push(tarefa.titulo);
    }
    return nomes;
  }
}
