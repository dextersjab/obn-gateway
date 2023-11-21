import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class UpdateRoleDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}

export class SetRolePermissionsDto {
  @IsArray()
  @IsString({ each: true })
  permissions: string[];
}
