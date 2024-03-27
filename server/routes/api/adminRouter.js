import express from 'express'
import { getStats } from '../../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.get('/stats', getStats)

export default adminRouter