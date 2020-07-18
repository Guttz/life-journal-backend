import { getRepository } from 'typeorm';
import { Service, Container } from 'typedi';
import { User } from '../db/entity/User';
import { UserRepository } from './../db/repository/UserRepository';

@Service()
export class AuthService {
  async findUserByUsername(username: string): Promise<User> {
    try {
      //const userRepository = getRepository(User);
      const userRepository = Container.get(UserRepository);
      return userRepository.findOneOrFail({ username });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async checkIsPasswordValid(user: User, password: string): Promise<boolean> {
    return user.checkIfPasswordIsValid(password);
  }
}
