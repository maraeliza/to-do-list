import TarefaForm from "./TarefaForm.js";
const TabelaElemento = document.getElementById("tabela");
const CorpoTabelaElemento = document.getElementById("corpoTabela");
const LinhaColunaElemento = document.getElementById("colunas");
const msgSucesso = document.getElementById("msgSucesso");
const msgDanger = document.getElementById("msgDanger");
const tabelaNome = document.getElementById("tabelaNome");
const tabelaDescricao = document.getElementById("tabelaDescricao");
var form;
tabelaNome.innerHTML = "Tarefas cadastradas";
var formTarefa = new TarefaForm();
form = formTarefa;
atualizarTabela(form);
document.getElementById("opTarefa").addEventListener("click", function () {
    form = formTarefa;
    atualizarTabela(form);
    tabelaNome.innerHTML = "Tarefas cadastradas";
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id == "addBtn") {
        addItemTabela(form);
    }
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id.includes("delBtn")) {
        var id = evento.target.id;
        id = id.replace("delBtn", "");
        deleteItemTabela(form, parseInt(id));
    }
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id.includes("editBtn")) {
        var id = evento.target.id;
        id = id.replace("editBtn", "");
        updateItemTabela(form, parseInt(id));
    }
});
TabelaElemento.addEventListener("click", function (evento) {
    if (evento.target.id.includes("saveBtn")) {
        var id = evento.target.id;
        id = id.replace("saveBtn", "");
        saveItemTabela(form, parseInt(id));
    }
});
function saveItemTabela(form, id) {
    if (form.update(id)) {
        atualizarTabela(form);
        mostrarMsg("Alterações salvas com sucesso!", true);
    }
    else {
        atualizarTabela(form);
        mostrarMsg("<b>Erro!</b> Não foi possível salvar as alterações!", false);
    }
}
function addItemTabela(form) {
    if (form.create()) {
        atualizarTabela(form);
        mostrarMsg("Item adicionado com sucesso!", true);
    }
    else {
        mostrarMsg("<b>Erro!</b> Não foi possível adicionar o item! <br> Preencha todos os campos antes de adicionar!", false);
    }
}
function updateItemTabela(form, id) {
    if (form.getItemByID(id)) {
        atualizarTabelaUpdate(form, id);
    }
    else {
        mostrarMsg("<b>Erro!</b> Não foi atualizar  o item!", false);
    }
}
function deleteItemTabela(form, id) {
    if (form.delete(id)) {
        atualizarTabela(form);
        mostrarMsg("Item deletado com sucesso!", true);
    }
    else {
        mostrarMsg("<b>Erro!</b> Não foi possível deletar o item!", false);
    }
}
function atualizarTabela(form) {
    var dados = form.montarTabela();
    attPrimeiraTabela(dados);
}
function attPrimeiraTabela(dados) {
    LinhaColunaElemento.innerHTML = "";
    CorpoTabelaElemento.innerHTML = "";
    LinhaColunaElemento.innerHTML = dados[0];
    CorpoTabelaElemento.innerHTML = dados[1];
    tabelaDescricao.innerHTML =
        "Total: " +
            form.Lista.length +
            " itens registrados no sistema <br>";
}
function montarData() {
    var dataFormatada = new Date().toLocaleString("pt-BR", {
        hour: "2-digit", // Hora
        minute: "2-digit",
    });
    return dataFormatada;
}
function atualizarTabelaUpdate(form, id) {
    var dados = form.montarTabelaUpdate(id);
    CorpoTabelaElemento.innerHTML = "";
    CorpoTabelaElemento.innerHTML = dados;
}
function mostrarMsg(msg, sucess) {
    if (sucess) {
        msgSucesso.style.display = "block";
        msgSucesso.innerHTML = msg;
        setTimeout(() => {
            msgSucesso.style.display = "none";
        }, 3000);
    }
    else {
        msgDanger.style.display = "block";
        msgDanger.innerHTML = msg;
        setTimeout(() => {
            msgDanger.style.display = "none";
        }, 3000);
    }
}
