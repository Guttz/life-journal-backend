import { EntityManager, Repository } from 'typeorm';
import { Service } from 'typedi';

import { User } from '../entity/User';
import { InjectManager, InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserRepository {
  @InjectManager()
  private entityManager: EntityManager;

  constructor(@InjectRepository(User) private InjectRepository: Repository<User>) {}

  saveUsingRepository(user: User) {
    return this.InjectRepository.save(user);
  }

  saveUsingManager(user: User) {
    return this.entityManager.save(user);
  }

  findOneOrFail(properties: object) {
    return this.InjectRepository.findOneOrFail(properties);
  }

  findAll() {
    return this.InjectRepository.find();
  }
  
}
