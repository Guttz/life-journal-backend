import { EntityManager, Repository } from 'typeorm';
import { Service } from 'typedi';

import { User } from '../entity/User';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { InjectManager, InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserRepository {
  @InjectManager()
  private entityManager: EntityManager;

  constructor(@InjectRepository(User) private InjectRepository: Repository<User>) {}

  saveUsingRepository(user: User): Promise<User> {
    return this.InjectRepository.save(user);
  }

  saveUsingManager(user: User): Promise<User> {
    return this.entityManager.save(user);
  }

  findOneOrFail(properties: Record<string, unknown>): Promise<User> {
    return this.InjectRepository.findOneOrFail(properties);
  }

  findAll(): Promise<User[]> {
    return this.InjectRepository.find();
  }
}
