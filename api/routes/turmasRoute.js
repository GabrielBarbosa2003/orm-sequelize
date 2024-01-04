const { Router } = require('express')
const TurmasController = require('../controllers/TurmasController.js')

const router = Router();

router.get('/turmas', TurmasController.listarTurmas)
router.get('/turmas/:id', TurmasController.listarTurmaPorID)
router.post('/turmas', TurmasController.criaTurma)
router.put('/turmas/:id', TurmasController.atualizaTurma)
router.delete('/turmas/:id', TurmasController.deletaTurma)
router.post('/turmas/:id/restaura', TurmasController.restauraTurma)

module.exports = router;