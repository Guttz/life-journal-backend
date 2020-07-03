import { Request, Response, NextFunction } from 'express';
import { Container, Inject } from 'typedi';

import JwtService from '../services/JwtService';

class JwtMiddleware {
  @Inject()
  private jwtService: JwtService;

  checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers["authorization"];
    
    try {
      const jwtPayload = this.jwtService.checkJwtToken(token);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      res.status(401).send(error)
      return;
    }

    next();
  }
}

export default Container.get(JwtMiddleware);