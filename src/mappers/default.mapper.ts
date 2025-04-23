import { MappingStrategy } from './mapping-strategy';
import { plainToInstance } from 'class-transformer';

export class DefaultMapper<TEntity, TDto> implements MappingStrategy<TEntity, TDto> {
  constructor(
    protected entityClass: new (partial: Partial<TEntity>) => TEntity,
    protected dtoClass: new (partial: Partial<TDto>) => TDto
  ) { }

  async mapEntityToDto(entity: TEntity): Promise<TDto> {
    return plainToInstance(this.dtoClass, entity);
  }

  async mapEntitiesToDtos(entities: TEntity[]): Promise<TDto[]> {
    return Promise.all(entities.map(entity => this.mapEntityToDto(entity)));
  }

  async mapDtoToEntity(dto: TDto): Promise<Partial<TEntity>> {
    return plainToInstance(this.entityClass, dto);
  }
} 