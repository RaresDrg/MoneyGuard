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
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/succesStatus"
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *                 data:
 *                   $ref: "#/components/utils/userData"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       409:
 *         $ref: '#/components/responses/ConflictError'
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
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/succesStatus"
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
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: The submitted data does not meet the requirements / Password is wrong
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
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/succesStatus"
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
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/succesStatus"
 *                 message:
 *                   type: string
 *                   example: "Password change request received. Please check your email (including spam folder) for a confirmation message."
 *       400:
 *         $ref: '#/components/responses/ValidationError'
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
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/succesStatus"
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *                 data:
 *                   $ref: "#/components/utils/userData"
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       403:
 *         description: Validation token is expired
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: Validation token is expired
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/failedStatus"
 *                 message:
 *                   type: string
 *                   example: No user found for the given validation token
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
