import 'reflect-metadata';
import { Service } from 'typedi';
import { User } from '../db/entity/User';
import * as jwt from 'jsonwebtoken';

@Service()
export default class JwtService {
  private jwtSecret = process.env.JWT_SECRET || 'test';

  createToken(user: User) {
    return jwt.sign({ userId: user.id, username: user.username },
      this.jwtSecret, { expiresIn: '24h' }
    )
  }

  checkJwtToken(token: string) {
    try {
      let verifiedToken = jwt.verify(token, this.jwtSecret);
      return verifiedToken
    } catch (error) {
      throw error;
    }
  }
}