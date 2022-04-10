import express, { Request } from 'express';
import token from '../../../../lib/token';
const router = express.Router();

router.use('*', (req, res, next) => {
	console.log('로그인 API 실행');
	next();
});

router.post('/login', (req, res) => {
  const source: object = req.body;

	// 로그인 로직 시작
	res.send('test');
});

module.exports = router;