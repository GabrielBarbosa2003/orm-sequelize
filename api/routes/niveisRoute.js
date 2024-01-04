const { Router } = require('express')
const NiveisController = require('../controllers/NiveisController.js')

const router = Router();

router.get('/niveis', NiveisController.listarNiveis)
router.get('/niveis/:id', NiveisController.listarNivelPorID)
router.post('/niveis', NiveisController.criaNiveis)
router.put('/niveis/:id', NiveisController.atualizaNiveis)
router.delete('/niveis/:id', NiveisController.deletaNiveis)
router.post('/niveis/:id/restaura', NiveisController.restauraNiveis)

module.exports = router;