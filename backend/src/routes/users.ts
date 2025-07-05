import { Router } from 'express';
import { userRegister } from '../controllers/users';
import { validate } from '../middlewares/validate';
import { registerSchema } from '../db/schema/users';

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
