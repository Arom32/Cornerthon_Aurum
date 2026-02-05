require("dotenv").config({ quiet: true })
const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect")
const app = express();
const port = process.env.PORT;
const { updatePrfList } = require('./services/performanceSync');

const frontendPort = process.env.FRONTEND_PORT || 5173 || 5174;

// CORS 설정
const corsOptions = {
  
  // 프론트엔드 주소를 명확히 입력 (마지막 '/' 제외)
  origin: [
    'http://localhost:'+frontendPort,
    'http://localhost:5173',
    'http://localhost:5174',
  ],
  // 자격 증명(Cookie, Authorization Header 등) 허용
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH', 'OPTIONS'], // 허용 메서드 명시
  allowedHeaders: ['Content-Type', 'Authorization']
};  

app.use(cors(corsOptions));

// 미들웨어 설정
app.use(express.json());

// 쿠키 파서
app.use(cookieParser());

// Swagger 연동
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swagger/swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// KOPIS 테스트 라우트
const testRouter = require('./routes/kopisTest');
app.use('/test', testRouter);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Cornerthon Team 2 Server is Running!');
});

// 공연 전시 관련 라우트
const performanceRouter = require('./routes/performanceRoutes');
app.use('/api/performances', performanceRouter);

// 게시물 관련 라우트
const boardRouter = require('./routes/boardRoutes');
app.use('/api/boards', boardRouter);

// 댓글 관련 라우트
const commentRouter = require('./routes/commentRoutes');
app.use('/api/comments', commentRouter);

// 유저 관련 라우트
const userRouter = require('./routes/userRoutes');
app.use('/api/user', userRouter);

const userTitleRouter = require('./routes/userTitleRoutes');
app.use('/api/titles', userTitleRouter);

if(false){ // 서버 새로 열 때 외부 데이터로 리로드 , debug 용
  try {
      console.log('\n[BE] Initial data collection starting...');
      updatePrfList(); 
} catch (err) {
      console.error('[BE] Initial collection failed:', err.message);
}}



dbConnect()
  .then(() => {
    // DB 연결이 성공해야만 서버를 시작함
    app.listen(port, () => {
      console.log(`[BE] Server is running on http://localhost:${port}`);
      console.log(`[BE] Swagger Docs available at http://localhost:${port}/api-docs\n`);
    });
  })
  .catch((err) => {
    console.error('[BE] MongoDB Connection Failed:', err);
    process.exit(1); // 연결 실패 시 프로세스 종료
  });
