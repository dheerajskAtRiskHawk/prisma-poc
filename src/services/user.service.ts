import { User } from '../domain/user.entity';
import { UserDto } from '../dtos/user.dto';
import { UserRepository } from '../repositories/user.repository';
import { BaseService } from './base.service';
import { UserMapper } from '../mappers/user.mapper';

export class UserService extends BaseService<User, UserDto> {
  constructor() {
    const repository = new UserRepository();
    const mapper = new UserMapper(User, UserDto);
    super(repository, mapper);
  }
} 