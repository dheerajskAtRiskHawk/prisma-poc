import { BaseRepository } from '../repositories/base.repository';
import { MappingStrategy } from '../mappers/mapping-strategy';

export abstract class BaseService<TEntity, TDto> {
  protected repository: BaseRepository<TEntity>;
  protected mappingStrategy: MappingStrategy<TEntity, TDto>;

  constructor(
    repository: BaseRepository<TEntity>,
    mappingStrategy: MappingStrategy<TEntity, TDto>
  ) {
    this.repository = repository;
    this.mappingStrategy = mappingStrategy;
  }

  async create(dto: TDto): Promise<TDto> {
    try {
      const entity = await this.repository.create(await this.mappingStrategy.mapDtoToEntity(dto));
      return this.mappingStrategy.mapEntityToDto(entity);
    } catch (error) {
      console.error('Error in BaseService.create:', error);
      throw error;
    }
  }

  async findById(id: number): Promise<TDto | null> {
    try {
      const entity = await this.repository.findById(id);
      return entity ? this.mappingStrategy.mapEntityToDto(entity) : null;
    } catch (error) {
      console.error('Error in BaseService.findById:', error);
      throw error;
    }
  }

  async findAll(): Promise<TDto[]> {
    try {
      console.log('BaseService.findAll: Starting findAll operation');
      const entities = await this.repository.findAll();
      console.log('BaseService.findAll: Got entities:', entities);
      const dtos = await this.mappingStrategy.mapEntitiesToDtos(entities);
      console.log('BaseService.findAll: Mapped to DTOs:', dtos);
      return dtos;
    } catch (error) {
      console.error('Error in BaseService.findAll:', error);
      throw error;
    }
  }

  async update(id: number, dto: TDto): Promise<TDto> {
    try {
      const entity = await this.repository.update(id, await this.mappingStrategy.mapDtoToEntity(dto));
      return this.mappingStrategy.mapEntityToDto(entity);
    } catch (error) {
      console.error('Error in BaseService.update:', error);
      throw error;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      console.error('Error in BaseService.delete:', error);
      throw error;
    }
  }
} 