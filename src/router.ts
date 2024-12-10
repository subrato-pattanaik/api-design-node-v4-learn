import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './handlers/product'
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update'

const router = Router()

/**
 * Products api
 */
router.get('/product', getProducts)

router.get('/product/:id', getProduct)

router.post('/product', body('name').isString(), handleInputErrors, createProduct)

router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct)

router.delete('/product/:id', deleteProduct)

/**
 * Updates api
 */
router.get('/update', getUpdates)

router.get('/update/:id', getOneUpdate)

router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate,
)

router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate,
)

router.delete('/update/:id', deleteUpdate)

/**
 * Update point
 */
router.get('/updatepoint', () => {})

router.get('/updatepoint/:id', () => {})

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {},
)
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {},
)

router.delete('/updatepoint/:id', () => {})

export default router
