const { PessoasServices } = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController {
    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(pessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    static async pegaPorID(req, res) {
        const { id } = req.params
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistroPorId({id})
            return res.status(200).json(umaPessoa)


        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaPessoa(req, res) {
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res) {
        const novaInfo = req.body
        const { id } = req.params
        try {
            await pessoasServices.atualizaRegistro(novaInfo, id)
            const pessoaAtualizada = await pessoasServices.pegaUmRegistroPorId(id)
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async deletaPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.deletaRegistro(id)
            return res.status(200).json({ message: "A pessoa foi apagada com sucesso!" })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            await pessoasServices.restauraRegistro(id)
            return res.status(200).json({ message: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    // Matriculas
    // http://localhost:3000/pessoas/:estudanteId/matricula/:matriculaId

    static async pegaMatriculas(req, res) { 
        const { estudanteId } = req.params
        try {
            const matriculas = await pessoasServices.pegaMatriculaPorEstudante(estudanteId)
            return res.status(200).json(matriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res) { 
        const { estudanteId } = req.params
        try {
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({ message: `Matriculas ref. estudante ${estudanteId} canceladas !` })


        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;