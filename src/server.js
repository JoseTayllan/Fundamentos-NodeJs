//const http = require('http');
// Padão de importações / CommonJS => require
//Novo Padrão ESModule => import/export

// Criar um usuário(nome;email;senha) req=Receber essas informações res=Enviar essas informações
// Rotas
// Adicionar um usuário
//Editar um usuário
//Deletar um usuário

//HTTP
// - Método HTTP
// - URL

//GET, POST, PUT,PaTCH, DELETE

//GET = Buscar uma recurso do back-end
//POST = Criar uma recurso no back-end
//PUT = Editar/atualizar uma recurso no back-end
//PATCH = Alterar uma informação especifica de um recurso no back-end
//DELETE = Deletar uma recurso no back-end

//Metodos HTTP + Recurso = Rota

// GET /users => Buscando usuarios do back-end
// POST /users => Criando um usuario no back-end
//statefull => Ddos salvos em Memoria, tem estado, o servidor tem estado, o cliente tem estado
//stateless => nao tem estado, o servidor nao tem estado, o cliente nao tem estado
//JSON = JavaScript Object Notation
//cabeçalhos (Requisição/resposta)=> Metadados

//HTTP status codes => 2xx, 3xx, 4xx, 5xx
// Status codes 201 => Criado com sucesso
import { BADQUERY } from 'dns'
import http from 'http'
import { routes } from './routes.js'
import { json } from './middlewares/json.js'
import { extractQueryParams } from './utils/extract-query-params.js'

//? Query params => URL Stateful = envir imformações que não são senciveis, filtros, buscas
//todo Route params => Identificação de recurso
//* Request body => 

//!UUID => Unique Universal ID Identifier


const server = http.createServer(async(req, res) => {
    const { method, url } = req

    await json(req, res)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })
    //console.log(route)

    if(route){
       const routeParams = req.url.match(route.path)
      //console.log(routeParams.groups)
      //console.log(extractQueryParams(routeParams.groups.query))
      const {query, ...params} = routeParams.groups

      req.params = params
      req.query = query ? extractQueryParams(query) :{}
      // console.log(params)

       return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(3333)