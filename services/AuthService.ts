import { getRepository } from 'typeorm';
import { Service, Container } from 'typedi';
import { User } from '../db/entity/User';
import { UserRepository } from './../db/repository/UserRepository';

@Service()
export class AuthService {
  async findUserByUsername(username: string) {
    try {
      console.log('---------AUTHSERVICE');
      const userRepository = Container.get(UserRepository);
      console.log(userRepository);
      //const userRepository = getRepository(User);
      console.log(userRepository);
      const user = await userRepository.findOneOrFail({ username });
      return user;
    } catch (err) {
      console.log('CATCHED ERRRORRRRRRRRRRRR' + err);
    }
  }

  async checkIsPasswordValid(user: User, password: string) {
    return await user.checkIfPasswordIsValid(password);
  }
}
