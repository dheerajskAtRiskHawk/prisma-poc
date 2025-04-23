import { Department } from '../domain/department.entity';
import { DepartmentDto } from '../dtos/department.dto';
import { DepartmentService } from '../services/department.service';
import { BaseController } from './base.controller';

export class DepartmentController extends BaseController<Department, DepartmentDto> {
  constructor() {
    const service = new DepartmentService();
    super(service, DepartmentDto);
  }
} 