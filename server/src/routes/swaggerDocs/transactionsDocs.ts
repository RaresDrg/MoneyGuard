// *Add transaction
/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add a transaction
 *     description: >
 *       The request body must include the following required properties:
 *         - **type**: Must be one of the allowed values: "income" or "expense"
 *         - **category**: Must be one of the predefined categories, depending on the selected transaction type (**see **schema**)*
 *         - **sum**: A number greater than 0 and less than 100,000,000
 *         - **date**: A valid ISO date, within the allowed range (**see **schema**)*
 *         - **comment**: A string between 5 and 200 characters
 *     tags: [Transactions]
 *     security:
 *       - SessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["type", "category", "sum", "date", "comment"]
 *             properties:
 *               type:
 *                 $ref: '#/components/utils/type'
 *               category:
 *                 $ref: '#/components/utils/category'
 *               sum:
 *                 $ref: '#/components/utils/sum'
 *               date:
 *                 $ref: '#/components/utils/date'
 *               comment:
 *                 $ref: '#/components/utils/comment'
 *     responses:
 *       201:
 *         description: Transaction added successfully
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
 *                   example: "Transaction added successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     addedTransaction:
 *                       $ref: "#/components/utils/transactionData"
 *                     updatedBalance:
 *                       type: number
 *                       description: The updated account balance after adding this transaction
 *                       example: 1000
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Get transactions
/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get transactions
 *     description: |
 *       - Allows optional query parameters: **limit**, **cursor**, and **sort** to control pagination and sorting behavior
 *       - Returns an empty array when no transactions are found
 *     parameters:
 *       - in: query
 *         name: limit
 *         description: An optional integer between 1 and 30 that controls how many transactions to return. If omitted, all transactions will be returned
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 30
 *       - in: query
 *         name: cursor
 *         description: Optional transaction ID used for pagination, referencing the last item from the previous page. If omitted, pagination starts from the beginning
 *         schema:
 *           type: string
 *       - in: query
 *         name: sort
 *         description: Optional sorting direction. If omitted, the default sorting is ascending
 *         schema:
 *           type: string
 *           enum: ["ascending", "descending"]
 *     tags: [Transactions]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Successful response. Returns a list of transactions or an empty array if none are found
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
 *                   example: "Transactions retrieved successfully / Looks like there's nothing here for now"
 *                 data:
 *                   type: object
 *                   properties:
 *                     transactions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/utils/transactionData'
 *       400:
 *         $ref: '#/components/responses/QueryParamsError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Update transaction
/**
 * @swagger
 * /api/transactions/{transactionID}:
 *   put:
 *     summary: Update a transaction
 *     description: >
 *       The request body must include the following required properties:
 *         - **type**: Must be one of the allowed values: "income" or "expense"
 *         - **category**: Must be one of the predefined categories, depending on the selected transaction type (**see **schema**)*
 *         - **sum**: A number greater than 0 and less than 100,000,000
 *         - **date**: A valid ISO date, within the allowed range (**see **schema**)*
 *         - **comment**: A string between 5 and 200 characters
 *     parameters:
 *       - $ref: "#/components/utils/transactionIDParam"
 *     tags: [Transactions]
 *     security:
 *       - SessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: ["type", "category", "sum", "date", "comment"]
 *             properties:
 *               type:
 *                 $ref: '#/components/utils/type'
 *               category:
 *                 $ref: '#/components/utils/category'
 *               sum:
 *                 $ref: '#/components/utils/sum'
 *               date:
 *                 $ref: '#/components/utils/date'
 *               comment:
 *                 $ref: '#/components/utils/comment'
 *     responses:
 *       200:
 *         description: Transaction updated successfully
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
 *                   example: "Transaction updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     updatedTransaction:
 *                       $ref: "#/components/utils/transactionData"
 *                     updatedBalance:
 *                       type: number
 *                       description: The updated account balance after updating this transaction
 *                       example: 1000
 *       400:
 *         description: >
 *           Two possible cases:
 *             - Validation error: the required data are missing or do not meet the requirements
 *             - Invalid transaction ID format
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
 *                   example: The submitted data does not meet the requirements / Invalid ID format in URL
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/TransactionNotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Delete transaction
/**
 * @swagger
 * /api/transactions/{transactionID}:
 *   delete:
 *     summary: Delete a transaction
 *     parameters:
 *       - $ref: "#/components/utils/transactionIDParam"
 *     tags: [Transactions]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
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
 *                   example: "Transaction deleted successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     deletedTransaction:
 *                       $ref: "#/components/utils/transactionData"
 *                     updatedBalance:
 *                       type: number
 *                       description: The updated account balance after deleting this transaction
 *                       example: 1000
 *       400:
 *         $ref: '#/components/responses/CastError'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         $ref: '#/components/responses/TransactionNotFoundError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Get categories
/**
 * @swagger
 * /api/transactions/categories:
 *   get:
 *     summary: Get transactions categories
 *     description: Returns all available transaction categories, grouped by type
 *     tags: [Categories]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
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
 *                   example: Categories retrieved successfully
 *                 data:
 *                   $ref: '#/components/utils/categoriesData'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */

// *Get statistics
/**
 * @swagger
 * /api/transactions/statistics:
 *   get:
 *     summary: Get statistics
 *     description: >
 *       Requires two query parameters: **startDate** and **endDate**, both in ISO format, defining the time range for statistical analysis
 *     parameters:
 *       - $ref: "#/components/utils/startDate"
 *       - $ref: "#/components/utils/endDate"
 *     tags: [Statistics]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
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
 *                   example: Statistics retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     statistics:
 *                       $ref: "#/components/utils/statisticsData"
 *       400:
 *         description: >
 *           Two possible cases:
 *             - Validation error
 *             - Start Date > End Date
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
 *                   example: One or more query parameters have an invalid format / Start Date must be before End Date
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       404:
 *         description: Not found
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
 *                   example: No statistics available for this period
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
