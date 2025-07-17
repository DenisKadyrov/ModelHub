import { Router } from 'express';
import { userLogin, userRegister } from '../controllers/users';
import { validate } from '../middlewares/validate';
import { authSchema, registerSchema } from '../db/schema/users';
import { authenticate } from '../middlewares/authenticate';

export const router = Router();

/**
* @openapi
* /users/signup:
*   post:
*     summary: Register a new user
*     tags:
*       - Users
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             required:
*               - name
*               - email
*               - password
*             properties:
*               name:
*                 type: string
*                 example: John Doe
*               email:
*                 type: string
*                 format: email
*                 example: john@example.com
*               password:
*                 type: string
*                 format: password
*                 example: mysecurepassword
*     responses:
*       201:
*         description: User created successfully
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 user:
*                   type: object
*                   properties:
*                     id:
*                       type: number
*                       example: 1
*                     email:
*                       type: string
*                       example: john@example.com
*       400:
*         description: Invalid input or user already exists
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: User already exists
*       500:
*         description: Server error
*/
router.post('/signup', validate(registerSchema), userRegister);
/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login with email and password
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: securePassword123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT access token
 *       400:
 *         description: Validation error
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', validate(authSchema), userLogin);

router.get('/me', authenticate, (req, res) => {
  const u = req.user;
  res.json({ u });
})