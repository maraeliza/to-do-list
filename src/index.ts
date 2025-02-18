
import Form from "./Form.js";
import TarefaForm from "./TarefaForm.js";

const TabelaElemento = document.getElementById("tabela");
const CorpoTabelaElemento = document.getElementById("corpoTabela");
const LinhaColunaElemento = document.getElementById("colunas");

const msgSucesso = document.getElementById("msgSucesso");
const msgDanger = document.getElementById("msgDanger");

const tabelaNome = document.getElementById("tabelaNome");
const tabelaDescricao = document.getElementById("tabelaDescricao");

var form: Form;
tabelaNome.innerHTML = "Tarefas cadastradas";
var formTarefa = new TarefaForm()
form = formTarefa; 
atualizarTabela(form);

document.getElementById("opTarefa").addEventListener("click", function () {
  form = formTarefa;
  atualizarTabela(form);
  tabelaNome.innerHTML = "Tarefas cadastradas";

});

TabelaElemento.addEventListener("click", function (evento) {
  if ((<HTMLElement>evento.target).id == "addBtn") {
    addItemTabela(form);
  }
});

TabelaElemento.addEventListener("click", function (evento) {
  if ((<HTMLElement>evento.target).id.includes("delBtn")) {
    var id = (<HTMLElement>evento.target).id;
    id = id.replace("delBtn", "");
    deleteItemTabela(form, parseInt(id));
  }
});
TabelaElemento.addEventListener("click", function (evento) {
  if ((<HTMLElement>evento.target).id.includes("editBtn")) {
    var id = (<HTMLElement>evento.target).id;
    id = id.replace("editBtn", "");
    updateItemTabela(form, parseInt(id));
  }
});
TabelaElemento.addEventListener("click", function (evento) {
  if ((<HTMLElement>evento.target).id.includes("saveBtn")) {
    var id = (<HTMLElement>evento.target).id;
    id = id.replace("saveBtn", "");
    saveItemTabela(form, parseInt(id));
  }
});
TabelaElemento.addEventListener("click", function (evento) {
  if ((<HTMLElement>evento.target).id.includes("check")) {
    var id = (<HTMLElement>evento.target).id;
    id = id.replace("check", "");
    
  }
});
function saveItemTabela(form: Form, id: number) {
  if (form.update(id)) {
    atualizarTabela(form);
    mostrarMsg("Alterações salvas com sucesso!", true);
  } else {
    atualizarTabela(form);
    mostrarMsg("<b>Erro!</b> Não foi possível salvar as alterações!", false);
  }
}
function addItemTabela(form: Form) {
  if (form.create()) {
    atualizarTabela(form);
    mostrarMsg("Item adicionado com sucesso!", true);
  } else {
    mostrarMsg(
      "<b>Erro!</b> Não foi possível adicionar o item! <br> Preencha todos os campos antes de adicionar!",
      false
    );
  }
}

function updateItemTabela(form: Form, id: number) {
  if (form.getItemByID(id)) {
    atualizarTabelaUpdate(form, id);
  } else {
    mostrarMsg("<b>Erro!</b> Não foi atualizar  o item!", false);
  }
}
function deleteItemTabela(form: Form, id: number) {
  if (form.delete(id)) {
    atualizarTabela(form);

    mostrarMsg("Item deletado com sucesso!", true);
  } else {
    mostrarMsg("<b>Erro!</b> Não foi possível deletar o item!", false);
  }
}

function atualizarTabela(form: Form) {
  var dados = form.montarTabela();

  attPrimeiraTabela(dados);
  
}
function attPrimeiraTabela(dados: string[]) {
  LinhaColunaElemento.innerHTML = "";
  CorpoTabelaElemento.innerHTML = "";

  LinhaColunaElemento.innerHTML = dados[0];
  CorpoTabelaElemento.innerHTML = dados[1];
  tabelaDescricao.innerHTML =
    "Total: " +
    form.Lista.length +
    " itens registrados no sistema <br>";
}

function montarData(): string {
  var dataFormatada = new Date().toLocaleString("pt-BR", {
    hour: "2-digit", // Hora
    minute: "2-digit",
  });
  return dataFormatada;
}
function atualizarTabelaUpdate(form: Form, id: number) {
  var dados = form.montarTabelaUpdate(id);


    CorpoTabelaElemento.innerHTML = "";
    CorpoTabelaElemento.innerHTML = dados;
  
}

function mostrarMsg(msg: string, sucess: boolean) {
  if (sucess) {
    (<HTMLElement>msgSucesso).style.display = "block";
    (<HTMLElement>msgSucesso).innerHTML = msg;
    setTimeout(() => {
      (<HTMLElement>msgSucesso).style.display = "none";
    }, 3000);
  } else {
    (<HTMLElement>msgDanger).style.display = "block";
    (<HTMLElement>msgDanger).innerHTML = msg;
    setTimeout(() => {
      (<HTMLElement>msgDanger).style.display = "none";
    }, 3000);
  }
}
