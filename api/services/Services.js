const database = require('../models')

class Services{
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }
    async pegaTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll()
    }
    async pegaUmRegistroPorId(where={}){
        return database[this.nomeDoModelo].findOne({ where: {...where} })
        
    }
    async criaRegistro(dados){
        return database[this.nomeDoModelo].create(dados)
    }
    async atualizaRegistro(dadosAtualizados,id, transacao = {}){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, {where: {id: id}}, transacao)
    }
    async atualizaRegistros(dadosAtualizados,where, transacao = {}){
        return database[this.nomeDoModelo]
            .update(dadosAtualizados, {where: {...where}}, transacao)
    }
    async deletaRegistro(where = {}){
        return database[this.nomeDoModelo].destroy({ where: {...where} })
    }
    async restauraRegistro(id){
        return database[this.nomeDoModelo].restore({ where: { id: Number(id) } })
    }

    async pegaEContaRegistro(where = {}, agregadores = {}){
        return await database[this.nomeDoModelo].findAndCountAll({
            where: {...where}, ...agregadores})
    }
}

module.exports = Services