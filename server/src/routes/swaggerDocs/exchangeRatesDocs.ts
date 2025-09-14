// *Get exchange rates
/**
 * @swagger
 * /api/exchangeRates:
 *   get:
 *     summary: Get latest currency exchange rates
 *     description: |
 *       -  Provides currency exchange rates sourced from **OpenExchangeRates**
 *       -  Data is refreshed daily and remains valid until the end of the current calendar day
 *       -  All rates are calculated strictly against **USD** as the base currency
 *     tags: [Exchange Rates]
 *     responses:
 *       200:
 *         description: Exchange rates data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   $ref: "#/components/utils/succesStatus"
 *                 message:
 *                   type: string
 *                   example: Exchange rates data retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     rates:
 *                       $ref: "#/components/utils/rates"
 *                     expiresAt:
 *                       $ref: "#/components/utils/expiresAt"
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
