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
*         headers:
*           Set-Cookie:
*             description: JWT token in httpOnly cookie
*             schema:
*               type: string
*               example: "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=Strict; Max-Age=86400"
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 success:
*                   type: boolean
*                   example: true
*                 message:
*                   type: string
*                   example: "Logged in successfully"
*       400:
*         description: Validation error
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Validation failed"
*       401:
*         description: Invalid credentials
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Invalid email or password"
*/
router.post('/login', validate(authSchema), userLogin);

router.get('/me', authenticate, (req, res) => {
  const u = req.user;
  res.json({ u });
})