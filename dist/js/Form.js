export default class Form {
    constructor() {
        this.Lista = [];
        this.Total = 0;
    }
    getItemByID(id) {
        for (var i of this.Lista) {
            if (i.id == id) {
                return i;
            }
        }
        return null;
    }
    montarTabelaUpdate(id) {
        var tabela = "";
        for (var item of this.Lista) {
            tabela += "<tr>";
            if (item.id == id) {
                for (var coluna of this.getCampos()) {
                    if (coluna == "id") {
                        tabela += "<th>" + item.getValue(coluna) + "</th>";
                    }
                    else {
                        var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
                        tabela +=
                            "<th> <input class='inputTabela' id='" +
                                idInput +
                                "' value='" +
                                item.getValue(coluna) +
                                "'></th>";
                    }
                }
                tabela += this.montarColunaAcaoUpdate(item.id);
            }
            else {
                for (var coluna of this.getCampos()) {
                    tabela += "<th>" + item.getValue(coluna) + "</th>";
                }
                tabela += "<th></th>";
            }
            tabela += "</tr>";
        }
        return tabela;
    }
    delete(id) {
        //achar elemento pelo id
        for (var item of this.Lista) {
            if (item.id == id) {
                this.Lista.splice(this.Lista.indexOf(item), 1);
                return true;
            }
        }
        //remover da lista
        return false;
    }
    montarTabela() {
        var tituloTabela = "";
        var tabela = "";
        tituloTabela += "<th><input type='checkbox' id='checkAll' ></th>"; // Checkbox para selecionar todos
        for (var item of this.getCampos()) {
            if (item == 'id') {
                tituloTabela += "<th >" + item.toUpperCase() + "</th>";
            }
            else {
                tituloTabela += "<th>" + item.toUpperCase() + "</th>";
            }
        }
        tituloTabela += "<th style='text-align:center'> AÇÃO </th>";
        for (var obj of this.Lista) {
            tabela += "<tr><th><input type='checkbox' ></th>";
            for (var coluna of this.getCampos()) {
                tabela += "<th>" + obj.getValue(coluna) + "</th>";
            }
            tabela += this.montarColunaAcao(obj.id);
            tabela += "</tr>";
        }
        tabela += this.montarLinhaAdd();
        return [tituloTabela, tabela];
    }
    montarLinhaAdd() {
        var linhaAdd = "<tr><th>a</th>";
        for (var coluna of this.getCampos()) {
            var idInput = coluna.toLocaleLowerCase().replace(/ /g, "_");
            if (coluna == 'id') {
                linhaAdd += "<th>" + this.Total + "</th>";
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
    montarColunaAcao(id) {
        var linha = "<th class=acao>";
        linha +=
            " <button class='btm' id='editBtn" +
                id +
                "' ><img id='editBtn" +
                id +
                "' src='./imgs/edit.png' ></button> ";
        linha +=
            " <button class='btm' id='delBtn" +
                id +
                "'><img  id='delBtn" +
                id +
                "' src='./imgs/del.png'></button> ";
        linha += "</th>";
        return linha;
    }
    montarColunaAcaoUpdate(id) {
        var linha = "<th class=acao>";
        linha +=
            " <button class='btm' id='saveBtn" +
                id +
                "' ><img id='saveBtn" +
                id +
                "' src='./imgs/save.png' ></button> ";
        linha += "</th>";
        return linha;
    }
}
