import { User } from '../domain/user.entity';
import { UserDto } from '../dtos/user.dto';
import { DefaultMapper } from './default.mapper';

export class UserMapper extends DefaultMapper<User, UserDto> {
  async mapEntityToDto(entity: User): Promise<UserDto> {
    const dto = await super.mapEntityToDto(entity);

    // Handle special cases
    if (entity.department) {
      dto.departmentName = entity.department.name;
    }
    dto.fullName = `${entity.firstName} ${entity.lastName}`;

    return dto;
  }

  async mapEntitiesToDtos(entities: User[]): Promise<UserDto[]> {
    const dtos = await Promise.all(entities.map(entity => this.mapEntityToDto(entity)));
    return dtos;
  }
} 