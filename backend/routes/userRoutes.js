/**
 * @swagger
 * tags:
 *   - name: Boards
 *     description: 게시물 관리 API
 */

/**
 * @swagger
 * /api/boards:
 *   post:
 *     summary: 게시물 작성
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardInput'
 *     responses:
 *       201:
 *         description: 작성 성공
 *       400:
 *         description: 필수 항목 누락
 */
router.post('/', controller.createPost);

/**
 * @swagger
 * /api/boards/{id}:
 *   patch:
 *     summary: 게시물 수정
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BoardUpdate'
 *     responses:
 *       200:
 *         description: 수정 성공
 */
router.patch('/:id', controller.updatePost);

/**
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     summary: 게시물 삭제
 *     tags:
 *       - Boards
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 삭제 성공
 */
router.delete('/:id', controller.deletePost);

module.exports = router;
