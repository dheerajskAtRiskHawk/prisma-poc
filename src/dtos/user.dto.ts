import { IsEmail, IsString, IsInt, Min, Max, IsOptional } from 'class-validator';
import { DepartmentDto } from './department.dto';
import { Exclude } from 'class-transformer';

export class UserDto {
  @IsOptional()
  id?: number;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsInt()
  @Exclude()
  departmentId: number;

  @Exclude()
  department?: DepartmentDto;

  @IsString()
  @IsOptional()
  departmentName?: string;

  @Exclude()
  @IsOptional()
  createdAt?: Date;

  @Exclude()
  @IsOptional()
  updatedAt?: Date;

  @IsString()
  @IsOptional()
  fullName?: string;

  get isAdult(): boolean {
    return this.age >= 18;
  }
} 