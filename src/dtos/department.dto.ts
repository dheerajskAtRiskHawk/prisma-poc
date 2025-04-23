import { IsString, IsOptional } from 'class-validator';
import { Exclude } from 'class-transformer';

export class DepartmentDto {
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @Exclude()
  @IsOptional()
  createdAt?: Date;

  @Exclude()
  @IsOptional()
  updatedAt?: Date;
} 