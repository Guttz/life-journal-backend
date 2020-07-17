import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import { User } from '../db/entity/User';

@Service()
export class AuthService {
  async findUserByUsername(username: string) {
    console.log("---------AUTHSERVICE")
    console.log(getRepository);
    const userRepository = getRepository(User);
    console.log(userRepository);
    const user = await userRepository.findOneOrFail({ username });
    return user;
  }

  async checkIsPasswordValid(user: User, password: string) {
    return await user.checkIfPasswordIsValid(password);
  }
};
