import express, { Request } from 'express';
import jwt from 'jsonwebtoken';
import secret from '../Config/Secret';

class JwtService {
	static getUserIdFromRequest = (req: Request): string | null => {
		// const token = this.extractTokenFromRequest(req);
		const token: any = req.query.token;
		if(!token) {
			return null;
		}
		const jwtPayload = this.decodeJWT(token);
		console.log(jwtPayload);
		return (jwtPayload as any)?._id || null;
	}

	static extractTokenFromRequest = (req: Request): string | undefined => {
		const TOKEN_PREFIX = 'Bearer ';
		const auth = req.headers.authorization;
		const token = auth?.includes(TOKEN_PREFIX) ? auth.split(TOKEN_PREFIX)[1] : auth

		return token;
	}

	// 토큰을 decode 해주는 함수
	static decodeJWT = (token: string) => {
		try {
			const decodedToken = jwt.verify(token, secret)
			return decodedToken;
		} catch {
			return null;
		}
	}

	// 토큰을 만들어주는 함수
	static createJWT = async (user: string): Promise<string> => {
		const token = jwt.sign(
			{ _id: user },
			secret,
			{ expiresIn: '5m' }
		);
		return token;
	}
}

// router.use('*', (req, res, next) => {
// 	console.log('api middle');
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	next();
// });

// router.get('/_tokenCheck', (req, res) => {
// 	res.send(JwtService.getUserIdFromRequest(req))
// });

// router.get('/_tokenCreate', (req, res) => {
// 	JwtService.createJWT('김범해').then((token) => {		
// 		res.send(token);
// 	});
// });

export default JwtService;