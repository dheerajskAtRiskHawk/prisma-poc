import { DepartmentRepository } from '../repositories/department.repository';
import { Department } from '../domain/department.entity';
import { DepartmentDto } from '../dtos/department.dto';
import { BaseService } from './base.service';
import { DefaultMapper } from '../mappers/default.mapper';

export class DepartmentService extends BaseService<Department, DepartmentDto> {
  constructor() {
    const repository = new DepartmentRepository();
    const mapper = new DefaultMapper(Department, DepartmentDto);
    super(repository, mapper);
  }
} 