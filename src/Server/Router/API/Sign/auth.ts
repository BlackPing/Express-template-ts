import express, { Request } from 'express';
import token from '../../../../lib/token';
import { Static } from '../../../types/static'
const router = express.Router();

router.use('*', (req, res, next) => {
	console.log('로그인 API 실행');
	next();
});

router.post('/login', (req, res) => {
  const source: Static.User = req.body;

	source.id
	source.pw

	

	const sql = `SELECT * FROM USER WHERE USER_ID = ? AND USER_PW = ?`;
	// 로그인 로직 시작
	res.send('test');
});

module.exports = router;