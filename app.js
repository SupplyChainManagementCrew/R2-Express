// /home/playdata/code/R2-Express/server.js

const express = require('express');
const path = require('path');
const jsonServer = require('json-server');
const app = express();
const port = process.env.PORT || 3001;

// json-server 설정
const jsonServerMiddleware = jsonServer.create();
const jsonServerRouter = jsonServer.router(path.join(__dirname, '..', 'R1-Json-server', 'db.json')); // 수정된 부분
const jsonServerMiddlewares = jsonServer.defaults();

app.use('/api', jsonServerMiddlewares, jsonServerRouter);

// 정적 파일 제공 (Vue 앱의 빌드 파일을 포함)
app.use(express.static(path.join(__dirname, '..', 'R4-VUE-', 'docs'))); // 수정된 부분

// 기본 경로를 index.html로 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'R4-VUE-', 'docs', 'index.html')); // 수정된 부분
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

