export abstract class BaseRepository<T> {
  protected model: any;
  protected entityClass: new (partial: Partial<T>) => T;

  constructor(entityClass: new (partial: Partial<T>) => T) {
    this.entityClass = entityClass;
  }

  async create(data: Partial<T>): Promise<T> {
    const result = await this.model.create({
      data: data as any,
    });
    return new this.entityClass(result);
  }

  async findById(id: number): Promise<T | null> {
    const result = await this.model.findUnique({
      where: { id },
    });
    return result ? new this.entityClass(result) : null;
  }

  async findAll(): Promise<T[]> {
    const results = await this.model.findMany();
    console.log('[BaseRepository] Found results:', results);
    return results.map((result: any) => new this.entityClass(result));
  }

  async update(id: number, data: Partial<T>): Promise<T> {
    const result = await this.model.update({
      where: { id },
      data: data as any,
    });
    return new this.entityClass(result);
  }

  async delete(id: number): Promise<void> {
    await this.model.delete({
      where: { id },
    });
  }
} 