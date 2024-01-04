const Services = require('./Services')
const database = require('../models')

class PessoasServices extends Services{
    constructor(){
        super('Pessoas') // chama o construtor da classe pai, nesse caso Servicer, passando 'Pessoas'
        this.matriculas = new Services('Matriculas')
    }
    async pegaRegistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({where: {...where}})
    }
    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo]
        .scope('todos')
        .findAll({where: {...where}})
    }
    async cancelaPessoaEMatriculas(estudanteId){
        return database.sequelize.transaction(async transacao => { // para caso de b.o nas atualizaçaoes das tabales, já que mexemos cm mas q uma ao msm tempo
            await super.atualizaRegistro({ ativo:false }, estudanteId, {transaction: transacao})
            await this.matriculas.atualizaRegistros({status: 'cancelado'}, {estudante_id: estudanteId},{transaction: transacao} )
        })
    }

    async pegaMatriculaPorEstudante(estudanteId){
        const matriculas = await database[this.nomeDoModelo].findOne({ where: { id: Number(estudanteId) } })
        return matriculas.getAulasMatriculadas()
    }
   
}

module.exports = PessoasServices