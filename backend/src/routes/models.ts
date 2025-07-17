import { Router } from 'express';
import { upload } from '../middlewares/upload';
import { authenticate } from '../middlewares/authenticate';
import { handleModelUpload, getModels, getModel } from '../controllers/models';

export const router = Router();

/**
 * @openapi
 * /models:
 *   post:
 *     summary: Upload a new ML model
 *     description: Allows an authenticated user to upload a machine learning model file along with metadata such as name, description, and framework.
 *     tags:
 *       - Models
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - framework
 *               - file
 *             properties:
 *               name:
 *                 type: string
 *                 example: BERT
 *               description:
 *                 type: string
 *                 example: Pretrained transformer model for NLP tasks
 *               framework:
 *                 type: string
 *                 example: pytorch
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Model uploaded successfully
 *       '400':
 *         description: Missing or invalid fields
 *       '401':
 *         description: Unauthorized
 */
router.post('/', authenticate, upload.single('file'), handleModelUpload);

/**
 * @openapi
 * /models:
 *   get:
 *     summary: Get all ML models 
 *     description: Allows an authenticated user to upload a machine learning model file along with metadata such as name, description, and framework.
 *     tags:
 *       - Models
 *     responses:
 *       '200':
 *         description: Sucsessfull 
 *       '400':
 *         description: Missing or invalid fields
 */
router.get('/', getModels);

/**
 * @openapi
 * /models/{id}:
 *   get:
 *     summary: Get model
 *     description: Get one model by id
 *     tags:
 *       - Models
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Model Id 
 *     responses:
 *       '200':
 *         description: Sucsessfull 
 *       '400':
 *         description: Missing or invalid fields
 */
router.get('/:id', getModel);