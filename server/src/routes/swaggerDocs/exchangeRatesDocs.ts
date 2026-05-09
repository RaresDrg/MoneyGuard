// *Get exchange rates
/**
 * @swagger
 * /api/exchange-rates:
 *   get:
 *     summary: Get latest currency exchange rates
 *     description: |
 *       -  Provides currency exchange rates sourced from **OpenExchangeRates**
 *       -  Data is refreshed daily and remains valid until the end of the current calendar day
 *       -  All rates are calculated strictly against **USD** as the base currency
 *     tags: [Exchange Rates]
 *     security:
 *       - SessionAuth: []
 *     responses:
 *       200:
 *         description: Exchange Rates Retrieved Successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/successStatus"
 *                 message:
 *                   type: string
 *                   example: Exchange rates data retrieved successfully
 *                 data:
 *                   $ref: "#/components/schemas/ExchangeRates"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       429:
 *         $ref: '#/components/responses/RateLimitError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *       502:
 *         $ref: '#/components/responses/BadGatewayError'
 */
