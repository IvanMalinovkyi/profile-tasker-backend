import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'prisma/generated/client';

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @MinLength(6, {
    message: 'Password must be at least 6 characters long',
  })
  @IsString()
  password?: string;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;
}
