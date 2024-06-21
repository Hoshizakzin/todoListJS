'use strict';

//BANCO DE TAREFAS
var banco = [
    {'tarefa':'Terminar Curso', 'status':''},
    {'tarefa':'Começar outro Curso', 'status':'checked'},
    {'tarefa':'Prática rotineira', 'status':'checked'}
];

const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));
 
//SCRIPT PARA CRIAR LABEL NA TELA
const criarItem = (texto, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${texto}</div>
    <input type="button" value="X" data-indice=${indice}>
    `;
    document.getElementById('todoList').appendChild(item);
}

//SCRIPT PARA LIMPAR A TELA SEMPRE QUE UMA NOVA ATUALIZAÇÃO NO BANCO FOR FEITA
const filtrarListagem = () => {
    const listagem = document.getElementById('todoList');
    while (listagem.firstChild){
        listagem.removeChild(listagem.lastChild);
    }
}

//SCRIPT PARA ATUALIZAR A TELA COM OS DADOS ARMAZENADOS NO BANCO
const atualizarTela = () => {
    filtrarListagem();
    const banco = getBanco();
    banco.forEach((retorno, indice) => criarItem(retorno.tarefa, retorno.status, indice));
}

//SCRIPT PARA SUBIR NOVOS DADOS DO BANCO NA TELA
const cadastrarItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status':''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = '';
    }
}

//SCRIPT PARA REMOVER UM ITEM NO BANCO
const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

//SCRIPT PARA CLASSIFICAR O ITEM
const classificarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

//SCRIPT PARA VER QUAL ITEM DA TODO LIST FOI CKICADO
const itemClicado = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    } else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        classificarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', cadastrarItem);
document.getElementById('todoList').addEventListener('click', itemClicado);

atualizarTela();