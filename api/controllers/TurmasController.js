const database = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {TurmasServices} = require('../services')
const turmasService = new TurmasServices()

class TurmasController {
    static async listarTurmas(req, res) {
        const {data_inicial, data_final} = req.query
        const where = {}
        data_inicial || data_final ? where.data_inicio = {} : null
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
        data_final ? where.data_inicio[Op.lte] = data_final : null
        try {
            const buscaTurmas = await turmasService.pegaTodosOsRegistros()
            return res.status(200).json(buscaTurmas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    // static async listarTurmas(req, res) {
    //     try {
    //         const buscaTurmas = await database.Turmas.findAll()
    //         return res.status(200).json(buscaTurmas)
    //     } catch (error) {
    //         return res.status(500).json(error.message)
    //     }
    // }
    static async listarTurmaPorID(req, res) {
        const { id } = req.params;
        try {
            const listarTurmaPorID = await turmasService.pegaUmRegistroPorId({ id: Number(id) })
            return res.status(200).json(listarTurmaPorID)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaTurma(req, res) {
        const novoTurma = req.body
        try {
            const TurmaCriado = await turmasService.criaRegistro(novoTurma)
            return res.status(200).json(TurmaCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaTurma(req, res) {
        const novaInfoTurma = req.body
        const { id } = req.params
        try {
            await turmasService.atualizaRegistro(novaInfoTurma, { id: Number(id) })
            const TurmaAtualizado = await turmasService.pegaUmRegistroPorId({ id: Number(id) })
            return res.status(200).json(TurmaAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async deletaTurma(req, res) {
        const { id } = req.params
        try {
            await turmasService.deletaRegistro({ id: Number(id) })
            return res.status(200).json({ message: "O Turma foi apagada com sucesso!" })
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    static async restauraTurma(req, res){
        const { id } = req.params
        try {
            await database.Pessoas.restore({where : {id:Number(id)}})
            return res.status(200).json({message: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = TurmasController;