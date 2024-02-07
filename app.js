// server.js

const express = require('express')
const path = require('path')
const jsonServer = require('json-server')
const app = express()
const port = process.env.PORT || 3000

// JSON Server 설정
const jsonServerMiddleware = jsonServer.create()
const jsonServerRouter = jsonServer.router(path.join(__dirname, '..', 'R1-Json-Server', 'db.json'));
const jsonServerMiddlewares = jsonServer.defaults()

app.use('/api', jsonServerMiddlewares, jsonServerRouter)

// 정적 파일 제공 (Vue 앱의 빌드 파일을 포함)
app.use(express.static(path.join(__dirname, '..', 'R4-VUE-', 'docs')))

// 기본 경로를 index.html로 설정
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'R4-VUE-', 'docs', 'index.html'))
});

// 비동기 함수를 사용하는 경우, 콜백 함수나 Promise를 사용하여 데이터를 처리 가능
app.get('/data', async (req, res) => {
  try {
    const data = await fetchData()
    res.json(data)
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' })
  }
})

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

