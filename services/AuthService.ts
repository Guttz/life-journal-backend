import { getRepository } from 'typeorm';
import { Service } from 'typedi';
import { User } from "../db/entity/User";

@Service()
export default class AuthService {
  async findUserByUsername(username: string) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOneOrFail({ username });
    return user;
  }

  async checkIsPasswordValid(user: User, password: string) {
    return await user.checkIfPasswordIsValid(password);
  }
}