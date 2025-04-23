import { Department } from './department.entity';

export class User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  departmentId: number;
  department?: Department;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    // Convert string dates to Date objects if they exist
    if (this.createdAt && typeof this.createdAt === 'string') {
      this.createdAt = new Date(this.createdAt);
    }
    if (this.updatedAt && typeof this.updatedAt === 'string') {
      this.updatedAt = new Date(this.updatedAt);
    }
  }
} 