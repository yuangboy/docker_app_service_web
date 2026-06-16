import { Expose } from 'class-transformer'
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

import {Role} from "../../common/enums/role.enum";
import {Permission} from "../../common/enums/permission.enum";

export class CreateUserDto {
  @IsString()
  name!: string

  @IsEmail()
  email!: string

  @IsString()
  password!: string

  @IsOptional()
  @IsBoolean()
  isOauth?: boolean

  @IsOptional()
  @IsEnum(Permission)
  permissions?: Permission[]

  @IsOptional()
  @IsBoolean()
  isActive?: boolean  

  @IsOptional()
  @IsString()
  profilePicture?: string

  @IsOptional()
  @IsString()
  phoneNumber?: string

  @IsOptional()
  @IsString()
  googleId?: string

  @IsOptional()
  @IsBoolean()
  isVerified?: boolean

  @IsOptional()
  @IsEnum(Role)
  role?: Role

  @IsOptional()
  @IsBoolean()
  agreeTerms?: boolean

  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean

  @IsOptional()
  @IsString()
  verificationCode?: string

  @IsOptional()
  @IsString()
  verificationToken?: string

  @IsOptional()
  @IsDateString()
  tokenExpiresAt?: string

  @IsOptional()
  @IsString()
  resetPasswordToken?: string

  @IsOptional()
  @IsDateString()
  resetPasswordExpires?: string

  @IsOptional()
  @IsNumber()
  verificationAttempts?: number

  @IsOptional()
  @IsDateString()
  lastLoginAt?: string
}
