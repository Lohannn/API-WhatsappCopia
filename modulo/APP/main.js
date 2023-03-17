/*********************************************************************************
 * Autor: Lohannes
 * Data: 17/03/2023
 * Objetivo: Criar funções que irão alimentar uma API que gerará as conversas
 *  e contatos de uma cópia do Whatsapp feita pelo Front-End.
 * Versão: 1.0
**********************************************************************************/

var contatosWpp = require('../JSON/contatos.js')

const getListaContatos = function (numeroDaContatos) {
    let numero = numeroDaContatos
    let listaContatosArray = [];
    let listaContatosJSON = false;

    contatosWpp.contatos["whats-users"].forEach(function (listaDePerfis){
        if(listaDePerfis.number == numero){
            listaDePerfis.contacts.forEach(function (contato){
                listaContatosArray.push(contato)
            })
        }
    })
    
    if(listaContatosArray.length > 0){
        listaContatosJSON = {}
        listaContatosJSON.contatos = listaContatosArray
    }

    return listaContatosJSON

}

module.exports = {
    getListaContatos
}