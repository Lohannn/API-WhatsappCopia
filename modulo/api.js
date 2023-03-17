/******************************************************************************************************************
 * Objetivo: Criar uma API para disponibilizar os dados necessários para um site cópia do Whatsapp feito pelo Front-End.
 * Autor: Lohannes
 * Data: 17/03/2023
 * Versão: 1.0
 ******************************************************************************************************************/

//Import das dependencias do projeto
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contatosWpp = require('./APP/main.js')

const app = express();

app.use((request, response, next) => {
    //API pública - fica disponível para utilização de qualquer aplicação.
    //API privada - somente o IP informado poderá consumir dados da API

    //Define se a API será pública ou privada.
    response.header('Access-Control-Allow-Origin', '*')

    //Permite definir quais métodos poderão ser utilizados nas requisições da API
    response.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')

    //Envia para o cors() as regras de permissão
    app.use(cors())

    next();
})

//Endpoints

//Endpoint que retornará uma lista de contatos para ser usado no front.
app.get('/v1/whatsapp/contatos/numero/:number', cors(), async function (request, response, next) {

    let statusCode;
    let dadosEstado = {};
    let numero = request.params.number

    if (numero == undefined || numero == '' || isNaN(numero) || numero == null || numero.length < 11) {
        statusCode = 400
        dadosEstado.message = 'Não foi possivel processar o número entregue, tente novamente. O número não pode ser vazio, menor que 11 dígitos e deve conter apenas números.'
    } else {
        let contatos = contatosWpp.getListaContatos(numero)

        if (numero) {
            statusCode = 200
            dadosEstado = contatos
        } else {
            statusCode = 404
            dadosEstado.message = 'Número não encontrado.\nTente novamente.'
        }
    }
    response.status(statusCode)
    response.json(dadosEstado)

})

app.listen(8080, function () {
    console.log('Servidor rodando na porta 8080');
})