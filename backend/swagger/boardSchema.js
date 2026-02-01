/**
 * @swagger
 * components:
 *   schemas:
 *     BoardInput:
 *       type: object
 *       required:
 *         - category
 *         - title
 *         - content
 *       properties:
 *         category:
 *           type: string
 *           enum: [review, question, notice, general, trade]
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         PerformId:
 *           type: string
 *           description: Performance ObjectId
 *         price:
 *           type: number
 *
 *     BoardUpdate:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           enum: [review, question, notice, general, trade]
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         price:
 *           type: number
 *         tradeStatus:
 *           type: string
 *           enum: [available, reserved, completed]
 *
 *     BoardResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         category:
 *           type: string
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         creator:
 *           type: string
 *         PerformId:
 *           type: string
 *         price:
 *           type: number
 *         tradeStatus:
 *           type: string
 *         countLikes:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
