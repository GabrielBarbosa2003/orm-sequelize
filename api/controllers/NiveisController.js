const Services = require('../services/Services')
const niveisServicer = new Services('Niveis')

class NiveisController {
    static async listarNiveis(req, res) {
        try {
            const buscaNiveis = await niveisServicer.pegaTodosOsRegistros()
            return res.status(200).json(buscaNiveis)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async listarNivelPorID(req, res) {
        const { id } = req.params;
        try {
            const listarNivelPorID = await niveisServicer.pegaUmRegistroPorId({ id: Number(id) })
            return res.status(200).json(listarNivelPorID)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async criaNiveis(req, res) {
        const novoNivel = req.body
        try {
            const NivelCriado = await niveisServicer.criaRegistro(novoNivel)
            return res.status(200).json(NivelCriado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async atualizaNiveis(req, res) {
        const novaInfoNivel = req.body
        const { id } = req.params
        try {
            await niveisServicer.atualizaRegistros(novaInfoNivel, { id: Number(id) })
            const nivelAtualizado = await niveisServicer.pegaUmRegistroPorId({ id: Number(id) })
            return res.status(200).json(nivelAtualizado)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
    static async deletaNiveis(req, res) {
        const { id } = req.params
        try {
            await niveisServicer.deletaRegistro({ id: Number(id) })
            return res.status(200).json({ message: "O nivel foi apagado com sucesso!" })
        } catch (error) {
            return res.status(500).json(error.message)
        }

    }
    static async restauraNiveis(req, res){
        const { id } = req.params
        try {
            await niveisServicer.restauraRegistro(id)
            return res.status(200).json({message: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}
module.exports = NiveisController;