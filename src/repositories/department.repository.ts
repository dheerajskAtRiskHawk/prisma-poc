import { BaseRepository } from './base.repository';
import { Department } from '../domain/department.entity';
import { getPrismaClient } from '../lib/prisma';

export class DepartmentRepository extends BaseRepository<Department> {
  private static prismaPromise = getPrismaClient();

  constructor() {
    super(Department);
    DepartmentRepository.prismaPromise.then(prisma => {
      this.model = prisma.department;
    });
  }
} 