const swaggerJsdoc = require('swagger-jsdoc');
const m2s = require('mongoose-to-swagger');

// 모델 임포트
const User = require('../models/User');
const Board = require('../models/Board');
const Comment = require('../models/Comment');
const Performance = require('../models/Performance');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cornerthon Aurumn API',
      version: '1.0.0',
    },
    components: {
      schemas: {
        User: m2s(User),
        Board: m2s(Board),
        Comment: m2s(Comment),
        Performance: m2s(Performance),
        // 공통 응답 형식 정의
        CommonResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string' }
          }
        }
      }
    }
  },
  // 주석 분리를 위해 swagger 폴더 내 .swagger.js 확장자만 읽도록 설정
  apis: ['./swagger/*.swagger.js','./swagger/*.yaml'], 
};

const specs = swaggerJsdoc(options);
module.exports = specs;