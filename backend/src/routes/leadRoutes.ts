import { Router } from 'express'
import { getLeads, createLead, updateLead, deleteLead, getLead } from '../controllers/leadController'
import { protect } from '../middleware/auth'

const router = Router()

router.use(protect)

router.get('/', getLeads)
router.post('/', createLead)
router.get('/:id', getLead)
router.put('/:id', updateLead)
router.delete('/:id', deleteLead)

export default router