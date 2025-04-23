export interface MappingStrategy<TEntity, TDto> {
  mapEntityToDto(entity: TEntity): Promise<TDto>;
  mapEntitiesToDtos(entities: TEntity[]): Promise<TDto[]>;
  mapDtoToEntity(dto: TDto): Promise<Partial<TEntity>>;
} 