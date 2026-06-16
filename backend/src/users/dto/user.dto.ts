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

// DTOs for UserSchema
export class UserDto {
  @Expose()
  @IsString()
  name!: string

  @Expose()
  @IsEmail()
  email!: string

  @Expose()
  @IsOptional()
  @IsBoolean()
  isOauth?: boolean



  @Expose()
  @IsOptional()
  @IsEnum(Permission)
  permissions?: Permission[]

  @Expose()
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @Expose()
  @IsOptional()
  @IsString()
  profilePicture?: string

  @Expose()
  @IsOptional()
  @IsString()
  phoneNumber?: string

  @Expose()
  @IsOptional()
  @IsString()
  googleId?: string

  @Expose()
  @IsOptional()
  @IsBoolean()
  isVerified?: boolean

  @Expose()
  @IsOptional()
  @IsEnum(Role)
  role?: Role

  @Expose()
  @IsOptional()
  @IsBoolean()
  agreeTerms?: boolean

  @Expose()
  @IsOptional()
  @IsBoolean()
  isBlocked?: boolean

  @Expose()
  @IsOptional()
  @IsString()
  verificationCode?: string

  @Expose()
  @IsOptional()
  @IsString()
  verificationToken?: string

  @Expose()
  @IsOptional()
  @IsDateString()
  tokenExpiresAt?: string

  @Expose()
  @IsOptional()
  @IsString()
  resetPasswordToken?: string

  @Expose()
  @IsOptional()
  @IsDateString()
  resetPasswordExpires?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  verificationAttempts?: number

  @Expose()
  @IsOptional()
  @IsDateString()
  lastLoginAt?: string

  @Expose()
  @IsOptional()
  @IsDateString()
  createdAt?: string

  @Expose()
  @IsOptional()
  @IsDateString()
  updatedAt?: string


}
