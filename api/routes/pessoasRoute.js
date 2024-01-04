const { Router } = require('express')
const PessoaController = require('../controllers/PessoaController.js')
const MatriculaController = require('../controllers/MatriculaController.js')

const router = Router();

router.get('/pessoas', PessoaController.pegaTodasAsPessoas)
router.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.pegaPorID)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.deletaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.restauraPessoa)
router.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)


module.exports = router; 