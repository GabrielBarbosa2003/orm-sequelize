const { Router } = require('express')
const MatriculaController = require('../controllers/MatriculaController.js')
const router = Router();

router.get('/matricula/:estudanteId/:matriculaId', MatriculaController.pegaUmaMatricula)
router.get('/turma/matricula/:turmaId/confirmadas', MatriculaController.pegaMatriculasPorTurma)  
router.get('/matricula/lotada', MatriculaController.pegaTurmasLotadas)
router.post('/matricula/:estudanteId/estudante', MatriculaController.criaMatricula)
router.put('/matricula/:matriculaId/estudante/:estudanteId', MatriculaController.atualizaMatricula)
router.delete('/matricula/:matriculaId/estudante/:estudanteId/delete', MatriculaController.deletaMatricula)

module.exports = router