const database = require('../models')
const Sequelize = require('sequelize')
const {MatriculasServices} = require('../services')
const matriculasServices = new MatriculasServices()

class MatriculaController{
    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            const umaMatricula = await matriculasServices.pegaUmRegistroPorId({estudante_id:Number(estudanteId), id: Number(matriculaId)})
            return res.status(200).json(umaMatricula)

        } catch (error) {
            return res.status(500).json(error.message)

        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }
        try {
            const novaMatriculaCriada = await matriculasServices.criaRegistro(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res) {
        const novaInfo = req.body
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.atualizaRegistros(novaInfo, {id: Number(matriculaId),estudante_id: Number(estudanteId)})

            const matriculaAtualizada = await matriculasServices.pegaUmRegistroPorId({ id: Number(matriculaId) })
            return res.status(200).json(matriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params
        try {
            await matriculasServices.deletaRegistro(
                {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            )
            return res.status(200).json({ message: "A matricula foi apagada com sucesso!" })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params
        try {
            const todasAsMatriculas = await matriculasServices.pegaEContaRegistro(
                {turma_id:turmaId, status:'confirmado'},
                { 
                limit: 20,  // util pra fazer paginaçao
                order: [['estudante_id', 'DESC']] // [["coluna, "crescente/decrescente""]]
                }
            ) 
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async pegaTurmasLotadas(req, res) {
        const lotacaoTurma = 2
        try {
            const turmasLotadas = await matriculasServices.pegaEContaRegistro(
                {status: 'confirmado'},
                {
                attributes: ['turma_id'], // a coluna que vai ser retornada
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
                }
            )
            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = MatriculaController