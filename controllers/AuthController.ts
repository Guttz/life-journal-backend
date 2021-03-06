import { Response, Request } from 'express';
import { Inject, Service, Container } from 'typedi';
import { AuthService } from '../services/AuthService';
import JwtService from '../services/JwtService';

@Service()
class AuthController {
  @Inject()
  jwtService: JwtService = Container.get(JwtService);
  @Inject()
  authService: AuthService = Container.get(AuthService);

  login = async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;
    if (!username && !password) {
      res.status(400).send();
      return;
    }

    try {
      const user = await this.authService.findUserByUsername(username);
      if (!user) throw 'User not found';
      const isPasswordValid = await this.authService.checkIsPasswordValid(user, password);
      if (!isPasswordValid) res.status(401).send('Password not valid');
      const token = this.jwtService.createToken(user);
      user.password = 'encrypted';
      res.send({ ...user, token: 'Bearer ' + token });
    } catch (error) {
      res.status(401).send({ error });
    }
  };
}

export default AuthController;
