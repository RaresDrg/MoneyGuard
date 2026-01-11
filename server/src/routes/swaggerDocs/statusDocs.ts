// *Status
/**
 * @swagger
 * /health-check:
 *   get:
 *     summary: Check API status
 *     description: Returns the current operational status of the API service
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: API is running
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
