// *Register
/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     description: >
 *       The request body must include the following required properties:
 *         - **name**: A string between 3 and 50 characters
 *         - **email**: A valid email address
 *         - **password**: A string between 8 and 50 characters, including at least one uppercase, one lowercase, and one digit
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["name", "email", "password"]
 *             properties:
 *               name:
 *                 $ref: '#/components/utils/name'
 *               email:
 *                 $ref: '#/components/utils/email'
 *               password:
 *                 $ref: '#/components/utils/password'
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message", "data"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   $ref: "#/components/utils/userData"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/DuplicateEmailError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Login
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in an existing account
 *     description: >
 *       The request body must include the following required properties:
 *         - **email**: The account's email address
 *         - **loginPassword**: The account's password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["email", "loginPassword"]
 *             properties:
 *               email:
 *                 $ref: '#/components/utils/email'
 *               loginPassword:
 *                 $ref: '#/components/utils/password'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message", "data"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: "Logged in successfully"
 *                 data:
 *                   $ref: "#/components/utils/userData"
 *       400:
 *         description: >
 *           Two possible cases:
 *             - Validation error
 *             - Wrong password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: The required data are missing or do not meet the requirements / Password is wrong
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: The account associated with this email address is managed through Google, so please authenticate using Google sign-in
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Log out
/**
 * @swagger
 * /api/users/logout:
 *   delete:
 *     summary: Log out user
 *     description: Ends the user's authentication session and clears access/refresh tokens from cookies
 *     tags: [User]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: "Logged out successfully"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Forgot password
/**
 * @swagger
 * /api/users/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     description: >
 *       The request body must include the following required properties:
 *         - **email**: The account's email address
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["email"]
 *             properties:
 *               email:
 *                 $ref: '#/components/utils/email'
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: "Request received - check your email (including spam folder) for further instructions"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: Password reset is not supported. The account associated with this email address is managed through Google sign-in
 *       404:
 *         $ref: '#/components/responses/UserNotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Update password
/**
 * @swagger
 * /api/users/update-password:
 *   patch:
 *     summary: Update account's password
 *     description: >
 *       The request body must include the following required properties:
 *         - **validationToken**: The previous endpoint sends an email with a link that contains the validationToken as a query parameter
 *         - **password**: The new password - a string between 8 and 50 characters, including at least one uppercase, one lowercase, and one digit
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["validationToken", "password"]
 *             properties:
 *               validationToken:
 *                 $ref: '#/components/utils/validationToken'
 *               password:
 *                 $ref: '#/components/utils/password'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message", "data"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *                 data:
 *                   $ref: "#/components/utils/userData"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: No user found for the given validation token
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Google auth
/**
 * @swagger
 * /api/users/google-auth/finalize:
 *   post:
 *     summary: Google Auth - Phase 2
 *     description: >
 *      Completes the **Google sign-in** process using **validation token**, from Phase 1 (**see **Overview** above*)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["validationToken"]
 *             properties:
 *               validationToken:
 *                 $ref: '#/components/utils/validationToken'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message", "data"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: "Logged in successfully"
 *                 data:
 *                   $ref: "#/components/utils/userData"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: ["status", "message"]
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: No user found for the given validation token
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
