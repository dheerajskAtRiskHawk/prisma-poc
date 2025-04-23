import { User } from './user.entity';

export class Department {
  id: number;
  name: string;
  description: string;
  users?: User[];
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<Department>) {
    Object.assign(this, partial);
    if (this.createdAt && typeof this.createdAt === 'string') {
      this.createdAt = new Date(this.createdAt);
    }
    if (this.updatedAt && typeof this.updatedAt === 'string') {
      this.updatedAt = new Date(this.updatedAt);
    }
  }
} 