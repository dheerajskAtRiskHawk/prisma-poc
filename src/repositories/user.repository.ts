import { BaseRepository } from './base.repository';
import { User } from '../domain/user.entity';
import { getPrismaClient } from '../lib/prisma';

export class UserRepository extends BaseRepository<User> {
  constructor() {
    super(User);
  }

  private async getModel() {
    if (!this.model) {
      const prisma = await getPrismaClient();
      this.model = prisma.user;
    }
    return this.model;
  }

  async findById(id: number): Promise<User | null> {
    const model = await this.getModel();
    const result = await model.findUnique({
      where: { id },
      include: {
        department: true
      }
    });
    return result ? new User(result) : null;
  }

  async findAll(): Promise<User[]> {
    const model = await this.getModel();
    const results = await model.findMany({
      include: {
        department: true
      }
    });
    return results.map((result: any) => new User(result));
  }

  async create(data: Partial<User>): Promise<User> {
    const model = await this.getModel();
    const result = await model.create({
      data: data as any,
    });
    return new User(result);
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    const model = await this.getModel();
    const result = await model.update({
      where: { id },
      data: data as any,
    });
    return new User(result);
  }

  async delete(id: number): Promise<void> {
    const model = await this.getModel();
    await model.delete({
      where: { id },
    });
  }
} 