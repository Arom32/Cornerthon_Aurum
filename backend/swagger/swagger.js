require("dotenv").config();
const swaggerJsdoc = require('swagger-jsdoc');
const port = process.env.PORT;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cornerthon Aurumn API',
      version: '1.0.0',
      description: '문화예술 커뮤니티 플랫폼 아우름 API',
    },
    servers: [
      { url: `http://localhost:${port}`, description: 'Local Server' },
    ],
  },
  apis: ['./routes/*.js',
     './swagger/*.js'], 
  
};

const specs = swaggerJsdoc(options);
module.exports = specs; 