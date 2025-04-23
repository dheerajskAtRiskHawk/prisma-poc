import { DefaultMapper } from './default.mapper';
import { User } from '../domain/user.entity';
import { UserDto } from '../dtos/user.dto';
import { Department } from '../domain/department.entity';
import { DepartmentDto } from '../dtos/department.dto';
import { UserMapper } from './user.mapper';

// Create mappers
export const userMapper = new UserMapper(User, UserDto);
export const departmentMapper = new DefaultMapper(Department, DepartmentDto); 