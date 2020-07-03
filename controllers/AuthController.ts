import { Response, Request, NextFunction } from 'express';
import { Inject, Container } from 'typedi';
import AuthService from '../services/AuthService';
import JwtService from '../services/JwtService';

class AuthController {
  @Inject()
  private jwtService: JwtService;
  @Inject()
  private authService: AuthService;

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username && !password) {
      res.status(400).send();
      return;
    }

    try {
      const user = await this.authService.findUserByUsername(username);
      const isPasswordValid = await this.authService.checkIsPasswordValid(user, password);
      if (!isPasswordValid) return res.status(401).send();
      const token = this.jwtService.createToken(user);

      res.send({ id: user.id, token })
    } catch (error) {
      return res.status(401).send({ error });
    }
  }
}

export default Container.get(AuthController);