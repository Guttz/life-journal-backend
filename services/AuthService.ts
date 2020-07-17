import { getRepository } from 'typeorm';
import { Service, Container } from 'typedi';
import { User } from '../db/entity/User';
import { UserRepository } from './../db/repository/UserRepository';

@Service()
export class AuthService {
  async findUserByUsername(username: string) {
    try {
      const userRepository = Container.get(UserRepository);
      //const userRepository = getRepository(User);
      const user = await userRepository.findOneOrFail({ username });
      return user;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async checkIsPasswordValid(user: User, password: string) {
    return await user.checkIfPasswordIsValid(password);
  }
}
