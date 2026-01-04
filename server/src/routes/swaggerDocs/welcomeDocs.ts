// *Welcome
/**
 * @swagger
 * /:
 *   get:
 *     summary: API health check
 *     description: Returns a simple message if the API is running. If the request accepts HTML, redirects to /api-docs.
 *     tags: [Welcome]
 *     responses:
 *       200:
 *         description: API is running
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
