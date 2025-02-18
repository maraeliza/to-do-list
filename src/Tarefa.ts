import IItem from "./IItem.js";

export default class Tarefa implements IItem {
  private _id: number = 0;
  private _titulo: string;
  private _descricao: string;
  private _prioridade: string;
  private _status: boolean;  

  constructor(
    id: number,
    titulo: string,
    descricao: string,
    prioridade: string,
    status: boolean
  ) {
    this._id = id;
    this._titulo = titulo;
    this._descricao = descricao;
    this._prioridade = prioridade;
    this._status = status;
  }

  getValue(coluna: string): string {
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
        return this.status?'feito':'não feito';
      default:
        return "";
    }
  }

  public get id(): number {
    return this._id;
  }
  
  public get titulo(): string {
    return this._titulo;
  }

  public get descricao(): string {
    return this._descricao;
  }

  public get prioridade(): string {
    return this._prioridade;
  }

  public get status(): boolean {
    return this._status;
  }

  public set id(valor: number) {
    this._id = valor;
  }

  public set titulo(valor: string) {
    if (valor.trim() !== "") {
      this._titulo = valor;
    } else {
      console.log("O título não pode ser vazio.");
    }
  }

  public set descricao(valor: string) {
    if (valor.trim() !== "") {
      this._descricao = valor;
    } else {
      console.log("A descrição não pode ser vazia.");
    }
  }

  public set prioridade(valor: string) {
    const prioridadesValidas = ['baixa', 'média', 'alta'];
    if (prioridadesValidas.includes(valor)) {
      this._prioridade = valor;
    } else {
      console.log("A prioridade deve ser uma das seguintes opções: 'baixa', 'média', 'alta'.");
    }
  }

  public set status(valor: boolean) {
    
      this._status = valor;
    
  }
}
