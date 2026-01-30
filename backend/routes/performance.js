const express = require('express');
const router = express.Router();
const controller = require('../controllers/performance');

/**
 * @swagger
 * tags:
 *   name: Performances
 *   description: 공연 정보 관리 API
 */

/**
 * @swagger
 * /api/performances:
 *   get:
 *     summary: 공연 목록 조회 (검색/필터)
 *     tags: [Performances]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: 페이지 번호 (기본 1)
 * 
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: 검색어 (제목, 장소)
 * 
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *         description: 장르 필터
 * 
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, views, likes, rating, end]
 *         description: 정렬 기준
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', controller.getList);

/**
 * @swagger
 * /api/performances/ranking:
 *   get:
 *     summary: 추천 랭킹 조회 (TOP 10)
 *     tags: [Performances]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/ranking', controller.getRanking);

/**
 * @swagger
 * /api/performances/{id}:
 *   get:
 *     summary: 공연 상세 조회
 *     tags: [Performances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 공연 ID (mt20id)
 *     responses:
 *       200:
 *         description: 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: 공연 상세 정보
 */
router.get('/:id', controller.getDetail);

module.exports = router;